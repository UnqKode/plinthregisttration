import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="absolute min-h-screen bg-gradient-to-br from-black via-gray-900 to-black h-screen w-screen z-20 flex items-center justify-center  overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-blue-500 rounded-full opacity-20 animate-float"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's'
            }}
          />
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* Spinning logo/icon */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-32 h-32 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 animate-spin" />
          
          {/* Middle ring */}
          <div className="absolute inset-3 w-26 h-26 rounded-full border-4 border-transparent border-t-purple-500 border-l-purple-400 animate-spin-slow" />
          
          {/* Inner glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl animate-pulse" />
          </div>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-3xl font-bold text-white animate-pulse">
            Processing Payment
          </h2>
          
          {/* Animated dots */}
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
          
          {/* Progress text */}
          <p className="text-gray-400 text-sm text-center max-w-md animate-pulse">
            Please wait while we verify your payment and register your team...
          </p>
        </div>

        {/* Shimmer effect bar */}
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer" />
        </div>

        {/* Warning message */}
        <div className="flex items-start gap-3 bg-yellow-900/20 border border-yellow-800/50 rounded-lg p-4 max-w-md">
          <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-yellow-200 text-sm font-medium">
              Do not close or refresh this page
            </p>
            <p className="text-yellow-300/70 text-xs mt-1">
              Your submission is being processed
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
          width: 100%;
        }
      `}</style>
    </div>
  );
}