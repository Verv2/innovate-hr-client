"use client";

import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl"
          style={{
            animation: "blob 7s infinite",
          }}
        ></div>
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl"
          style={{
            animation: "blob 7s infinite",
            animationDelay: "2s",
          }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl"
          style={{
            animation: "blob 7s infinite",
            animationDelay: "4s",
          }}
        ></div>
      </div>

      {/* Main Loading Container */}
      <div className="relative z-10 text-center space-y-8 p-8">
        {/* Logo/Brand */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            InnovateHR
          </h1>
        </div>

        {/* Morphing Shapes Loader */}
        <div className="space-y-6">
          <div className="h-32 flex items-center justify-center">
            <div
              className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400"
              style={{
                animation: "morph 2s ease-in-out infinite",
              }}
            ></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto space-y-2">
          <div className="flex justify-between text-sm text-gray-300">
            <span>Loading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-100 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Status Text */}
        <p className="text-gray-400 text-sm animate-pulse">
          Preparing your experience...
        </p>
      </div>

      {/* Floating Elements */}
      <div
        className="absolute top-20 left-20"
        style={{ animation: "float 6s ease-in-out infinite" }}
      >
        <div className="w-4 h-4 text-purple-400 opacity-60">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </div>
      </div>
      <div
        className="absolute bottom-20 right-20"
        style={{
          animation: "float 6s ease-in-out infinite",
          animationDelay: "2s",
        }}
      >
        <div className="w-6 h-6 text-yellow-400 opacity-60">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
          </svg>
        </div>
      </div>
      <div
        className="absolute top-1/2 left-10"
        style={{
          animation: "float 6s ease-in-out infinite",
          animationDelay: "4s",
        }}
      >
        <Sparkles className="w-5 h-5 text-pink-400 opacity-60" />
      </div>

      {/* Inline Keyframe Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes morph {
          0%,
          100% {
            border-radius: 20px;
            transform: rotate(0deg);
          }
          25% {
            border-radius: 50%;
            transform: rotate(90deg);
          }
          50% {
            border-radius: 10px;
            transform: rotate(180deg);
          }
          75% {
            border-radius: 50%;
            transform: rotate(270deg);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
