import React from 'react';

export default function Header() {
  return (
    <div className="mb-8 sm:mb-12">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">TaskFlow</h1>
      </div>

      {/* Welcome text */}
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-balance">
          Organize your day
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          Create, manage, and track your tasks with ease
        </p>
      </div>
    </div>
  );
}
