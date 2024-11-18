import { ObjectId } from "mongodb";
import { getCollection } from "../lib/db";
import Haiku from "./Haiku";
import Link from "next/link";
import { getUserFromCookie } from "@/lib/getUser"


async function getHaikus(id) {
  const collection = await getCollection("haikus");
  const results = await collection
    .find({ author: ObjectId.createFromHexString(id) })
    .sort({ _id: -1 })
    .toArray();
  return results;
}

async function Dashboard(props) {
    const haikus = await getHaikus(props.user.userId);
    const user = await getUserFromCookie();
    console.log(user)

  return (
    <div>
      <h2 className="text-center text-gray-600 text-2xl mb-5 capitalize">
       Here are Your Haikus, <strong className="uppercase"> dear {user.username}</strong>
      </h2>
      {haikus.length == 0 ? (
        <h2 className="text-center text-gray-600 text-2xl capitalize">
          You have not created any haiku yet, <strong>create One</strong> <br />
          <Link href="/create-haiku" className="btn btn-primary uppercase mt-5">
            Create Haiku
          </Link>
        </h2>
      ) : (
        haikus.map((haiku, index) => {
          haiku._id = haiku._id.toString();
          haiku.author = haiku.author.toString();
          return <Haiku haiku={haiku} key={index} />;
        })
      )}
    </div>
  );
}
export default Dashboard;
