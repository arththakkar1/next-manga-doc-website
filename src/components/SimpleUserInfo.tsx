"use client";

import { SignedIn, useUser, useClerk } from "@clerk/nextjs";
import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SimpleUserInfo() {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) return null;

  const displayName =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.username || "User";

  const userInitials =
    user.firstName && user.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : user.username?.[0]?.toUpperCase() || "U";

  return (
    <SignedIn>
      <Link href={"/user"} className="flex items-center gap-3">
        {user.imageUrl ? (
          <Image
            width={32}
            height={32}
            src={user.imageUrl}
            alt={displayName}
            className="w-8 h-8 rounded-full border-2 border-white/20"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-sm font-medium">
            <User2 className="w-4 h-4" />
          </div>
        )}
      </Link>
    </SignedIn>
  );
}
