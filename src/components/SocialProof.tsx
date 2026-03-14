'use client';

import { motion } from 'framer-motion';

interface SocialProofProps {
  stats?: {
    value: string;
    label: string;
  }[];
  variant?: 'light' | 'dark';
  className?: string;
}

const defaultStats = [
  { value: "12 000+", label: "voyages planifies" },
  { value: "4.8/5", label: "satisfaction" },
  { value: "2 min", label: "temps moyen" },
];

export default function SocialProof({
  stats = defaultStats,
  variant = 'light',
  className = ''
}: SocialProofProps) {
  const textColor = variant === 'dark' ? 'text-[#FFFBF5]' : 'text-[#001E13]';
  const mutedColor = variant === 'dark' ? 'text-[#FFFBF5]/60' : 'text-[#001E13]/60';
  const dividerColor = variant === 'dark' ? 'bg-[#FFFBF5]/20' : 'bg-[#001E13]/20';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`flex flex-wrap items-center justify-center gap-6 lg:gap-8 font-karla text-sm ${className}`}
    >
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && (
            <div className={`w-px h-4 ${dividerColor} hidden sm:block mr-4 lg:mr-6`} />
          )}
          <span className={`font-semibold ${textColor}`}>{stat.value}</span>
          <span className={mutedColor}>{stat.label}</span>
        </div>
      ))}
    </motion.div>
  );
}
