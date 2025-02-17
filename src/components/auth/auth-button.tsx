// AuthButton.tsx
import React, { useEffect } from 'react';
import AuthModal from '@/components/auth/auth-modal';
import { User } from 'lucide-react';

const AuthButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

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
        className="flex cursor-pointer flex-col items-center text-white"
      >
        <User className="h-5 w-5" />
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
