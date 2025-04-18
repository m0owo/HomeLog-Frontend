"use client";

interface ToggleSwitchProps {
  value: string;
  setValue: (value: string) => void;
}

export default function ToggleSwitch({ value, setValue }: ToggleSwitchProps) {
  return (
    <div
      className={`flex h-8 w-16 flex-row gap-1 rounded-3xl border-[1px] border-black bg-white p-1 ${value === "on" ? "justify-start" : "justify-end"}`}
      onClick={() => (value === "off" ? setValue("on") : setValue("off"))}
    >
      <div
        className={`h-full w-1/2 rounded-3xl p-1 text-center text-[10px] ${value ? "bg-black text-white" : "border-[1px] border-black bg-white text-black"}`}
      >
        {value == "on" ? "On" : "Off"}
      </div>
    </div>
  );
}
