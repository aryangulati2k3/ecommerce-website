'use client';

import React, { useState } from 'react';
import { CircleUserRound } from 'lucide-react';
import AuthModal from '@/components/auth/auth-modal';

export default function AuthModalWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center p-0 text-white"
      >
        <CircleUserRound className="h-6 w-6" />
        <span className="mt-1 text-xs">Login</span>
      </button>
      {isOpen && <AuthModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
