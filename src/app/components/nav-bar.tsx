"use client";

import Link from "next/link";
import ClockIcon from "./icons/clock-icon";
import ComputerTvIcon from "./icons/computer-tv-icon";
import HomeIcon from "./icons/home-icon";

export default function Navbar() {
  return (
    <div className="absolute flex h-full min-w-fit flex-col items-center justify-start bg-white p-2 shadow-sm">
      <div className="mb-14 w-full p-2 text-center text-xl font-bold">
        HomeLog
      </div>
      <div className="flex flex-col justify-center gap-6 p-2">
        <Link
          href="/"
          className="flex w-full flex-col items-center justify-center gap-2"
        >
          <p>
            <HomeIcon />
          </p>
          <p>Home</p>
        </Link>
        <Link
          href="/routines"
          className="flex w-full flex-col items-center justify-center gap-2"
        >
          <p>
            <ClockIcon />
          </p>
          <p>Routines</p>
        </Link>
        <Link
          href="/assistant"
          className="flex w-full flex-col items-center justify-center gap-2"
        >
          <p>
            <ComputerTvIcon />
          </p>
          <p>Assistant</p>
        </Link>
      </div>
    </div>
  );
}
