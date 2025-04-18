"use client";

import { useEffect, useState } from "react";

export default function RoutinesPage() {
  const [routineType, setRoutineType] = useState("");
  useEffect(() => console.log("routine type", routineType));
  return (
    <div>
      <div>
        <select
          name="routineType"
          id="routineType"
          className="rounded-md border-[1px] border-black bg-white p-2"
          value={routineType}
          onChange={(e) => setRoutineType(e.target.value)}
        >
          <option value="">Select routine type</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
    </div>
  );
}
