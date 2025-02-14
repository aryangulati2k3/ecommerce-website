'use client';

import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

interface CheckoutFormInputs {
  name: string;
  email: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  paymentMethod: string;
}

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormInputs>();

  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const onSubmit = (data: CheckoutFormInputs) => {
    const orderDetails = {
      ...data,
      items: state.items,
      totalPrice,
    };

    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));

    dispatch({ type: 'CLEAR_CART' });
    router.push('/thank-you');
  };

  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <h2 className="mb-6 text-center text-2xl font-bold">Checkout</h2>

      {state.items.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty.</p>
        </div>
      ) : (
        <>
          {/* Order Summary */}
          <div className="mb-6 rounded-lg border p-4 shadow-md">
            <h3 className="mb-4 text-lg font-bold">Order Summary</h3>
            <div className="space-y-4">
              {state.items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center border-b pb-4"
                >
                  <div className="relative h-16 w-16 shrink-0">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="rounded object-contain"
                    />
                  </div>
                  <div className="ml-4 grow">
                    <h3 className="text-md font-semibold">{product.title}</h3>
                    <p className="text-gray-600">
                      ${product.price.toFixed(2)} x {quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="mt-4 text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h3>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h3 className="text-lg font-bold">Shipping Details</h3>

            <input
              type="text"
              {...register('name', { required: 'Full name is required' })}
              placeholder="Full Name"
              className="w-full rounded border p-2"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}

            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              placeholder="Email Address"
              className="w-full rounded border p-2"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            {/* Address Fields */}
            <h3 className="text-lg font-bold">Shipping Address</h3>
            <input
              type="text"
              {...register('street', { required: 'Street is required' })}
              placeholder="Street Address"
              className="w-full rounded border p-2"
            />
            {errors.street && (
              <p className="text-red-500">{errors.street.message}</p>
            )}

            <input
              type="text"
              {...register('city', { required: 'City is required' })}
              placeholder="City"
              className="w-full rounded border p-2"
            />
            {errors.city && (
              <p className="text-red-500">{errors.city.message}</p>
            )}

            <input
              type="text"
              {...register('zip', { required: 'Zip Code is required' })}
              placeholder="Zip Code"
              className="w-full rounded border p-2"
            />
            {errors.zip && <p className="text-red-500">{errors.zip.message}</p>}

            <input
              type="text"
              {...register('country', { required: 'Country is required' })}
              placeholder="Country"
              className="w-full rounded border p-2"
            />
            {errors.country && (
              <p className="text-red-500">{errors.country.message}</p>
            )}

            {/* Payment Method */}
            <h3 className="text-lg font-bold">Payment Method</h3>
            <select
              {...register('paymentMethod')}
              className="w-full rounded border p-2"
            >
              <option value="card">Credit / Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cod">Cash on Delivery</option>
            </select>

            {/* Checkout Button */}
            <button
              type="submit"
              className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
            >
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}
