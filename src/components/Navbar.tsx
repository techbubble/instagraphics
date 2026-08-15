import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { logoutAction } from "@/app/(auth)/actions";

export default async function Navbar() {
  const user = await currentUser();
  return (
    <nav className="navbar navbar-expand bg-white border-bottom">
      <div className="container-fluid px-3">
        <Link className="navbar-brand fw-bold text-primary d-flex align-items-center gap-2" href="/">
          <svg viewBox="-96 -90 192 192" width="28" height="28" aria-hidden="true">
            <path d="M 32.9 -44.6 A 62 62 0 0 1 56.2 -18.2" fill="none" stroke="#0d6efd" strokeWidth="30" strokeLinecap="round" />
            <path d="M 53.1 39.9 A 62 62 0 0 1 -32.9 60.6" fill="none" stroke="#0d6efd" strokeWidth="30" strokeLinecap="round" />
            <path d="M 8 8 L 42 8" fill="none" stroke="#0d6efd" strokeWidth="30" strokeLinecap="round" />
            <path d="M -54.7 37.1 A 62 62 0 0 1 -38.2 -40.9" fill="none" stroke="#ffc107" strokeWidth="30" strokeLinecap="round" />
            <circle cx="0" cy="-54" r="15" fill="#ffc107" />
          </svg>
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
