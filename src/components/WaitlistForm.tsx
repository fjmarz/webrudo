import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const waitlistSchema = z.object({
  email: z.string().email('Por favor ingresa un email válido'),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  box: z.string().optional(),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

const WaitlistForm = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    try {
      setSubmitStatus('loading');
      setErrorMessage('');

      // Log the form data being submitted
      console.log('Submitting form data:', data);

      // First, check if the email already exists
      const { data: existingUser } = await supabase
        .from('waitlist')
        .select('id')
        .eq('email', data.email.toLowerCase().trim())
        .single();

      if (existingUser) {
        setErrorMessage('Este email ya está registrado en la lista de espera');
        setSubmitStatus('error');
        return;
      }

      // Insert new record
      const { data: insertedData, error } = await supabase
        .from('waitlist')
        .insert({
          email: data.email.toLowerCase().trim(),
          name: data.name.trim(),
          box: data.box?.trim() || null,
        })
        .select()
        .single();

      // Log the response from Supabase
      console.log('Supabase insert response:', { data: insertedData, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Add this code to call the Edge Function directly
 // Add this right after your successful insert
if (insertedData) {
  // Try to send emails directly
  fetch('https://gssfbipcfqjrfqghymfv.supabase.co/functions/v1/notify-waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ record: insertedData })
  })
  .then(response => console.log('Notification status:', response.status))
  .catch(err => console.error('Notification error:', err));
}

      setSubmitStatus('success');
      reset();
    } catch (error: any) {
      console.error('Error details:', error);
      setErrorMessage(
        error?.message || 'Hubo un error al procesar tu registro. Por favor intenta de nuevo.'
      );
      setSubmitStatus('error');
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-4">
        <div className="mb-4 text-green-400">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">¡Gracias por registrarte!</h3>
        <p className="text-gray-400">Te contactaremos pronto con más información.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errorMessage && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Nombre completo"
          {...register('name')}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] focus:border-transparent text-white placeholder-gray-400"
        />
        {errors.name && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <input
          type="email"
          placeholder="Email"
          {...register('email')}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] focus:border-transparent text-white placeholder-gray-400"
        />
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <input
          type="text"
          placeholder="Nombre de tu box (opcional)"
          {...register('box')}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] focus:border-transparent text-white placeholder-gray-400"
        />
      </div>

      <button
        type="submit"
        disabled={submitStatus === 'loading'}
        className="group relative w-full inline-flex items-center justify-center"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8A2BE2] to-[#4169E1] rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
        <span className="relative w-full bg-[#0A0A0A]/90 text-white px-8 py-4 rounded-lg font-bold tracking-wide inline-flex items-center justify-center gap-3 border border-white/10 hover:border-white/20 transition-all duration-500 group-hover:bg-[#0A0A0A]/70">
          {submitStatus === 'loading' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              RESERVA TU ACCESO
              <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2} />
            </>
          )}
        </span>
      </button>
    </form>
  );
};

export default WaitlistForm;