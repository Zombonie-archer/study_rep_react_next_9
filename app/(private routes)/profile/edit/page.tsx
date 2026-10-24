"use client";
import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useAuth } from "@/lib/store/authStore";
import { User } from "@/types/user";
import { EditProfileParams, updateMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import React from "react";
import { ApiError } from "next/dist/server/api-utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub - Edit Profile",
  description: "NoteHub Edit Profile Page",
  openGraph: {
    title: "NoteHub - Edit Profile",
    description: "NoteHub Edit Profile Page",
    url: "https://study-rep-react-next-9.vercel.app/profile/edit",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub app",
      },
    ],
  },
};

export default function EditProfilePage() {
  const { user, setUser } = useAuth();
  const [error, setError] = React.useState<string>("");
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const newUser = Object.fromEntries(formData) as unknown as EditProfileParams;
    newUser.email = user?.email || "";
    try {
      const registeredUser: User = await updateMe(newUser);
      if (registeredUser) {
        setUser(registeredUser);
        router.push("/profile");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError((error as ApiError).message ?? "Oops... some error");
    }
  };
  return (
    <main className={css.mainContent}>
      {user && (
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>

          <Image
            src={user?.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />

          <form className={css.profileInfo} action={handleSubmit}>
            <div className={css.usernameWrapper}>
              <label htmlFor="username">{user?.username || "Username"}</label>
              <input
                id="username"
                name="username"
                type="text"
                className={css.input}
                defaultValue={user?.username || ""}
              />
            </div>

            <p>Email: {user?.email || "Email not provided"}</p>

            <div className={css.actions}>
              <button type="submit" className={css.saveButton}>
                Save
              </button>
              <button type="button" className={css.cancelButton} onClick={() => router.back()}>
                Cancel
              </button>
            </div>
          </form>
          {error && <p className={css.error}>{error}</p>}
        </div>
      )}
    </main>
  );
}
