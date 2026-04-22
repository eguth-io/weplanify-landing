'use client';

import { useState } from 'react';
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { trackEvent } from "@/lib/tracking";

interface PartnershipFormData {
  email: string;
  company: string;
  website: string;
  partnershipType: string;
  message: string;
}

const PARTNERSHIP_TYPES = [
  { value: 'affiliate', label: 'Affiliate / Referral' },
  { value: 'integration', label: 'B2B / Integration' },
  { value: 'media', label: 'Media / Press' },
  { value: 'provider', label: 'Travel provider / Supplier' },
  { value: 'influencer', label: 'Creator / Influencer' },
  { value: 'other', label: 'Other' },
];

function buildContent(data: PartnershipFormData): string {
  const typeLabel =
    PARTNERSHIP_TYPES.find((t) => t.value === data.partnershipType)?.label ||
    data.partnershipType;

  const lines = [
    `Company: ${data.company}`,
    data.website ? `Website: ${data.website}` : null,
    `Partnership type: ${typeLabel}`,
    '',
    'Message:',
    data.message,
  ].filter((l): l is string => l !== null);

  return lines.join('\n');
}

export default function PartnershipForm() {
  const [formData, setFormData] = useState<PartnershipFormData>({
    email: '',
    company: '',
    website: '',
    partnershipType: 'affiliate',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          content: buildContent(formData),
          type: 'partnership',
        }),
      });

      if (response.ok) {
        setFormData({
          email: '',
          company: '',
          website: '',
          partnershipType: 'affiliate',
          message: '',
        });
        trackEvent('partnership_form_submit', { status: 'success' });
        alert('Partnership request sent! Our team will get back to you shortly.');
      } else {
        const errorData = await response.json().catch(() => ({}));
        trackEvent('partnership_form_submit', { status: 'error' });
        alert(errorData.message || 'An error occurred while sending your request.');
      }
    } catch {
      alert('Unable to reach the server. Please try again later.');
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
            placeholder="your@email.com"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company / Organization *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            required
            maxLength={150}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-gray-50 focus:bg-white"
            style={{ borderRadius: '8px' }}
            placeholder="Acme Travel"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
            Website
          </label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            maxLength={200}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-gray-50 focus:bg-white"
            style={{ borderRadius: '8px' }}
            placeholder="https://yourcompany.com"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700 mb-2">
            Partnership type *
          </label>
          <select
            id="partnershipType"
            name="partnershipType"
            value={formData.partnershipType}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-gray-50 focus:bg-white"
            style={{ borderRadius: '8px' }}
            disabled={isSubmitting}
          >
            {PARTNERSHIP_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Tell us about your project *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={5}
            maxLength={4000}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-gray-50 focus:bg-white resize-none"
            style={{ borderRadius: '8px' }}
            placeholder="How do you envision working with WePlanify? Share context about your audience, product, or goals."
            disabled={isSubmitting}
          />
        </div>

        <div className="pt-2 flex justify-center">
          <PulsatingButton
            type="submit"
            className="w-full lg:w-64"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send partnership request'}
          </PulsatingButton>
        </div>
      </form>
    </div>
  );
}
