"use client";

import { atom, useAtom } from "jotai";
import { Repeat2 } from "lucide-react";

export const repeatAtom = atom(true);

export default function VideoRepeatButton() {
  const [isRepeatOn, setRepeat] = useAtom(repeatAtom);
  const toggleRepeat = () => {
    setRepeat((prev) => !prev);
  };

  return (
    <button
      type="button"
      className="w-12 h-12 bg-black bg-opacity-85 rounded-full flex items-center justify-center"
      onClick={toggleRepeat}
    >
      {isRepeatOn ? (
        <Repeat2 className="w-6 h-6 text-white" />
      ) : (
        <Repeat2 className="w-6 h-6 text-gray-600" />
      )}
    </button>
  );
}
