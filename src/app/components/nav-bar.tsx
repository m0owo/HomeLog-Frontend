"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div className="absolute flex h-full min-w-fit flex-col items-center justify-start border-r-[1px] border-black">
      <div className="w-full p-2 text-center">HomeLog</div>
      <div className="flex flex-col justify-center p-2">
        <Link
          href="/"
          className="flex w-full flex-col items-center justify-center gap-2"
        >
          <p>Icon</p>
          <p>Home</p>
        </Link>
      </div>
    </div>
  );
}
