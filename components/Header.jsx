import Link from "next/link";
import { getUserFromCookie } from "../lib/getUser";
import { logout } from "../actions/userController";

async function Header() {
  const user = await getUserFromCookie();
  return (
    <div>
      <header className="bg-gray-100 shadow-md">
        <div className="container mx-auto">
          <div className="navbar">
            <div className="flex-1">
              <Link href="/" className="btn btn-ghost text-xl uppercase ">
                Our Haiku App
              </Link>
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                {user && (
                  <>
                  <li className="mr-3">
                    <Link href="/create-haiku" className="btn btn-primary uppercase">Create Haiku</Link>
                  </li>
                  <li>
                    <form action={logout} className="btn btn-neutral">
                      <button className="uppercase">Log Out</button>
                    </form>
                  </li>
                  </>
                )}
                {!user && (
                  <li>
                    <Link href="/login" className="uppercase">Login</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
export default Header;
