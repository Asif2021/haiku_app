
import { getUserFromCookie } from "@/lib/getUser";
import { redirect } from "next/navigation";
import HaikuForm from "@/components/HaikuForm";

async function page() {
    const user = await getUserFromCookie()
    if (!user){
return redirect("/")
    }


  return (
    <>
    <h2 className="text-center text-2xl text-gray-600 mb-5 font-bold uppercase">Create Haiku</h2>
     <HaikuForm action="create" />
    </>
  )
}
export default page