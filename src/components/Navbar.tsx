import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { logoutAction } from "@/app/(auth)/actions";

export default async function Navbar() {
  const user = await currentUser();
  return (
    <nav className="navbar navbar-expand bg-white border-bottom">
      <div className="container-fluid px-3">
        <Link className="navbar-brand fw-bold text-primary d-flex align-items-center gap-2" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element -- app icon asset */}
          <img src="/icon.svg" width={28} height={28} alt="" />
          Instagraphics
        </Link>
        <ul className="navbar-nav me-auto">
          {user && (
            <li className="nav-item">
              <Link className="nav-link" href="/graphics">
                My Graphics
              </Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav align-items-center">
          {user ? (
            <>
              <li className="nav-item me-3">
                <Link href="/credits" className="badge text-bg-primary text-decoration-none" title="Buy credits">
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
            <li className="nav-item">
              <Link className="btn btn-primary btn-sm" href="/login">
                Sign in
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
