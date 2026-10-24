"use client";
import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useAuth } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated} = useAuth();
  const router = useRouter();
  async function handleLogout() {
    try {
      await logout();
    } catch (error) {}
    clearIsAuthenticated();
    router.push('/sign-in');
  }
  return (
    <>
      {isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email || ""}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      )}

      {!isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
