import { InboxLayout, FeedLayout } from 'ui'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { PrismaAdapter } from '@auth/prisma-adapter'

export default function LoginPage() {
  return (
    <div className="w-full max-w-md p-8 m-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 className="mb-4 text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
        Log In
      </h1>
      <div className="mb-4 space-y-2">
        <button className="font-sans font-medium w-full flex items-center justify-center bg-red-600 text-white py-2 rounded-md">
          <img alt="Google logo" className="w-6 h-6 mr-2" src="/vercel.svg" />
          Sign in with Google
        </button>
        <button className="font-sans font-medium w-full flex items-center justify-center bg-slate-950 text-white py-2 rounded-md">
          <img alt="GitHub logo" className="w-6 h-6 mr-2" src="/placeholder.svg" />
          Sign in with GitHub
        </button>
      </div>
      <div className="relative mb-4">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>
      <form className="space-y-4">
        <div className="space-y-1">
          <label
            className="font-medium font-sans text-gray-950 dark:text-gray-50"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            className="shadow-sm w-full px-2 py-2 rounded-md border dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="Enter your username"
            required
            type="text"
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="font-medium font-sans text-gray-960 dark:text-gray-50"
            >
              Password
            </label>
            <Link className="text-sm underline text-gray-600 dark:text-gray-400" href="#">
              Forgot your password?
            </Link>
          </div>
          <input
            id="password"
            placeholder="Enter your password"
            required
            type="password"
            className="shadow-sm w-full px-2 py-2 rounded-md border dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
        </div>
        <button
          className="font-medium w-full py-2 px-3 flex item-center justify-center rounded-md text-white bg-gray-900 dark:bg-gray-50 dark:text-gray-950 font-sans fond-medium"
          type="submit"
        >
          Log In
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400 ">
        Don&apos;t have an account?&nbsp;
        <Link className="underline text-blue-600 dark:text-blue-400" href="#">
          Sign Up
        </Link>
      </p>
    </div>
  )
}
