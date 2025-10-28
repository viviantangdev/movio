import React, { useState } from 'react';
import { TICKET_CURRENCY } from '../../../types/ticket';

interface CheckoutCardFormProps {
  amount: number;
  onSuccess?: (payload: { email: string; last4: string }) => void;
};

export default function CheckoutCardForm({
  amount,
  onSuccess,
}: CheckoutCardFormProps) {
  // ----- PRE-FILLED VALUES (valid) -----
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242'); // Visa test card
  const [cardName, setCardName] = useState('John Doe');
  const [expiry, setExpiry] = useState('12/28'); // future date
  const [cvc, setCvc] = useState('123');
  const [email, setEmail] = useState('john@example.com');
  // -------------------------------------

  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setError = (key: string, msg = '') =>
    setErrors((prev) => ({ ...prev, [key]: msg }));

  const clearError = (key: string) => setError(key);

  const validateAll = () => {
    const newErrors: Record<string, string> = {};

    const cardDigits = cardNumber.replace(/\D/g, '');
    if (cardDigits.length < 13 || cardDigits.length > 19) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!cardName.trim()) newErrors.cardName = 'Name required';

    const expDigits = expiry.replace(/\D/g, '');
    if (expDigits.length !== 4) {
      newErrors.expiry = 'Invalid expiry (MM/YY)';
    } else {
      const month = +expDigits.slice(0, 2);
      const year = +expDigits.slice(2);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (month < 1 || month > 12) {
        newErrors.expiry = 'Invalid month';
      } else if (year < currentYear) {
        newErrors.expiry = 'Card expired';
      } else if (year === currentYear && month < currentMonth) {
        newErrors.expiry = 'Card expired';
      }
    }

    if (!/^\d{3,4}$/.test(cvc)) newErrors.cvc = 'Invalid CVC';

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Invalid email';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1000)); // fake API
    setProcessing(false);

    const last4 = cardNumber.replace(/\D/g, '').slice(-4);
    onSuccess?.({ email, last4 });
    alert(`Payment successful — ${TICKET_CURRENCY} ${amount} (•••• ${last4})`);
  };

  // ---------- INPUT COMPONENT ----------
  const Input = React.forwardRef<
    HTMLInputElement,
    {
      label: string;
      value: string;
      onChange: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
      name: string;
      placeholder?: string;
      inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
      maxLength?: number;
    }
  >(
    (
      { label, value, onChange, name, placeholder, inputMode, maxLength },
      ref
    ) => {
      const internalRef = React.useRef<HTMLInputElement>(null);
      const inputRef =
        (ref as React.RefObject<HTMLInputElement>) || internalRef;

      return (
        <div>
          <label className='text-sm font-medium'>{label}</label>
          <input
            ref={inputRef}
            type='text'
            value={value}
            onChange={(e) => onChange(e.target.value, e)}
            placeholder={placeholder}
            inputMode={inputMode}
            maxLength={maxLength}
            className={`mt-1 block w-full rounded-xl border px-4 py-3 text-base transition-colors focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
              errors[name]
                ? 'border-red-400 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500'
            }`}
            aria-invalid={!!errors[name]}
            aria-describedby={errors[name] ? `${name}-error` : undefined}
          />
          {errors[name] && (
            <p id={`${name}-error`} className='mt-1 text-sm text-red-600'>
              {errors[name]}
            </p>
          )}
        </div>
      );
    }
  );
  Input.displayName = 'Input';

  return (
    <div className='w-full md:w-2/3'>
      <form onSubmit={handleSubmit} className='grid gap-5'>
        {/* Card Number */}
        <Input
          label='Card number'
          value={cardNumber}
          onChange={(raw, e) => {
            const input = e.target;
            const digits = raw.replace(/\D/g, '').slice(0, 19);
            const formatted = digits.replace(/(.{4})/g, '$1 ').trim();
            setCardNumber(formatted);

            // keep cursor in the right place
            setTimeout(() => {
              let pos = 0;
              let digitIdx = 0;
              for (
                let i = 0;
                i < formatted.length && digitIdx < digits.length;
                i++
              ) {
                if (/\d/.test(formatted[i])) digitIdx++;
                pos = i + 1;
              }
              input.setSelectionRange(pos, pos);
            }, 0);
          }}
          name='cardNumber'
          placeholder='1234 5678 9012 3456'
          inputMode='numeric'
          maxLength={19}
        />

        {/* Expiry & CVC */}
        <div className='grid grid-cols-2 gap-4'>
          <Input
            label='Expiry (MM/YY)'
            value={expiry}
            onChange={(raw, e) => {
              const input = e.target;
              const digits = raw.replace(/\D/g, '').slice(0, 4);
              const formatted =
                digits.length > 2
                  ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                  : digits;
              setExpiry(formatted);

              setTimeout(() => {
                input.setSelectionRange(formatted.length, formatted.length);
              }, 0);
            }}
            name='expiry'
            placeholder='MM/YY'
            inputMode='numeric'
            maxLength={5}
          />
          <Input
            label='CVC'
            value={cvc}
            onChange={(raw) => {
              const digits = raw.replace(/\D/g, '').slice(0, 4);
              setCvc(digits);
            }}
            name='cvc'
            placeholder='123'
            inputMode='numeric'
            maxLength={4}
          />
        </div>

        {/* Name */}
        <Input
          label='Name on card'
          value={cardName}
          onChange={(v) => {
            setCardName(v);
            if (errors.cardName && v.trim()) clearError('cardName');
          }}
          name='cardName'
          placeholder='Full name as on card'
        />

        {/* Email */}
        <Input
          label='Email'
          value={email}
          onChange={(v) => {
            setEmail(v);
            if (errors.email && v.trim()) clearError('email');
          }}
          name='email'
          placeholder='you@example.com'
          inputMode='email'
        />

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 mt-4'>
          <button
            type='submit'
            disabled={processing}
            className={'flex-1 font-semibold primaryButton'}
          >
            {processing
              ? 'Processing...'
              : `Pay ${TICKET_CURRENCY} ${amount}`}
          </button>

          <button
            type='button'
            onClick={() => {
              setCardNumber('4242 4242 4242 4242');
              setCardName('John Doe');
              setExpiry('12/28');
              setCvc('123');
              setEmail('john@example.com');
              setErrors({});
            }}
            className='secondaryButton'
          >
            Reset to Demo
          </button>
        </div>
      </form>
    </div>
  );
}
