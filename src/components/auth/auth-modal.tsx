import React, { useEffect, useState, KeyboardEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';

// Common styling variables
const baseInputClasses =
  'w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500';
const baseLabelClasses = 'block text-sm font-medium text-gray-700 mb-1';
const errorTextClasses = 'text-red-500 text-xs mt-1';

// Zod schemas for each step
const phoneSchema = z.object({
  mobile: z
    .string()
    .regex(/^\d{10}$/, 'Mobile number must be exactly 10 digits'),
});
type PhoneFormValues = z.infer<typeof phoneSchema>;

const nameSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});
type NameFormValues = z.infer<typeof nameSchema>;

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 characters')
    .regex(/^[A-Za-z0-9]+$/, 'OTP must be alphanumeric'),
});
type OTPFormValues = z.infer<typeof otpSchema>;

interface AuthData {
  mobile: string;
  firstName: string;
  lastName: string;
  otp: string;
}

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<Partial<AuthData>>({});

  // Close modal on Escape key press
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') onClose();
    });
    return () =>
      document.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') onClose();
      });
  }, [onClose]);

  const nextStep = (newData: Partial<AuthData>) => {
    setData((prev) => ({ ...prev, ...newData }));
    setStep((prev) => prev + 1);
  };

  const handleFinalSubmit = (newData: Partial<AuthData>) => {
    const finalData = { ...data, ...newData } as AuthData;
    console.log('Final Auth Data:', finalData);
    // Process finalData (API call, etc.)
    onClose();
  };

  return (
    <div
      className="relative w-full max-w-md rounded bg-white p-6 shadow-lg"
      role="dialog"
      aria-modal="true"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {/* Close button */}
      <button
        className="absolute top-2 right-2 text-2xl leading-none text-gray-500 hover:text-gray-700"
        onClick={onClose}
        aria-label="Close modal"
      >
        &times;
      </button>

      {step === 1 && <StepOne onNext={nextStep} />}
      {step === 2 && <StepTwo onNext={nextStep} onBack={() => setStep(1)} />}
      {step === 3 && (
        <StepThree onSubmit={handleFinalSubmit} onBack={() => setStep(2)} />
      )}
    </div>
  );
};

interface StepOneProps {
  onNext: (data: PhoneFormValues) => void;
}

const StepOne: React.FC<StepOneProps> = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <h2 className="text-center text-xl font-semibold">Enter Mobile Number</h2>
      <div className="flex">
        <span className="inline-flex items-center rounded-l border border-r-0 border-gray-300 bg-gray-100 px-3">
          +91
        </span>
        <input
          type="text"
          {...register('mobile')}
          className={`${baseInputClasses} rounded-l-none`}
          placeholder="10-digit mobile number"
          autoFocus
        />
      </div>
      {errors.mobile && (
        <p className={errorTextClasses}>{errors.mobile.message}</p>
      )}
      <div className="flex justify-end">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

interface StepTwoProps {
  onNext: (data: NameFormValues) => void;
  onBack: () => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NameFormValues>({
    resolver: zodResolver(nameSchema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <h2 className="text-center text-xl font-semibold">Enter Your Name</h2>
      <div>
        <label className={baseLabelClasses}>First Name</label>
        <input
          type="text"
          {...register('firstName')}
          className={baseInputClasses}
          autoFocus
        />
        {errors.firstName && (
          <p className={errorTextClasses}>{errors.firstName.message}</p>
        )}
      </div>
      <div>
        <label className={baseLabelClasses}>Last Name</label>
        <input
          type="text"
          {...register('lastName')}
          className={baseInputClasses}
        />
        {errors.lastName && (
          <p className={errorTextClasses}>{errors.lastName.message}</p>
        )}
      </div>
      <div className="flex justify-between">
        <Button type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
};

interface StepThreeProps {
  onSubmit: (data: OTPFormValues) => void;
  onBack: () => void;
}

const StepThree: React.FC<StepThreeProps> = ({ onSubmit, onBack }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-center text-xl font-semibold">OTP Verification</h2>
      <div>
        <label className={baseLabelClasses}>Enter OTP</label>
        <input
          type="text"
          {...register('otp')}
          className={baseInputClasses}
          placeholder="6-digit OTP"
          autoFocus
        />
        {errors.otp && <p className={errorTextClasses}>{errors.otp.message}</p>}
      </div>
      <div className="flex justify-between">
        <Button type="button" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

export default AuthModal;
