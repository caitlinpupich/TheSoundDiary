"use client";

import { useState, useRef, useEffect } from "react";

interface AudioPlayerProps {
  title: string;
  src: string;
  caption?: string;
}

export default function AudioPlayer({ title, src, caption }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration || 1;
    setCurrentTime(current);
    setProgress((current / total) * 100);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = (Number(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
    setProgress(Number(e.target.value));
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      isPlaying 
        ? "bg-zinc-900 border-indigo-500 shadow-lg shadow-indigo-500/10 text-white" 
        : "bg-zinc-950/50 border-zinc-800 text-zinc-200 hover:border-zinc-700"
    }`}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex flex-col gap-4">
        {/* Header / Meta */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            {caption && <p className="text-sm text-zinc-400 mt-1">{caption}</p>}
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform active:scale-95 ${
              isPlaying ? "bg-indigo-500 text-white" : "bg-zinc-100 text-zinc-900 hover:bg-white"
            }`}
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? (
              // Pause Icon
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              // Play Icon
              <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>

        {/* Progress Bar & Timers */}
        <div className="space-y-1.5">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1.5 bg-zinc-800 accent-indigo-500 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-zinc-400 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}