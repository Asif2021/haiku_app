"use server";

import { getCollection } from "../lib/db.js";
import bcrypt from "bcrypt";
import { cookies } from "next/headers.js";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

function isAlphaNumeric(x) {
  const regex = /^[a-zA-Z0-9]*$/;
  return regex.test(x);
}

export const register = async function (prevState, formData) {
  const errors = {};

  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  if (typeof ourUser.username != "string") ourUser.username = "";
  if (typeof ourUser.password != "string") ourUser.password = "";
  if (typeof ourUser.confirmPassword != "string") ourUser.confirmPassword = "";


  ourUser.username = ourUser.username.trim();
  ourUser.password = ourUser.password.trim();
  ourUser.confirmPassword = ourUser.confirmPassword.trim();

  if (ourUser.username.length < 3)
    errors.username = "username must be at least three characters";
  if (ourUser.username.length > 30)
    errors.username = "username must not be exceed 30 characters";
  if (!isAlphaNumeric(ourUser.username))
    errors.username = "Username only contains letters and numbers";
  if (ourUser.username == "")
    errors.username = "You must provide a valid username";

// see if username already exist
const usersCollection = await getCollection("users");
const usernameInQuestion = await usersCollection.findOne({username:ourUser.username})
if (usernameInQuestion){
  errors.username = "That username is already in use."
}

  if (ourUser.password.length < 6)
    errors.password = "Password must be at least six characters";
  if (ourUser.password.length > 30)
    errors.password = "Password must not be exceed 30 characters";
  if (ourUser.password == "")
    errors.password = "You must provide a valid Password";
  if(ourUser.confirmPassword !== ourUser.password) errors.confirmPassword = "Password do not match"

  if (errors.username || errors.password || errors.confirmPassword) {
    return {
      errors: errors,
      success: false,
    };
  }

  //hash password first
  const salt = bcrypt.genSaltSync(10);
  ourUser.password = bcrypt.hashSync(ourUser.password, salt);
  ourUser.confirmPassword = bcrypt.hashSync(ourUser.confirmPassword, salt);

  // storing a new user in the database.
  const newUser = await usersCollection.insertOne(ourUser);
  const userId = newUser.insertedId.toString();

  //create our JWT value
  const ourTokenValue = jwt.sign(
    {
      skyColor: "blue",
      userId: userId,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    process.env.JWTSECRET
  );

  //log the user in by giving them a cookie.
  cookies().set("ourHaikuApp", ourTokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    secure: true,
  });

  return {
    success: true,
  };
};

export const login = async function (prevState, formData) {
  const failObject = {
    success:false,
    message:"Invalid username / password"
  }

  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password")};
  if (typeof ourUser.username != "string") ourUser.username = "";
  if (typeof ourUser.password != "string") ourUser.password = "";

  const collection = await getCollection("users")
  const user = await collection.findOne({username:ourUser.username})
  if(!user){
    return failObject}

  const matchOrNot = bcrypt.compareSync(ourUser.password, user.password)
  if(!matchOrNot){
    return failObject
  }
  
  //create json web token (jwt) value 
  const ourTokenValue = jwt.sign(
    {
      skyColor: "blue",
      userId: user._id,
      username: user.username,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    process.env.JWTSECRET
  );

  //log the user in by giving them a cookie.
  cookies().set("ourHaikuApp", ourTokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    secure: true,
  });
 return redirect("/")

};

export const logout = async function () {
  cookies().delete("ourHaikuApp");
  redirect("/login");
};


