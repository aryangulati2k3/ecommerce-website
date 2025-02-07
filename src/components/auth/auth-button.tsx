// AuthButton.tsx
import React, { useEffect } from 'react';
import AuthModal from '@/components/auth/auth-modal';
import { User } from 'lucide-react';

const AuthButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)} 
        className="flex flex-col items-center text-white"
      >
        <User className="h-6 w-6" />
        <span className="mt-1 text-xs">Sign In</span>
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
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
