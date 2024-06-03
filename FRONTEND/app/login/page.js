'use client'
import React from 'react'

export default function login() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://icons.veryicon.com/png/o/miscellaneous/yunrenui-original-ui-of-fool-cloud/log-in-13.png"
            alt="login"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        {/* Register Now code */}
        <p className="mt-4 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <a href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register Now!
            </a>
          </p>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="http://localhost:3000/crm/api/auth/signin" method="POST">
          {/* userid block */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User ID
              </label>
              <div className="mt-2">
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  placeholder='Your User ID'
                  autoComplete="userId"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Password block */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder='Your Password'
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* Sign in code chunk */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-500">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
