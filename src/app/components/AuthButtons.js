"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaSignInAlt } from "react-icons/fa";

export default function AuthButtons() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <div className="flex items-center space-x-4">
        {/* Profile Icon */}
        <FaUserCircle
          className="text-2xl cursor-pointer"
          onClick={() => router.push("/profile")}
        />
        {/* Sign Out Button */}
        <button onClick={() => signOut()} className="ml-2">
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <div className="flex items-center">
        {/* Sign In Icon */}
        <FaSignInAlt
          className="text-2xl cursor-pointer"
          onClick={() => signIn()}
        />
      </div>
    );
  }
}
