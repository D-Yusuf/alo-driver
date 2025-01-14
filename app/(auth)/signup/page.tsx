'use client';
import React from 'react';
import { handleSignup } from '../actions';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form action={handleSignup} className="max-w-md w-full p-6 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input
          name="firstName"
          placeholder="First Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          name="lastName"
          placeholder="Last Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
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
        <div className="mb-4">
          <label className="block mb-2">Gender</label>
          <select name="gender" className="w-full p-2 border border-gray-300 rounded">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Role</label>
          <select name="role" className="w-full p-2 border border-gray-300 rounded">
            <option value="user">User</option>
            <option value="familyMember">Family Member</option>
            <option value="driver">Driver</option>
          </select>
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Sign Up
        </button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/login')}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Log In
          </span>
        </p>
      </form>
    </div>
  );
}