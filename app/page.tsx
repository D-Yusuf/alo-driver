"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from './api/storage';

export default function Home() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      // Assuming you have a way to decode the token to get the user role
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserRole(decodedToken.role);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Alo Drive</h1>
          <div className="flex space-x-4">
            {!userRole ? (
              <button
                onClick={() => router.push('/auth/signup')}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="text-blue-500 hover:underline"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => router.push('/book')}
                  className="text-blue-500 hover:underline"
                >
                  Book
                </button>
                {userRole === 'familyMember' && (
                  <button
                    onClick={() => router.push('/my-family')}
                    className="text-blue-500 hover:underline"
                  >
                    My Family
                  </button>
                )}
                {userRole === 'driver' && (
                  <button
                    onClick={() => router.push('/my-appointments')}
                    className="text-blue-500 hover:underline"
                  >
                    My Appointments
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-4">Welcome to Alo Drive</h2>
        <p className="text-lg">
          Alo Drive is your reliable partner for safe and convenient transportation. Whether you're a family member looking to manage your family's rides or a driver ready to serve, we've got you covered.
        </p>
      </main>
    </div>
  );
}
