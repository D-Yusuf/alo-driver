"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import {useQuery} from "@tanstack/react-query"
export default function Login() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form action={handleLogin} className="max-w-md w-full p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <span
            onClick={() => router.push('/auth/signup')}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}