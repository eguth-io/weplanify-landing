'use client';

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { BudgetSplit } from "@/components/animations";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";

// Non-translatable presentation constants (formerly Sanity data.*).
const FEATURE = {
  slug: "budget",
  icon: "💰",
  accentColor: "#EEF899",
  gradientFrom: "#EEF899",
} as const;

type Stat = { value: string; label: string };
type FeatureItem = { icon: string; title: string; description: string };
type FaqItem = { question: string; answer: string };

type Participant = { name: string; avatar: string };
type Expense = { name: string; amount: number; paidBy: string };
type ExpensePreset = { name: string; amount: number; emoji: string };

type Copy = {
  paidBy: string;
  toReceive: string;
  owes: string;
  total: string;
  pieLabels: { accommodation: string; restaurants: string; activities: string; transport: string };
  liveSplitTitle: string;
  liveSplitSubtitle: string;
  quickAdd: string;
  recentExpenses: string;
  whoOwesWhat: string;
  toSettleUp: string;
  freeNoCard: string;
  tryItHint: string;
  participants: Participant[];
  expenses: Expense[];
  presets: ExpensePreset[];
};

// Compute balances assuming each expense is split equally across all participants.
function computeBalances(expenses: Expense[], participants: Participant[]): Record<string, number> {
  const n = participants.length;
  const balances: Record<string, number> = Object.fromEntries(participants.map((p) => [p.name, 0]));
  for (const e of expenses) {
    if (!(e.paidBy in balances)) continue;
    const share = e.amount / n;
    balances[e.paidBy] += e.amount - share;
    for (const p of participants) {
      if (p.name !== e.paidBy) balances[p.name] -= share;
    }
  }
  // Round to integers for display cleanliness.
  return Object.fromEntries(Object.entries(balances).map(([k, v]) => [k, Math.round(v)]));
}

// Compute the minimum set of transfers to settle all balances.
function computeSettlements(balances: Record<string, number>): { from: string; to: string; amount: number }[] {
  const creditors = Object.entries(balances).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ name: k, amount: v }));
  const debtors = Object.entries(balances).filter(([, v]) => v < 0).sort((a, b) => a[1] - b[1]).map(([k, v]) => ({ name: k, amount: -v }));
  const transfers: { from: string; to: string; amount: number }[] = [];
  let ci = 0, di = 0;
  while (ci < creditors.length && di < debtors.length) {
    const pay = Math.min(creditors[ci].amount, debtors[di].amount);
    if (pay > 0) transfers.push({ from: debtors[di].name, to: creditors[ci].name, amount: pay });
    creditors[ci].amount -= pay;
    debtors[di].amount -= pay;
    if (creditors[ci].amount === 0) ci++;
    if (debtors[di].amount === 0) di++;
  }
  return transfers;
}

function ReceiptItem({
  name,
  amount,
  paidBy,
  participants,
  paidByLabel,
}: {
  name: string;
  amount: number;
  paidBy: string;
  participants: string[];
  paidByLabel: string;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20, height: 0 }}
      animate={{ opacity: 1, x: 0, height: "auto" }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-[#F6391A] hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-karla font-semibold text-[#001E13]">{name}</h4>
          <p className="text-sm text-[#001E13]/50">{paidByLabel} {paidBy}</p>
        </div>
        <span className="font-unbounded font-bold text-[#F6391A]">{amount}€</span>
      </div>
      <div className="flex gap-1">
        {participants.map((p, i) => (
          <span key={i} className="text-lg">{p}</span>
        ))}
      </div>
    </motion.div>
  );
}

function BalanceCard({
  name,
  avatar,
  balance,
  toReceive,
  owes,
}: {
  name: string;
  avatar: string;
  balance: number;
  toReceive: string;
  owes: string;
}) {
  const isPositive = balance > 0;
  const isZero = balance === 0;
  return (
    <motion.div
      layout
      className="bg-white rounded-xl p-4 shadow-sm text-center hover:shadow-md transition-shadow"
    >
      <span className="text-3xl mb-2 block">{avatar}</span>
      <p className="font-karla font-semibold text-[#001E13] mb-1">{name}</p>
      <motion.p
        key={balance}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className={`font-unbounded font-bold text-lg ${isZero ? 'text-[#001E13]/40' : isPositive ? 'text-green-600' : 'text-[#F6391A]'}`}
      >
        {isZero ? '0€' : `${isPositive ? '+' : '-'}${Math.abs(balance)}€`}
      </motion.p>
      <p className="text-xs text-[#001E13]/40 mt-1">
        {isZero ? '—' : isPositive ? toReceive : owes}
      </p>
    </motion.div>
  );
}

// Interactive split-cost demo. Click a preset to add an expense, watch balances recompute.
function LiveSplit({
  participants,
  initialExpenses,
  presets,
  labels,
}: {
  participants: Participant[];
  initialExpenses: Expense[];
  presets: ExpensePreset[];
  labels: Copy;
}) {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);

  const handleAdd = (preset: ExpensePreset) => {
    setExpenses((prev) => {
      // Rotate the payer based on the current expense count so synchronous
      // bursts (and React batching) don't assign every added expense to the
      // same person.
      const payer = participants[prev.length % participants.length];
      return [...prev, { name: preset.name, amount: preset.amount, paidBy: payer.name }];
    });
  };

  const balances = computeBalances(expenses, participants);
  const settlements = computeSettlements(balances);
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const avatarOf = (name: string) => participants.find((p) => p.name === name)?.avatar ?? "👤";

  return (
    <div className="bg-white/60 backdrop-blur rounded-3xl p-6 lg:p-8 shadow-sm border border-[#61DBD5]/30">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2 mb-2">
        <div>
          <h3 className="font-londrina-solid text-2xl text-[#001E13]">{labels.liveSplitTitle}</h3>
          <p className="text-sm text-[#001E13]/60 font-karla">{labels.liveSplitSubtitle}</p>
        </div>
        <div className="text-left lg:text-right">
          <p className="text-xs text-[#001E13]/40 font-karla uppercase tracking-wide">{labels.total}</p>
          <motion.p
            key={total}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            className="font-unbounded font-bold text-2xl text-[#F6391A]"
          >
            {total}€
          </motion.p>
        </div>
      </div>

      <p className="text-xs text-[#001E13]/50 font-karla mb-5">{labels.tryItHint}</p>

      {/* Quick-add buttons */}
      <div className="mb-6">
        <p className="text-xs text-[#001E13]/40 font-karla uppercase tracking-wide mb-2">{labels.quickAdd}</p>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, i) => (
            <button
              key={i}
              onClick={() => handleAdd(preset)}
              className="flex items-center gap-2 px-4 py-2 bg-[#F6391A] hover:bg-[#F6391A]/90 text-white rounded-full font-karla font-semibold text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <span className="text-lg">{preset.emoji}</span>
              <span>+ {preset.name}</span>
              <span className="font-unbounded text-xs opacity-80">{preset.amount}€</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Expenses list */}
        <div>
          <h4 className="font-londrina-solid text-xl text-[#001E13] mb-4">{labels.recentExpenses}</h4>
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {[...expenses].reverse().map((expense, i) => (
                <ReceiptItem
                  key={`${expense.name}-${expenses.length - i}`}
                  name={expense.name}
                  amount={expense.amount}
                  paidBy={expense.paidBy}
                  participants={participants.map((p) => p.avatar)}
                  paidByLabel={labels.paidBy}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Balances + settle up */}
        <div>
          <h4 className="font-londrina-solid text-xl text-[#001E13] mb-4">{labels.whoOwesWhat}</h4>
          <div className="grid grid-cols-2 gap-3">
            {participants.map((p) => (
              <BalanceCard
                key={p.name}
                name={p.name}
                avatar={p.avatar}
                balance={balances[p.name] ?? 0}
                toReceive={labels.toReceive}
                owes={labels.owes}
              />
            ))}
          </div>

          {settlements.length > 0 && (
            <motion.div
              layout
              className="mt-4 p-4 bg-[#61DBD5]/10 rounded-xl border border-[#61DBD5]/30"
            >
              <p className="text-sm font-karla text-[#001E13]/70 mb-2">💡 {labels.toSettleUp}</p>
              <div className="space-y-1">
                {settlements.map((s, i) => (
                  <p key={i} className="font-karla text-[#001E13]">
                    <span>{avatarOf(s.from)} {s.from}</span>
                    <span className="mx-2 text-[#001E13]/40">→</span>
                    <span>{avatarOf(s.to)} {s.to}</span>
                    <span className="ml-2 font-bold">{s.amount}€</span>
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BudgetFeature() {
  const locale = useLocale();
  const tr = useTranslations("budgetFeature");
  const t = tr.raw("copy") as Copy;

  const stats = tr.raw("page.stats") as Stat[];
  const features = tr.raw("page.features") as FeatureItem[];
  const faqItems = tr.raw("page.faqItems") as FaqItem[];

  return (
    <>
      <FeatureJsonLd
        featureName={tr("page.seoTitle")}
        featureDescription={tr("page.seoDescription")}
        locale={locale}
        slug={FEATURE.slug}
        faqItems={faqItems}
      />

      <div className="min-h-screen bg-[#FFFBF5]">
        {/* Hero */}
        <section className="relative px-4 lg:px-8 pt-[128px] lg:pt-[180px] pb-16 bg-gradient-to-b from-[#001E13] to-[#001E13]/95">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1 bg-[#EEF899]/20 rounded-full mb-4"
                >
                  <span className="text-lg">{FEATURE.icon}</span>
                  <span className="text-[#EEF899] font-karla text-sm">{tr("page.heroBadge")}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl lg:text-6xl font-londrina-solid text-[#FFFBF5] mb-6"
                >
                  {tr("page.heroTitle")}
                  <br />
                  <span className="text-[#EEF899]">{tr("page.heroTitleHighlight")}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-[#FFFBF5]/70 font-karla mb-8 max-w-md"
                >
                  {tr("page.heroSubtitle")}
                </motion.p>

                {stats && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8"
                  >
                    {stats.map((stat, i) => (
                      <div key={i} className="text-center lg:text-left">
                        <p className="font-unbounded font-bold text-2xl text-[#FFFBF5]">{stat.value}</p>
                        <p className="text-sm text-[#FFFBF5]/50 font-karla">{stat.label}</p>
                      </div>
                    ))}
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`} className="inline-block">
                    <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                      {tr("page.heroCta")}
                    </PulsatingButton>
                  </Link>
                </motion.div>
              </div>

              {/* Pie chart visualization */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="relative mx-auto w-64 h-64">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#61DBD5" strokeWidth="20" strokeDasharray="75 251" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F6391A" strokeWidth="20" strokeDasharray="60 251" strokeDashoffset="-75" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#EEF899" strokeWidth="20" strokeDasharray="50 251" strokeDashoffset="-135" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#001E13" strokeWidth="20" strokeDasharray="66 251" strokeDashoffset="-185" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="font-unbounded font-bold text-3xl text-[#FFFBF5]">2 450€</p>
                      <p className="text-sm text-[#FFFBF5]/50 font-karla">{t.total}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                  {[
                    { color: '#61DBD5', label: t.pieLabels.accommodation, pct: '30%' },
                    { color: '#F6391A', label: t.pieLabels.restaurants, pct: '24%' },
                    { color: '#EEF899', label: t.pieLabels.activities, pct: '20%' },
                    { color: '#001E13', label: t.pieLabels.transport, pct: '26%' },
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

        {/* Interactive split-cost demo (replaces former static section) */}
        <section className="px-4 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <LiveSplit
              participants={t.participants}
              initialExpenses={t.expenses}
              presets={t.presets}
              labels={t}
            />
          </div>
        </section>

        {/* Features */}
        <section className="px-4 lg:px-8 py-16 bg-[#001E13]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {features.map((f, i) => (
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
                  <p className="text-sm text-[#FFFBF5]/60 font-karla">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FeatureFAQ items={faqItems} accentColor={FEATURE.accentColor} />

        {/* CTA */}
        <section className="px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#EEF899] to-[#61DBD5] rounded-[32px] p-8 lg:p-12"
            >
              <span className="text-5xl mb-4 block">{FEATURE.icon}</span>
              <h2 className="text-3xl font-londrina-solid text-[#001E13] mb-4">{tr("page.ctaTitle")}</h2>
              <p className="text-[#001E13]/70 font-karla mb-8 max-w-md mx-auto">{tr("page.ctaSubtitle")}</p>
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`} className="inline-block">
                <button className="bg-[#001E13] text-white font-karla font-bold text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg">
                  {tr("page.ctaButton")}
                </button>
              </Link>
              <p className="text-sm text-[#001E13]/50 mt-3 font-karla">{t.freeNoCard}</p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
