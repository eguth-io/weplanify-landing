'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { TransportJourney } from "@/components/animations";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";

// FAQ Data for SEO
const faqItems = [
  {
    question: "How do I import my transport bookings?",
    answer: "Three ways: forward your confirmation emails, connect Gmail/Outlook for automatic import, or scan your ticket QR code. All the info is extracted automatically."
  },
  {
    question: "What types of transport are supported?",
    answer: "All of them! Flights (all airlines), trains (Amtrak, Eurostar, national railways...), buses, ferries, car rentals, and even rideshares. Everything is centralized in one place."
  },
  {
    question: "Do I get alerts for delays?",
    answer: "Yes, Weplanify monitors your flights and trains in real time. If there's a delay, cancellation, or gate change, you get an instant push notification."
  },
  {
    question: "Can my travel group see the transport details?",
    answer: "Yes! All trip participants can see the added transport. Perfect for coordinating arrivals and departures when everyone isn't traveling together."
  },
  {
    question: "Can I access my tickets offline?",
    answer: "Absolutely. Download your tickets (PDFs, QR codes) to access them even without an internet connection. No more stress searching for your ticket at the airport without wifi."
  }
];

// Journey segment component
function JourneySegment({
  from,
  to,
  type,
  time,
  details,
  delay = 0
}: {
  from: { city: string; code: string; time: string };
  to: { city: string; code: string; time: string };
  type: 'flight' | 'train' | 'car';
  time: string;
  details: string;
  delay?: number;
}) {
  const icons = { flight: '✈️', train: '🚄', car: '🚗' };
  const colors = { flight: '#61DBD5', train: '#F6391A', car: '#EEF899' };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
    >
      {/* Colored stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-2" style={{ backgroundColor: colors[type] }} />

      <div className="flex items-center gap-6 pl-4">
        {/* From */}
        <div className="text-center">
          <p className="font-unbounded font-bold text-2xl text-[#001E13]">{from.code}</p>
          <p className="text-sm text-[#001E13]/50 font-karla">{from.city}</p>
          <p className="font-karla font-semibold text-[#001E13] mt-1">{from.time}</p>
        </div>

        {/* Journey line */}
        <div className="flex-1 flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 relative">
            <motion.div
              initial={{ left: '0%' }}
              animate={{ left: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
            >
              <span className="text-2xl">{icons[type]}</span>
            </motion.div>
          </div>
        </div>

        {/* To */}
        <div className="text-center">
          <p className="font-unbounded font-bold text-2xl text-[#001E13]">{to.code}</p>
          <p className="text-sm text-[#001E13]/50 font-karla">{to.city}</p>
          <p className="font-karla font-semibold text-[#001E13] mt-1">{to.time}</p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between pl-4">
        <span className="text-sm text-[#001E13]/60 font-karla">{details}</span>
        <span className="text-sm font-karla font-semibold text-[#001E13]">{time}</span>
      </div>
    </motion.div>
  );
}

// Ticket stub component
function TicketStub({
  type,
  code,
  details,
  delay = 0
}: {
  type: 'flight' | 'train' | 'hotel';
  code: string;
  details: string;
  delay?: number;
}) {
  const icons = { flight: '✈️', train: '🚄', hotel: '🏨' };

  return (
    <motion.div
      initial={{ opacity: 0, rotateX: -30 }}
      whileInView={{ opacity: 1, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-dashed border-[#F6391A] relative hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icons[type]}</span>
        <div>
          <p className="font-karla font-semibold text-[#001E13]">{code}</p>
          <p className="text-xs text-[#001E13]/50">{details}</p>
        </div>
      </div>
      {/* Perforated edge effect */}
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-around">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-[#FFFBF5] rounded-full -mr-1" />
        ))}
      </div>
    </motion.div>
  );
}

export default function TransportPage() {
  return (
    <>
      <FeatureJsonLd
        featureName="Transport Management - Flights, Trains & Journeys"
        featureDescription="Manage all your travel journeys in one place. Automatic import of flights and trains, real-time alerts, and offline access to your tickets."
        featureUrl="https://weplanify.com/features/transport"
        faqItems={faqItems}
      />

      <div className="min-h-screen bg-[#FFFBF5]">
        {/* Hero */}
        <section className="relative px-4 lg:px-8 pt-[128px] lg:pt-[180px] pb-16 bg-[#001E13] overflow-hidden">
          {/* Animated background lines */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-white to-transparent w-full"
                style={{ top: `${20 + i * 20}%` }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>

          <div className="max-w-6xl mx-auto relative">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full mb-6"
              >
                <span className="text-xl">✈️</span>
                <span className="text-xl">🚄</span>
                <span className="text-xl">🚗</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-6xl font-londrina-solid text-[#FFFBF5] mb-6"
              >
                Flights, trains, cars:
                <br />
                <span className="text-[#61DBD5]">no more lost tickets</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-[#FFFBF5]/70 font-karla max-w-xl mx-auto mb-8"
              >
                Forward your confirmation emails, we extract everything automatically.
                Flight delayed? You'll know before the airline tells you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link href="/signup" className="inline-block">
                  <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                    Centralize my journeys
                  </PulsatingButton>
                </Link>
              </motion.div>
            </div>

            {/* Journey preview */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <JourneySegment
                from={{ city: "Paris", code: "CDG", time: "08:45" }}
                to={{ city: "Lisbon", code: "LIS", time: "10:30" }}
                type="flight"
                time="2h45"
                details="TAP Portugal TP443 • Economy Class"
                delay={0.4}
              />
              <JourneySegment
                from={{ city: "Lisbon", code: "LIS", time: "14:00" }}
                to={{ city: "Porto", code: "PRT", time: "17:15" }}
                type="train"
                time="3h15"
                details="Alfa Pendular • First Class"
                delay={0.5}
              />
            </div>
          </div>
        </section>

        {/* Animation */}
        <section className="px-4 lg:px-8 py-12 bg-[#61DBD5]/10">
          <div className="max-w-4xl mx-auto">
            <TransportJourney autoPlay />
          </div>
        </section>

        {/* Import section */}
        <section className="px-4 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-londrina-solid text-[#001E13] mb-4">
                Automatic Import
              </h2>
              <p className="text-[#001E13]/60 font-karla max-w-xl mx-auto">
                Connect your email or scan your confirmations to import automatically
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <TicketStub type="flight" code="AF1234" details="Paris → Lisbon • April 15" delay={0.1} />
              <TicketStub type="train" code="CP5678" details="Lisbon → Porto • April 18" delay={0.2} />
              <TicketStub type="hotel" code="BOOKING-9012" details="Hotel Porto • 4 nights" delay={0.3} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              {['Gmail', 'Outlook', 'Booking.com', 'Trainline', 'Air France'].map((service, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white rounded-full text-sm font-karla text-[#001E13]/60 shadow-sm hover:shadow-md transition-shadow"
                >
                  {service}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 lg:px-8 py-16 bg-[#001E13]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: "📧", title: "Email Import", desc: "Automatic scanning" },
                { icon: "🔔", title: "Alerts", desc: "Delays and changes" },
                { icon: "📱", title: "Offline", desc: "Access without connection" },
                { icon: "👥", title: "Sharing", desc: "Info for the group" },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6"
                >
                  <span className="text-4xl block mb-3">{f.icon}</span>
                  <h3 className="font-londrina-solid text-lg text-[#FFFBF5] mb-1">{f.title}</h3>
                  <p className="text-sm text-[#FFFBF5]/60 font-karla">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline sync preview */}
        <section className="px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-londrina-solid text-[#001E13] mb-4">
                Syncs with your itinerary
              </h2>
              <p className="text-[#001E13]/60 font-karla">
                Transport automatically integrates into your schedule
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              {/* Mini timeline */}
              <div className="space-y-4">
                {[
                  { time: "08:45", event: "Flight CDG → LIS", icon: "✈️", color: "#61DBD5" },
                  { time: "10:30", event: "Arrive Lisbon", icon: "📍", color: "#F6391A" },
                  { time: "11:00", event: "Hotel transfer", icon: "🚕", color: "#EEF899" },
                  { time: "14:00", event: "Check-in Hotel Alfama", icon: "🏨", color: "#8B5CF6" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + (i * 0.1) }}
                    className="flex items-center gap-4"
                  >
                    <span className="font-karla font-semibold text-[#001E13] w-12">{item.time}</span>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-karla text-[#001E13]">{item.event}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <FeatureFAQ items={faqItems} accentColor="#61DBD5" />

        {/* CTA */}
        <section className="px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#61DBD5] via-[#F6391A] to-[#EEF899] rounded-[32px] p-8 lg:p-12"
            >
              <span className="text-5xl mb-4 block">🗺️</span>
              <h2 className="text-3xl font-londrina-solid text-white mb-4">
                Never lose a ticket again
              </h2>
              <p className="text-white/90 font-karla mb-8 max-w-md mx-auto">
                All your journeys accessible in 2 seconds, even offline
              </p>
              <Link href="/signup" className="inline-block">
                <button className="bg-[#001E13] text-white font-karla font-bold text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg">
                  Find all my tickets
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
