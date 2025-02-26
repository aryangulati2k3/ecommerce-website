'use client';

import { useState } from 'react';
import { Share, Check } from 'lucide-react';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="relative flex items-center justify-center rounded-full border p-2 transition hover:bg-gray-200"
    >
      {copied ? (
        <Check size={20} className="text-green-500" />
      ) : (
        <Share size={20} />
      )}
      {copied && (
        <span className="absolute top-full mt-1 w-max rounded bg-gray-900 px-2 py-1 text-xs text-white">
          Link copied!
        </span>
      )}
    </button>
  );
}
