"use client";

import { atom, useAtom } from "jotai";
import { Volume2, VolumeOff } from "lucide-react";

export const volumeAtom = atom(false);

export default function VolumeButton() {
  const [isVolumeOn, setVolume] = useAtom(volumeAtom);
  const toggleVolume = () => {
    setVolume((prev) => !prev);
  };

  return (
    <button
      type="button"
      className="w-12 h-12 bg-black bg-opacity-85 rounded-full flex items-center justify-center"
      onClick={toggleVolume}
    >
      {isVolumeOn ? (
        <Volume2 className="w-6 h-6 text-white" />
      ) : (
        <VolumeOff className="w-6 h-6 text-white" />
      )}
    </button>
  );
}
