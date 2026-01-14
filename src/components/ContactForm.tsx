'use client';

import { useState } from 'react';
import { toast } from "sonner";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

interface ContactFormData {
  email: string;
  content: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    content: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.weplanify.com/api/contact/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          content: formData.content,
          type: 'custom'
        }),
      });

      if (response.ok) {
        setFormData({
          email: '',
          content: ''
        });
        toast.success("Message envoyé !", {
          description: "Nous vous répondrons dans les plus brefs délais",
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error("Erreur", {
          description: errorData.message || 'Une erreur s\'est produite lors de l\'envoi du message.',
        });
      }
    } catch {
      toast.error("Erreur de connexion", {
        description: 'Impossible de joindre le serveur. Veuillez réessayer plus tard.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-lg hover:shadow-md transition-all duration-300 mb-8 border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-gray-50 focus:bg-white"
            style={{ borderRadius: '8px' }}
            placeholder="votre@email.com"
            disabled={isSubmitting}
          />
        </div>
        
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-gray-50 focus:bg-white resize-none"
            style={{ borderRadius: '8px' }}
            placeholder="Décrivez votre question ou votre demande..."
            disabled={isSubmitting}
          />
        </div>

        <div className="pt-2 flex justify-center">
          <PulsatingButton
            type="submit"
            className="w-full lg:w-64"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
          </PulsatingButton>
        </div>
      </form>
    </div>
  );
}
