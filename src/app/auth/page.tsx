'use client';

import React, { useState, useRef } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';

// ------------------- Dummy Data and Validation -------------------

// Dummy registered phone numbers (include country code)
const registeredNumbers = ['+911234567890', '+919876543210'];

// A small list of country codes with flags (expand as needed)
const countryCodes = [{ code: '+91', name: 'India', flag: '🇮🇳' }];

// Zod schema for phone number: requires at least 10 digits
const phoneSchema = z.string().regex(/^\d{10,}$/, {
  message: 'Phone number must be at least 10 digits',
});

// Zod schema for sign-up
const signUpSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().regex(/^\d{10,}$/, {
    message: 'Phone number must be at least 10 digits',
  }),
});

// ------------------- OTP Input Component -------------------

interface OTPInputProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
}

function OTPInput({ otp, setOtp }: OTPInputProps) {
  // Define a ref array for the 6 inputs
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const newOtp = [...otp];
    // Only use the last character, convert to uppercase
    newOtp[index] = value.slice(-1).toUpperCase();
    setOtp(newOtp);
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center space-x-1">
      {Array.from({ length: 6 }).map((_, i) => (
        <React.Fragment key={i}>
          {i === 3 && <span className="mx-2 font-bold">-</span>}
          <input
            type="text"
            value={otp[i] || ''}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            maxLength={1}
            className="h-12 w-12 rounded border border-gray-300 text-center text-xl"
          />
        </React.Fragment>
      ))}
    </div>
  );
}

// ------------------- Sign In / Sign Up Component -------------------

type Step = 'enterPhone' | 'signUp' | 'otp' | 'signedIn';

export default function AuthPage() {
  const [step, setStep] = useState<Step>('enterPhone');
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));

  // ------------------- Handlers -------------------

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      phoneSchema.parse(phoneNumber);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      return;
    }
    const fullNumber = countryCode + phoneNumber;
    if (registeredNumbers.includes(fullNumber)) {
      // Phone exists: go to OTP (sign in)
      setStep('otp');
    } else {
      // Phone not registered: go to sign up
      setSignUpData({ ...signUpData, phone: phoneNumber });
      setStep('signUp');
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      signUpSchema.parse(signUpData);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      return;
    }
    // Dummy: proceed to OTP screen
    setStep('otp');
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setStep('signedIn');
    } else {
      setError('Please enter a valid 6-character OTP');
    }
  };

  // ------------------- Render -------------------

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      {step === 'enterPhone' && (
        <form
          onSubmit={handlePhoneSubmit}
          className="w-full max-w-md rounded bg-white p-6 shadow-md"
        >
          <h2 className="mb-4 text-center text-2xl font-bold">
            Sign In / Sign Up
          </h2>
          {error && <p className="mb-2 text-red-500">{error}</p>}
          <div className="mb-4 flex items-center">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="mr-2 rounded border border-gray-300 p-2"
            >
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} ({c.name})
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            Continue
          </Button>
        </form>
      )}

      {step === 'signUp' && (
        <form
          onSubmit={handleSignUpSubmit}
          className="w-full max-w-md rounded bg-white p-6 shadow-md"
        >
          <h2 className="mb-4 text-center text-2xl font-bold">Sign Up</h2>
          {error && <p className="mb-2 text-red-500">{error}</p>}
          <div className="mb-4">
            <input
              type="text"
              placeholder="First Name"
              value={signUpData.firstName}
              onChange={(e) =>
                setSignUpData({ ...signUpData, firstName: e.target.value })
              }
              className="mb-2 w-full rounded border border-gray-300 p-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={signUpData.lastName}
              onChange={(e) =>
                setSignUpData({ ...signUpData, lastName: e.target.value })
              }
              className="mb-2 w-full rounded border border-gray-300 p-2"
            />
            <input
              type="text"
              placeholder="Phone number"
              value={signUpData.phone}
              onChange={(e) =>
                setSignUpData({ ...signUpData, phone: e.target.value })
              }
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            Sign Up
          </Button>
        </form>
      )}

      {step === 'otp' && (
        <form
          onSubmit={handleOTPSubmit}
          className="w-full max-w-md rounded bg-white p-6 shadow-md"
        >
          <h2 className="mb-4 text-center text-2xl font-bold">Enter OTP</h2>
          {error && <p className="mb-2 text-red-500">{error}</p>}
          <OTPInput otp={otp} setOtp={setOtp} />
          <Button
            type="submit"
            className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            Sign In
          </Button>
        </form>
      )}

      {step === 'signedIn' && (
        <div className="w-full max-w-md rounded bg-white p-6 text-center shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Signed In</h2>
          <p>Welcome! You have successfully signed in.</p>
        </div>
      )}
    </div>
  );
}
