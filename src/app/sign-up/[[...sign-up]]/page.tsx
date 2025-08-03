"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";
import { Icons } from "@/components/ui/icons";
import { sora } from "@/lib/fonts";

export default function SignUpPage() {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center px-4 relative ${sora.className}`}
    >
      {/* Background blur effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <SignUp.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <SignUp.Step name="start">
              <div className="relative z-10 w-full max-w-lg">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-white mb-1">
                    Create an account
                  </h1>
                  <p className="text-gray-400 text-sm">
                    Sign up to start reading
                  </p>
                </div>

                <div className="bg-gray-800/40 w-[400px] backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl">
                  {/* OAuth Buttons */}
                  <div className="space-y-3 mb-6">
                    <Clerk.Connection name="github" asChild>
                      <button
                        disabled={isGlobalLoading}
                        className="w-full cursor-pointer group flex items-center justify-center gap-3 px-4 py-3 bg-zinc-700/50 hover:bg-zinc-600/50 border border-zinc-600/50 hover:border-zinc-500/50 rounded-xl text-white transition-all duration-200"
                      >
                        <Clerk.Loading scope="provider:github">
                          {(isLoading) =>
                            isLoading ? (
                              <Icons.spinner className="size-4 animate-spin text-zinc-300" />
                            ) : (
                              <>
                                <Icons.gitHub className="size-4 text-white" />
                                <span className="font-medium text-sm">
                                  Sign up with GitHub
                                </span>
                              </>
                            )
                          }
                        </Clerk.Loading>
                      </button>
                    </Clerk.Connection>

                    <Clerk.Connection name="google" asChild>
                      <button
                        disabled={isGlobalLoading}
                        className="w-full cursor-pointer group flex items-center justify-center gap-3 px-4 py-3 bg-zinc-700/50 hover:bg-zinc-600/50 border border-zinc-600/50 hover:border-zinc-500/50 rounded-xl text-white transition-all duration-200"
                      >
                        <Clerk.Loading scope="provider:google">
                          {(isLoading) =>
                            isLoading ? (
                              <Icons.spinner className="size-4 animate-spin text-gray-300" />
                            ) : (
                              <>
                                <Icons.google className="size-4 text-white" />
                                <span className="font-medium text-sm">
                                  Sign up with Google
                                </span>
                              </>
                            )
                          }
                        </Clerk.Loading>
                      </button>
                    </Clerk.Connection>
                  </div>

                  {/* Divider */}
                  <div className="my-6 flex items-center">
                    <div className="flex-1 h-px bg-gray-600/50" />
                    <span className="px-3 text-xs text-gray-400 bg-gray-800/60 rounded-full py-1">
                      or
                    </span>
                    <div className="flex-1 h-px bg-gray-600/50" />
                  </div>

                  {/* Username */}
                  <div className="mb-4">
                    <Clerk.Field name="username">
                      <Clerk.Label>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Username
                        </label>
                      </Clerk.Label>
                      <Clerk.Input asChild>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                          placeholder="Choose a username"
                        />
                      </Clerk.Input>
                      <Clerk.FieldError>
                        {(msg) => (
                          <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {msg.message}
                          </p>
                        )}
                      </Clerk.FieldError>
                    </Clerk.Field>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <Clerk.Field name="emailAddress">
                      <Clerk.Label>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                      </Clerk.Label>
                      <Clerk.Input asChild>
                        <input
                          type="email"
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                          placeholder="Enter your email"
                        />
                      </Clerk.Input>
                      <Clerk.FieldError>
                        {(msg) => (
                          <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {msg.message}
                          </p>
                        )}
                      </Clerk.FieldError>
                    </Clerk.Field>
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <Clerk.Field name="password">
                      <Clerk.Label>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Password
                        </label>
                      </Clerk.Label>
                      <Clerk.Input asChild>
                        <input
                          type="password"
                          required
                          className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                          placeholder="Create a password"
                        />
                      </Clerk.Input>
                      <Clerk.FieldError>
                        {(msg) => (
                          <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                            <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                            {msg.message}
                          </p>
                        )}
                      </Clerk.FieldError>
                    </Clerk.Field>
                  </div>

                  {/* Submit Button */}
                  <SignUp.Action submit asChild>
                    <button
                      disabled={isGlobalLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                      <Clerk.Loading>
                        {(isLoading) =>
                          isLoading ? (
                            <Icons.spinner className="size-4 animate-spin mx-auto" />
                          ) : (
                            "Create account"
                          )
                        }
                      </Clerk.Loading>
                    </button>
                  </SignUp.Action>

                  {/* Already have account */}
                  <div className="mt-6 text-center">
                    <Link
                      href="/sign-in"
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      Already have an account?{" "}
                      <span className="text-blue-400 hover:text-blue-300 font-medium">
                        Sign in
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </SignUp.Step>
          )}
        </Clerk.Loading>
      </SignUp.Root>
    </div>
  );
}
