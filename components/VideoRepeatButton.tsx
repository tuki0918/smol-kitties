"use client";

import { atom, useAtom } from "jotai";
import { RefreshCw, RefreshCwOff } from "lucide-react";

export const repeatAtom = atom(true);

export default function VideoRepeatButton() {
  const [isRepeatOn, setRepeat] = useAtom(repeatAtom);
  const toggleRepeat = () => {
    setRepeat((prev) => !prev);
  };

  return (
    <button
      type="button"
      className="w-12 h-12 bg-gray-900/50 hover:bg-gray-600/50 rounded-full flex items-center justify-center"
      onClick={toggleRepeat}
    >
      {isRepeatOn ? (
        <RefreshCw className="w-6 h-6 text-white" />
      ) : (
        <RefreshCwOff className="w-6 h-6 text-white" />
      )}
    </button>
  );
}
