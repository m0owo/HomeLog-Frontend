"use client";

import { useState } from "react";

export default function RoutinesPage() {
  const [routineType, setRoutineType] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [weeklyTimes, setWeeklyTimes] = useState<string[]>(
    new Array(7).fill("08:00"),
  );
  const [weeklyPrompts, setWeeklyPrompts] = useState<string[]>(
    new Array(7).fill(""),
  );
  const [dailyTime, setDailyTime] = useState("08:00");
  const [dailyPrompt, setDailyPrompt] = useState("");

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDayToggle = (index: number) => {
    const updated = [...daysOfWeek];
    updated[index] = !updated[index];
    setDaysOfWeek(updated);
  };

  const handleWeeklyTimeChange = (index: number, value: string) => {
    const updated = [...weeklyTimes];
    updated[index] = value;
    setWeeklyTimes(updated);
  };

  const handleWeeklyPromptChange = (index: number, value: string) => {
    const updated = [...weeklyPrompts];
    updated[index] = value;
    setWeeklyPrompts(updated);
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <label className="mr-2 font-medium">Routine Type:</label>
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

      {routineType === "daily" && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <label htmlFor="dailyTime" className="font-medium">
              Time:
            </label>
            <input
              type="time"
              id="dailyTime"
              value={dailyTime}
              onChange={(e) => setDailyTime(e.target.value)}
              className="rounded-md border border-black p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dailyPrompt" className="font-medium">
              Prompt:
            </label>
            <input
              type="text"
              id="dailyPrompt"
              value={dailyPrompt}
              onChange={(e) => setDailyPrompt(e.target.value)}
              placeholder="Enter text prompt for time(s)"
              className="rounded-md border border-black p-2"
            />
          </div>
        </div>
      )}

      {routineType === "weekly" && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {dayLabels.map((label, index) => (
              <label key={index} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={daysOfWeek[index]}
                  onChange={() => handleDayToggle(index)}
                />
                {label}
              </label>
            ))}
          </div>

          {daysOfWeek.map(
            (selected, index) =>
              selected && (
                <div
                  key={index}
                  className="flex flex-col gap-2 border-t pt-2 sm:flex-row sm:items-center sm:gap-4"
                >
                  <label className="w-16 font-medium">
                    {dayLabels[index]}:
                  </label>
                  <input
                    type="time"
                    value={weeklyTimes[index]}
                    onChange={(e) =>
                      handleWeeklyTimeChange(index, e.target.value)
                    }
                    className="rounded-md border border-black p-2"
                  />
                  <input
                    type="text"
                    placeholder="Enter prompt"
                    value={weeklyPrompts[index]}
                    onChange={(e) =>
                      handleWeeklyPromptChange(index, e.target.value)
                    }
                    className="flex-1 rounded-md border border-black p-2"
                  />
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
}
