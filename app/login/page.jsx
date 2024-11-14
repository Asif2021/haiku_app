"use client";

import { useFormState } from "react-dom";
import { login } from "../../actions/userController";
import Link from "next/link";
import { useState } from "react";

function page() {
  const [formState, formAction] = useFormState(login, {});
  const [show, setShow] = useState(false);

  return (
    <>
      <h2 className="text-center text-3xl text-gray-600 mb-5 font-bold uppercase">
        Log In
      </h2>
      <form action={formAction} className="max-w-sm mx-auto">
        <div className="mb-3">
          <input
            name="username"
            autoComplete="off"
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-sm"
          />
          {formState.success == false && (
            <div role="alert" className="alert alert-warning mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{formState.message}</span>
            </div>
          )}
        </div>
        <div className="mb-3">
          <label className="input input-bordered flex items-center gap-2">
            <input
              name="password"
              autoComplete="off"
              type={show ? "text" : "password"}
              placeholder="Password"
              className="grow"
            />
            {show ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4 cursor-pointer"
                onClick={() => setShow(!show)}
              >
                <path
                  fillRule="evenodd"
                  d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z"
                  clipRule="evenodd"
                />
                <path d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4 cursor-pointer"
                onClick={() => setShow(!show)}
              >
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                <path
                  fillRule="evenodd"
                  d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </label>
        </div>
        <button className="btn btn-primary uppercase mb-10">Submit</button>
        <p className="text-xl text-gray-600 mb-5">
          Don&rsquo;t have an account ?
          <strong>
            <Link href="/">Create Now</Link>
          </strong>
        </p>
      </form>
    </>
  );
}
export default page;
