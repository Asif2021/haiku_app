import { getUserFromCookie } from "../lib/getUser"
import RegisterForm from "../components/RegisterForm"
import Dashboard from '../components/Dashboard'


async function page() {
  const user = await getUserFromCookie();
  return (
    <>
    {user && <Dashboard user={user}/>}
{!user && (<>
  <p className="text-2xl text-gray-600 mb-5">Don&rsquo;t have an account ? <strong>Create One</strong> </p>
    <RegisterForm/>
</>)

}

  
    </>
  )
}
export default page