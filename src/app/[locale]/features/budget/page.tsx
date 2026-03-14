'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { BudgetSplit } from "@/components/animations";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";

// FAQ Data for SEO
const faqItems = [
  {
    question: "How does expense splitting work on Weplanify?",
    answer: "Add each expense by indicating who paid and who participated. The app automatically calculates everyone's balance and shows who owes how much to whom to settle up at the end of the trip."
  },
  {
    question: "Can you manage multiple currencies?",
    answer: "Yes, Weplanify supports all currencies. Add expenses in euros, dollars, yen, or any other currency. The app automatically converts at the current exchange rate for accurate balance calculations."
  },
  {
    question: "How can I add an expense quickly?",
    answer: "Three options: enter the amount manually, take a photo of the receipt (automatic recognition), or import from your bank. Adding an expense takes less than 10 seconds."
  },
  {
    question: "Are reimbursements optimized?",
    answer: "Yes! The algorithm minimizes the number of transactions needed to settle accounts. For example, if A owes $20 to B and B owes $20 to C, the app directly suggests that A reimburse C."
  },
  {
    question: "Can you exclude certain people from an expense?",
    answer: "Absolutely. For each expense, select only the participants involved. Perfect for when some people don't join an activity or meal."
  }
];

// Receipt item component
function ReceiptItem({
  name,
  amount,
  paidBy,
  participants,
  delay = 0
}: {
  name: string;
  amount: number;
  paidBy: string;
  participants: string[];
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-[#F6391A] hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-karla font-semibold text-[#001E13]">{name}</h4>
          <p className="text-sm text-[#001E13]/50">Paid by {paidBy}</p>
        </div>
        <span className="font-unbounded font-bold text-[#F6391A]">${amount}</span>
      </div>
      <div className="flex gap-1">
        {participants.map((p, i) => (
          <span key={i} className="text-lg">{p}</span>
        ))}
      </div>
    </motion.div>
  );
}

// Balance card
function BalanceCard({
  name,
  avatar,
  balance,
  delay = 0
}: {
  name: string;
  avatar: string;
  balance: number;
  delay?: number;
}) {
  const isPositive = balance > 0;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white rounded-xl p-4 shadow-sm text-center hover:shadow-md transition-shadow"
    >
      <span className="text-3xl mb-2 block">{avatar}</span>
      <p className="font-karla font-semibold text-[#001E13] mb-1">{name}</p>
      <p className={`font-unbounded font-bold text-lg ${isPositive ? 'text-green-600' : 'text-[#F6391A]'}`}>
        {isPositive ? '+$' : '-$'}{Math.abs(balance)}
      </p>
      <p className="text-xs text-[#001E13]/40 mt-1">
        {isPositive ? 'to receive' : 'owes'}
      </p>
    </motion.div>
  );
}

export default function BudgetPage() {
  return (
    <>
      <FeatureJsonLd
        featureName="Travel Budget - Group Expense Splitting"
        featureDescription="Easily manage group travel expenses. Payment tracking, automatic fair splitting, and simplified reimbursements for your vacation with friends."
        featureUrl="https://weplanify.com/features/budget"
        faqItems={faqItems}
      />

      <div className="min-h-screen bg-[#FFFBF5]">
        {/* Hero */}
        <section className="relative px-4 lg:px-8 pt-[128px] lg:pt-[180px] pb-16 bg-gradient-to-b from-[#001E13] to-[#001E13]/95">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1 bg-[#EEF899]/20 rounded-full mb-4"
                >
                  <span className="text-lg">💰</span>
                  <span className="text-[#EEF899] font-karla text-sm">Expense Management</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl lg:text-6xl font-londrina-solid text-[#FFFBF5] mb-6"
                >
                  Expense Splitting:
                  <br />
                  <span className="text-[#EEF899]">who owes how much to whom?</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-[#FFFBF5]/70 font-karla mb-8 max-w-md"
                >
                  Marie paid for the restaurant, Thomas for the rental. Who owes what at the end of the trip?
                  Let the app do the math while you enjoy the party.
                </motion.p>

                {/* Quick stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8"
                >
                  {[
                    { value: "$2,450", label: "Total expenses" },
                    { value: "6", label: "Participants" },
                    { value: "23", label: "Transactions" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center lg:text-left">
                      <p className="font-unbounded font-bold text-2xl text-[#FFFBF5]">{stat.value}</p>
                      <p className="text-sm text-[#FFFBF5]/50 font-karla">{stat.label}</p>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link href="/signup" className="inline-block">
                    <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                      Manage my expenses
                    </PulsatingButton>
                  </Link>
                </motion.div>
              </div>

              {/* Right - Balance visualization */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                {/* Pie chart */}
                <div className="relative mx-auto w-64 h-64">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#61DBD5" strokeWidth="20" strokeDasharray="75 251" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F6391A" strokeWidth="20" strokeDasharray="60 251" strokeDashoffset="-75" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#EEF899" strokeWidth="20" strokeDasharray="50 251" strokeDashoffset="-135" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#001E13" strokeWidth="20" strokeDasharray="66 251" strokeDashoffset="-185" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-unbounded font-bold text-3xl text-[#FFFBF5]">$2,450</p>
                      <p className="text-sm text-[#FFFBF5]/50 font-karla">Total</p>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  {[
                    { color: '#61DBD5', label: 'Accommodation', pct: '30%' },
                    { color: '#F6391A', label: 'Restaurants', pct: '24%' },
                    { color: '#EEF899', label: 'Activities', pct: '20%' },
                    { color: '#001E13', label: 'Transport', pct: '26%' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-[#FFFBF5]/70 font-karla">{item.label} ({item.pct})</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Animation */}
        <section className="px-4 lg:px-8 py-12 bg-[#61DBD5]/10">
          <div className="max-w-4xl mx-auto">
            <BudgetSplit autoPlay />
          </div>
        </section>

        {/* Expenses and balances */}
        <section className="px-4 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Recent expenses */}
              <div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-2xl font-londrina-solid text-[#001E13] mb-6"
                >
                  Recent Expenses
                </motion.h2>
                <div className="space-y-4">
                  <ReceiptItem
                    name="Restaurant dinner"
                    amount={156}
                    paidBy="Marie"
                    participants={['👩‍🎨', '🧔', '👱‍♀️', '🧑‍💻']}
                    delay={0.1}
                  />
                  <ReceiptItem
                    name="Car rental"
                    amount={320}
                    paidBy="Thomas"
                    participants={['👩‍🎨', '🧔', '👱‍♀️', '🧑‍💻', '😊', '👨‍🦱']}
                    delay={0.2}
                  />
                  <ReceiptItem
                    name="Museum tickets"
                    amount={84}
                    paidBy="Emma"
                    participants={['👩‍🎨', '🧔', '👱‍♀️']}
                    delay={0.3}
                  />
                </div>
              </div>

              {/* Balances */}
              <div>
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-2xl font-londrina-solid text-[#001E13] mb-6"
                >
                  Who Owes What
                </motion.h2>
                <div className="grid grid-cols-3 gap-4">
                  <BalanceCard name="Marie" avatar="👩‍🎨" balance={-45} delay={0.1} />
                  <BalanceCard name="Thomas" avatar="🧔" balance={128} delay={0.2} />
                  <BalanceCard name="Emma" avatar="👱‍♀️" balance={-32} delay={0.3} />
                  <BalanceCard name="Lucas" avatar="🧑‍💻" balance={-67} delay={0.4} />
                  <BalanceCard name="Julie" avatar="😊" balance={24} delay={0.5} />
                  <BalanceCard name="Pierre" avatar="👨‍🦱" balance={-8} delay={0.6} />
                </div>

                {/* Settlement suggestion */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 p-4 bg-[#61DBD5]/10 rounded-xl border border-[#61DBD5]/30"
                >
                  <p className="text-sm font-karla text-[#001E13]/70 mb-2">💡 To settle up:</p>
                  <p className="font-karla text-[#001E13]">
                    Marie → Thomas: <span className="font-bold">$45</span>
                  </p>
                  <p className="font-karla text-[#001E13]">
                    Lucas → Thomas: <span className="font-bold">$67</span>
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 lg:px-8 py-16 bg-[#001E13]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: "📸", title: "Scan receipt", desc: "Photo = expense added" },
                { icon: "💱", title: "Multi-currency", desc: "Euros, dollars, yen..." },
                { icon: "🔄", title: "Smart settling", desc: "Fewer transactions" },
                { icon: "📊", title: "Statistics", desc: "Visualize your expenses" },
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

        {/* FAQ Section */}
        <FeatureFAQ items={faqItems} accentColor="#EEF899" />

        {/* CTA */}
        <section className="px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#EEF899] to-[#61DBD5] rounded-[32px] p-8 lg:p-12"
            >
              <span className="text-5xl mb-4 block">💰</span>
              <h2 className="text-3xl font-londrina-solid text-[#001E13] mb-4">
                No more money arguments
              </h2>
              <p className="text-[#001E13]/70 font-karla mb-8 max-w-md mx-auto">
                Let the app handle the accounts for you
              </p>
              <Link href="/signup" className="inline-block">
                <button className="bg-[#001E13] text-white font-karla font-bold text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg">
                  Calculate who owes me money
                </button>
              </Link>
              <p className="text-sm text-[#001E13]/50 mt-3 font-karla">Free, no credit card required</p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
