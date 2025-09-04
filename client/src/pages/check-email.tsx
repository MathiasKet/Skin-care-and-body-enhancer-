'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CheckEmail() {
  const searchParams = useSearchParams();
  const email = searchParams?.get('email') || 'your email';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            We've sent a confirmation link to <span className="font-medium">{email}</span>.
            Please check your inbox and click the link to verify your email address.
          </p>
        </div>

        <div className="mt-8 text-center text-sm">
          <p className="text-gray-600">
            Didn't receive an email?{' '}
            <Link 
              href="/signup" 
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Try signing up again
            </Link>
          </p>
          <p className="mt-2">
            <Link 
              href="/login" 
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
