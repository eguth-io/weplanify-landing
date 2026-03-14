'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { LiveVoting } from "@/components/animations";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";

// FAQ Data for SEO
const faqItems = [
  {
    question: "How do I create a poll for my travel group?",
    answer: "In seconds! Choose a poll type (destination, restaurant, activity, date), add your options, and share. Participants get notified and vote directly from the app."
  },
  {
    question: "Are votes anonymous?",
    answer: "Your choice! You can create public polls (everyone sees who voted what) or anonymous ones (only results visible). Handy depending on the topic."
  },
  {
    question: "Can I set a voting deadline?",
    answer: "Yes, you can schedule an end date and time. Non-voters get automatic reminders. When time's up, the result is announced to the group."
  },
  {
    question: "What happens in case of a tie?",
    answer: "Several options: run a runoff between tied options, let the creator decide, or use random selection. You choose the tiebreaker method at creation."
  },
  {
    question: "Can I vote for multiple options?",
    answer: "Yes! You can allow multiple votes (choose several options) or single vote. You can also let participants add new options after creation."
  }
];

// Poll option with live voting animation
function PollOption({
  option,
  votes,
  totalVotes,
  voters,
  isWinning = false,
  onVote,
  delay = 0
}: {
  option: string;
  votes: number;
  totalVotes: number;
  voters: string[];
  isWinning?: boolean;
  onVote: () => void;
  delay?: number;
}) {
  const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onClick={onVote}
      className={`relative bg-white rounded-xl p-4 cursor-pointer border-2 transition-all hover:shadow-md ${
        isWinning ? 'border-[#F6391A]' : 'border-transparent'
      }`}
    >
      {/* Progress bar background */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.5 }}
        className={`absolute inset-0 rounded-xl ${isWinning ? 'bg-[#F6391A]/10' : 'bg-gray-100'}`}
      />

      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{option}</span>
          <div className="flex -space-x-2">
            {voters.slice(0, 3).map((v, i) => (
              <span key={i} className="text-lg">{v}</span>
            ))}
            {voters.length > 3 && (
              <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-karla">
                +{voters.length - 3}
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <span className={`font-unbounded font-bold text-lg ${isWinning ? 'text-[#F6391A]' : 'text-[#001E13]'}`}>
            {percentage}%
          </span>
          <p className="text-xs text-[#001E13]/40 font-karla">{votes} votes</p>
        </div>
      </div>
    </motion.div>
  );
}

// Live poll card
function LivePoll({
  question,
  options,
  totalVotes,
  endTime,
  delay = 0
}: {
  question: string;
  options: { option: string; votes: number; voters: string[] }[];
  totalVotes: number;
  endTime: string;
  delay?: number;
}) {
  const [pollOptions, setPollOptions] = useState(options);
  const [total, setTotal] = useState(totalVotes);

  const maxVotes = Math.max(...pollOptions.map(o => o.votes));

  const handleVote = (index: number) => {
    const newOptions = [...pollOptions];
    newOptions[index].votes += 1;
    newOptions[index].voters.push('🙋');
    setPollOptions(newOptions);
    setTotal(t => t + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-[#FFFBF5] rounded-2xl p-6 shadow-lg border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-londrina-solid text-xl text-[#001E13]">{question}</h3>
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-karla flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Active
        </span>
      </div>

      <div className="space-y-3 mb-4">
        {pollOptions.map((opt, i) => (
          <PollOption
            key={i}
            option={opt.option}
            votes={opt.votes}
            totalVotes={total}
            voters={opt.voters}
            isWinning={opt.votes === maxVotes && opt.votes > 0}
            onVote={() => handleVote(i)}
            delay={delay + 0.1 + (i * 0.1)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-[#001E13]/50 font-karla">
        <span>{total} votes</span>
        <span>Ends {endTime}</span>
      </div>
    </motion.div>
  );
}

export default function PollsPage() {
  return (
    <>
      <FeatureJsonLd
        featureName="Travel Polls - Group Decisions"
        featureDescription="Make group decisions easily with Weplanify polls. Vote in real-time to choose destinations, activities, and restaurants for your vacation."
        featureUrl="https://weplanify.com/features/polls"
        faqItems={faqItems}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#8B5CF6]/10 via-[#FFFBF5] to-[#FFFBF5]">
        {/* Hero */}
        <section className="relative px-4 lg:px-8 pt-[128px] lg:pt-[180px] pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-1 bg-[#8B5CF6]/20 rounded-full mb-4"
                >
                  <span className="text-lg">🗳️</span>
                  <span className="text-[#8B5CF6] font-karla text-sm">Live polls</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl lg:text-6xl font-londrina-solid text-[#001E13] mb-6"
                >
                  Decide together
                  <br />
                  <span className="text-[#8B5CF6]">in 2 minutes</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-[#001E13]/70 font-karla mb-4 max-w-md"
                >
                  Pizza or sushi? Hotel or Airbnb?
                  One quick vote replaces 47 WhatsApp messages.
                </motion.p>

                {/* Social proof */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-sm text-[#8B5CF6] font-karla mb-8"
                >
                  +50,000 decisions made this month
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link href="/signup" className="inline-block">
                    <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                      Create my first poll
                    </PulsatingButton>
                  </Link>
                  <p className="text-sm text-[#001E13]/50 mt-2 font-karla">Free - Ready in 30 seconds</p>
                </motion.div>
              </div>

              {/* Right - Live poll demo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <LivePoll
                  question="Where are we eating tonight? 🍽️"
                  options={[
                    { option: "🍕 Pizza", votes: 4, voters: ['👩‍🎨', '🧔', '👱‍♀️', '🧑‍💻'] },
                    { option: "🍣 Sushi", votes: 3, voters: ['😊', '👨‍🦱', '🧑‍🦰'] },
                    { option: "🍔 Burger", votes: 2, voters: ['👩‍🦳', '🧑‍🎤'] },
                  ]}
                  totalVotes={9}
                  endTime="in 2h"
                  delay={0.4}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Animation */}
        <section className="px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <LiveVoting autoPlay />
          </div>
        </section>

        {/* Multiple polls showcase */}
        <section className="px-4 lg:px-8 py-16 bg-[#001E13]">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-londrina-solid text-[#FFFBF5] text-center mb-4"
            >
              From destination to restaurant: decide everything together
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center text-[#FFFBF5]/60 font-karla mb-12 max-w-xl mx-auto"
            >
              Destinations, activities, restaurants, dates... everything can be decided together
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  question: "Which destination?",
                  options: ["🇪🇸 Spain", "🇵🇹 Portugal", "🇮🇹 Italy"],
                  winner: "🇵🇹 Portugal",
                  votes: 12,
                  status: "completed"
                },
                {
                  question: "Day 3 activity?",
                  options: ["🏄 Surfing", "🚶 Hiking", "🍷 Wine tasting"],
                  winner: "🏄 Surfing",
                  votes: 8,
                  status: "completed"
                },
                {
                  question: "Hotel or Airbnb?",
                  options: ["🏨 Hotel", "🏠 Airbnb"],
                  winner: "🏠 Airbnb",
                  votes: 10,
                  status: "completed"
                },
              ].map((poll, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/15 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-londrina-solid text-lg text-[#FFFBF5]">{poll.question}</h3>
                    <span className="px-2 py-1 bg-[#FFFBF5]/10 text-[#FFFBF5]/60 text-xs rounded-full font-karla">
                      {poll.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{poll.winner.split(' ')[0]}</span>
                    <span className="font-karla text-[#FFFBF5]">{poll.winner.split(' ')[1]}</span>
                    <span className="ml-auto text-[#61DBD5] font-bold">✓</span>
                  </div>
                  <p className="text-sm text-[#FFFBF5]/40 font-karla">{poll.votes} votes</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "⚡",
                  title: "Real-time",
                  desc: "Votes appear instantly for everyone"
                },
                {
                  icon: "🔒",
                  title: "Anonymous or public",
                  desc: "Choose if votes are visible or hidden"
                },
                {
                  icon: "🔔",
                  title: "Reminders",
                  desc: "Automatically nudge those who haven't voted"
                },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-5xl block mb-4">{f.icon}</span>
                  <h3 className="font-londrina-solid text-xl text-[#001E13] mb-2">{f.title}</h3>
                  <p className="text-[#001E13]/60 font-karla">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FeatureFAQ items={faqItems} accentColor="#8B5CF6" />

        {/* CTA */}
        <section className="px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#8B5CF6] to-[#F6391A] rounded-[32px] p-8 lg:p-12"
            >
              <span className="text-5xl mb-4 block">🗳️</span>
              <h2 className="text-3xl font-londrina-solid text-white mb-4">
                No more endless debates
              </h2>
              <p className="text-white/80 font-karla mb-8 max-w-md mx-auto">
                Let the group decide, democratically
              </p>
              <Link href="/signup" className="inline-block">
                <button className="bg-white text-[#001E13] font-karla font-bold text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg">
                  Settle the debate now
                </button>
              </Link>
              <p className="text-sm text-white/60 mt-3 font-karla">Free, no credit card required</p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
