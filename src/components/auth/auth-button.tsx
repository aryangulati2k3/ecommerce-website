'use client';

import React, { useEffect, useState } from 'react';
import AuthModal from '@/components/auth/auth-modal';
import { User } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

// Define button styles using CVA
const authButtonVariants = cva(
  'flex cursor-pointer flex-col items-center transition-colors duration-200',
  {
    variants: {
      variant: {
        white: 'text-white hover:text-gray-200',
        green: 'text-gray-700 hover:text-green-600',
      },
    },
    defaultVariants: {
      variant: 'white',
    },
  }
);

interface AuthButtonProps extends VariantProps<typeof authButtonVariants> {}

const AuthButton: React.FC<AuthButtonProps> = ({ variant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={authButtonVariants({ variant })}
      >
        <User size={24} />
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300"
            onClick={() => setIsModalOpen(false)}
            aria-hidden="true"
          />
          {/* Modal */}
          <AuthModal onClose={() => setIsModalOpen(false)} />
        </div>
      )}
    </>
  );
};

export default AuthButton;
