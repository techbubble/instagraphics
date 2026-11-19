import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { logoutAction } from "@/app/(auth)/actions";
import { Suspense } from "react";
import WorkspaceSignIn from "@/components/WorkspaceSignIn";

export default async function Navbar() {
  const user = await currentUser();
  return (
    <nav className={`navbar navbar-expand bg-white border-bottom ig-navbar ${user ? "ig-authed" : ""}`}>
      <div className="container-fluid px-3">
        <Link className="navbar-brand fw-bold text-primary d-flex align-items-center gap-2" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element -- app icon asset */}
          <img src="/icon.svg" width={28} height={28} alt="" />
          <span className="ig-brand-word">Instagraphic</span>
        </Link>
        <ul className="navbar-nav me-auto ig-nav-links">
          <li className="nav-item">
            <Link className="nav-link" href="/about">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/faq">
              FAQ
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav align-items-center">
          {user ? (
            <>
              <li className="nav-item me-2 me-md-3">
                <Link href="/my" className="btn btn-primary btn-sm rounded-pill text-nowrap px-3">
                  My Graphics
                </Link>
              </li>
              <li className="nav-item me-2 me-md-3">
                <Link href="/credits" className="badge text-bg-primary text-decoration-none" title={`${user.credits} credits. Buy more`}>
                  {user.credits}
                  <span className="ig-credits-word"> credit{user.credits === 1 ? "" : "s"}</span>
                </Link>
              </li>
              <li className="nav-item me-3 text-secondary small d-none d-md-block">{user.email}</li>
              <li className="nav-item ig-signout">
                <form action={logoutAction}>
                  <button className="btn btn-outline-secondary btn-sm text-nowrap" type="submit" title="Sign out" aria-label="Sign out">
                    <span className="ig-signout-text">Sign out</span>
                    {/* Bootstrap Icons "box-arrow-right", shown instead of the text in embeds */}
                    <svg className="ig-signout-icon" width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                    </svg>
                  </button>
                </form>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Suspense
                fallback={
                  <Link className="btn btn-primary btn-sm text-nowrap" href="/login">
                    Sign in
                  </Link>
                }
              >
                <WorkspaceSignIn />
              </Suspense>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
