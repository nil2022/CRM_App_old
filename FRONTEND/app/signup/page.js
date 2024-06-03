"use client";
import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function login() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://icons.veryicon.com/png/o/business/xbim/registration-1.png"
            alt="signup"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an Account
          </h2>
        </div>

        {/* Login Now code */}
        <p className="mt-4 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a href="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Log in Now!
            </a>
          </p>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="http://localhost:3000/crm/api/auth/signup"
            method="POST"
          >
            {/* NAME block */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  minLength={3}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* EMAIL block */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Id
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  minLength={5}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* userid block */}
            <div>
              <label
                htmlFor="userid"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User ID
              </label>
              <div className="mt-2">
                <input
                  id="userid"
                  name="userId"
                  type="text"
                  placeholder="Your User ID"
                  minLength={3}
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
                  placeholder="Your Password"
                  autoComplete="current-password"
                  minLength={5}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* USERTYPE BLOCK */}
            <div>
                  <label
                    for="countries"
                    class="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select User Type
                  </label>
                  <select
                    id="userType" name="userType"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  >
                    <option selected value="CUSTOMER">CUSTOMER</option>
                    <option value="ENGINEER">ENGINEER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
            {/* Sign in code chunk */}
            <div>
              <button
                type="submit"
                onClick="https://www.google.com/"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-500"
              >
                REGISTER
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
