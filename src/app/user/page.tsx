"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState, useMemo, useCallback, memo } from "react";
import { sora } from "@/lib/fonts";
import { User, Mail, Calendar, Edit3, LogOut } from "lucide-react";
import Image from "next/image";
import type { UserResource } from "@clerk/types";

// Type definitions
interface UserInfo {
  displayName: string;
  userInitials: string;
  joinDate: string;
}

interface UserAvatarProps {
  user: UserResource;
  displayName: string;
  userInitials: string;
}

interface UserInfoProps {
  displayName: string;
  user: UserResource;
  joinDate: string;
}

interface ProfileFormProps {
  user: UserResource;
}

interface AccountDetailsProps {
  user: UserResource;
}

interface EmailVerificationStatus {
  text: string;
  className: string;
}

// Memoized components for better performance
const UserAvatar = memo<UserAvatarProps>(
  ({ user, displayName, userInitials }) => {
    return (
      <div className="relative">
        {user.imageUrl ? (
          <Image
            height={96}
            width={96}
            src={user.imageUrl}
            alt={displayName}
            className="w-24 h-24 rounded-full border-4 border-zinc-600/50"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-bold">
            {userInitials}
          </div>
        )}
      </div>
    );
  }
);

UserAvatar.displayName = "UserAvatar";

const UserInfoComponent = memo<UserInfoProps>(
  ({ displayName, user, joinDate }) => {
    return (
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl font-bold text-white mb-2">{displayName}</h1>
        <div className="space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-300">
            <Mail className="w-4 h-4" />
            <span className="text-sm">
              {user.emailAddresses[0]?.emailAddress}
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-300">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Joined {joinDate}</span>
          </div>
          {user.username && (
            <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-300">
              <User className="w-4 h-4" />
              <span className="text-sm">@{user.username}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
);

UserInfoComponent.displayName = "UserInfoComponent";

const ProfileForm = memo<ProfileFormProps>(({ user }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          First Name
        </label>
        <input
          type="text"
          value={user.firstName || ""}
          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          readOnly
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Last Name
        </label>
        <input
          type="text"
          value={user.lastName || ""}
          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          readOnly
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Username
        </label>
        <input
          type="text"
          value={user.username || ""}
          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          readOnly
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          Email
        </label>
        <input
          type="email"
          value={user.emailAddresses[0]?.emailAddress || ""}
          className="w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          readOnly
        />
      </div>
    </div>
  );
});

ProfileForm.displayName = "ProfileForm";

const AccountDetails = memo<AccountDetailsProps>(({ user }) => {
  const emailVerificationStatus: EmailVerificationStatus = useMemo(() => {
    return user.emailAddresses[0]?.verification?.status === "verified"
      ? { text: "Verified", className: "text-green-400" }
      : { text: "Unverified", className: "text-yellow-400" };
  }, [user.emailAddresses]);

  const lastSignIn: string = useMemo(() => {
    return user.lastSignInAt
      ? new Date(user.lastSignInAt).toLocaleDateString()
      : "N/A";
  }, [user.lastSignInAt]);

  return (
    <div className="pt-6 border-t border-zinc-700/50">
      <h3 className="text-lg font-semibold text-white mb-4">Account Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex justify-between py-2">
          <span className="text-zinc-400">Account ID:</span>
          <span className="text-zinc-300 font-mono">{user.id}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-zinc-400">Last Sign In:</span>
          <span className="text-zinc-300">{lastSignIn}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-zinc-400">Email Verified:</span>
          <span className={emailVerificationStatus.className}>
            {emailVerificationStatus.text}
          </span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-zinc-400">Two-Factor Auth:</span>
          <span className="text-zinc-300">
            {user.twoFactorEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>
    </div>
  );
});

AccountDetails.displayName = "AccountDetails";

const UserPage: React.FC = () => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  // Memoized computed values to prevent unnecessary recalculations
  const userInfo: UserInfo | null = useMemo(() => {
    if (!user) return null;

    const displayName: string =
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.username || "User";

    const userInitials: string =
      user.firstName && user.lastName
        ? `${user.firstName[0]}${user.lastName[0]}`
        : user.username?.[0]?.toUpperCase() ||
          user.emailAddresses[0]?.emailAddress[0]?.toUpperCase() ||
          "U";

    const joinDate: string = user.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "N/A";

    return { displayName, userInitials, joinDate };
  }, [user]);

  // Memoized sign out handler to prevent unnecessary re-renders
  const handleSignOut = useCallback((): void => {
    signOut();
  }, [signOut]);

  if (!isLoaded) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center ${sora.className}`}
      >
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !userInfo) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center ${sora.className}`}
      >
        <div className="text-white text-lg">
          Please sign in to view your profile
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen mt-24 bg-gradient-to-br from-black via-zinc-900 to-zinc-800 ${sora.className}`}
    >
      {/* Background Effects - Static, can be cached */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="bg-zinc-800/40 backdrop-blur-xl border border-zinc-700/50 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <UserAvatar
              user={user}
              displayName={userInfo.displayName}
              userInitials={userInfo.userInitials}
            />

            <UserInfoComponent
              displayName={userInfo.displayName}
              user={user}
              joinDate={userInfo.joinDate}
            />

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSignOut}
                className="px-4 py-2 cursor-pointer bg-zinc-700 hover:bg-red-600 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                type="button"
                aria-label="Sign out of your account"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-zinc-800/40 backdrop-blur-xl border border-zinc-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Profile Information
            </h2>

            <ProfileForm user={user} />
            <AccountDetails user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
