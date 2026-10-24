"use client";
import { User } from "@/types/user";
import css from "./SignInPage.module.css";
import { login, RegisterParams } from "@/lib/api/clientApi";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";
import { ApiError } from "next/dist/server/api-utils";

export default function SignInPage() {
  const [error, setError] = React.useState<string>("");
  const setUser = useAuth(e => e.setUser);
  const router = useRouter();
  async function handleSubmit(formdata: FormData) {
    const user = Object.fromEntries(formdata) as unknown as RegisterParams;
    try {
      const loginedUser: User = await login(user);
      if (loginedUser) {
        setUser(loginedUser);
        router.push("/profile");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError((error as ApiError).message ?? "Oops... some error");
    }
  }
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
