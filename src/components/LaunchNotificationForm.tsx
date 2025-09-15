'use client';

import { useState, useEffect } from 'react';
import { PulsatingButton } from "@/components/magicui/pulsating-button";

export default function LaunchNotificationForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const savedEmail = localStorage.getItem('launch_notification_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setSubmitStatus('success');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.weplanify.com/api/contact/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          type: 'launch_notification'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        localStorage.setItem('launch_notification_email', email.trim());
      } else {
        const errorData = await response.json().catch(() => ({}));
        setSubmitStatus('error');
        setErrorMessage(errorData.message || 'Une erreur s\'est produite. Veuillez réessayer.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Impossible de joindre le serveur. Veuillez réessayer plus tard.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {submitStatus === 'success' ? (
        <div className="text-center py-2 animate-in fade-in-0 duration-300">
          <div 
            className="relative flex items-center justify-center w-full max-w-xs mx-auto px-8 py-3 bg-green-500 rounded-xl"
            style={{
              "--pulse-color": "#22c55e26",
              "--duration": "1.5s",
            } as React.CSSProperties}
          >
            <span className="relative z-10 text-white font-[600] text-sm">Vous serez alerté du lancement ! 🚀</span>
            <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-xl bg-green-500" />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in-0 duration-300">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              disabled={isSubmitting}
              className="w-full pl-4 pr-44 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-white/90 backdrop-blur-sm placeholder-gray-500"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <PulsatingButton 
                type="submit" 
                className="text-xs px-3 py-2 h-8"
                disabled={isSubmitting || !email.trim()}
              >
                {isSubmitting ? 'Envoi...' : 'Notifier du lancement'}
              </PulsatingButton>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
