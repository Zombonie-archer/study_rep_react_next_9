"use client";
import { User } from "@/types/user";
import css from "./SignUpPage.module.css";
import { register, RegisterParams } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import React from "react";
import { ApiError } from "next/dist/server/api-utils";

export default function SignUpPage() {
  const [error, setError] = React.useState<string>("");
  const setUser = useAuth(e => e.setUser);
  const router = useRouter();

  async function handleSubmit(formdata: FormData) {
    const user = Object.fromEntries(formdata) as unknown as RegisterParams;
    try {
      const registeredUser: User = await register(user);
      if (registeredUser) {
        setUser(registeredUser);
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
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
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
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
