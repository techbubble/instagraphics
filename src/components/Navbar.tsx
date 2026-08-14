import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { logoutAction } from "@/app/(auth)/actions";

export default async function Navbar() {
  const user = await currentUser();
  return (
    <nav className="navbar navbar-expand bg-white border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" href="/">
          Instagraphics
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" href="/">
              Templates
            </Link>
          </li>
          {user && (
            <li className="nav-item">
              <Link className="nav-link" href="/graphics">
                My Graphics
              </Link>
            </li>
          )}
          {user && (
            <li className="nav-item">
              <Link className="nav-link" href="/credits">
                Buy Credits
              </Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav align-items-center">
          {user ? (
            <>
              <li className="nav-item me-3">
                <Link href="/credits" className="badge text-bg-primary text-decoration-none">
                  {user.credits} credit{user.credits === 1 ? "" : "s"}
                </Link>
              </li>
              <li className="nav-item me-3 text-secondary small">{user.email}</li>
              <li className="nav-item">
                <form action={logoutAction}>
                  <button className="btn btn-outline-secondary btn-sm" type="submit">
                    Sign out
                  </button>
                </form>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item me-2">
                <Link className="btn btn-outline-primary btn-sm" href="/login">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-primary btn-sm" href="/signup">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
