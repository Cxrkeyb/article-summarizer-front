import Link from 'next/link';
import React from 'react';

export default function HomeView() {
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        <div className="flex flex-col w-full items-center justify-center">
          <h1 className="text-4xl font-bold text-center">
            Welcome to Summarizer
          </h1>
          <p className="text-lg text-center mt-4">
            Summarize your text with ease.
          </p>
        </div>

        <div className="flex flex-col w-full items-center justify-center mt-4">
          <div className="flex flex-col w-full items-center justify-center mt-4">
            <Link
              href="/login"
              className="w-full flex items-center justify-center md:w-[30rem] bg-[#10a37f] hover:bg-[#309179] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="w-full flex items-center justify-center md:w-[30rem] bg-[#10a37f] hover:bg-[#309179] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
