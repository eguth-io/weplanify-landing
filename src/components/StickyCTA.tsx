"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { trackEvent } from "@/lib/tracking";

interface StickyCTAProps {
  text: string;
}

export default function StickyCTA({ text }: StickyCTAProps) {
  const [show, setShow] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [cookieBannerHeight, setCookieBannerHeight] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("beta_request_submitted");
    if (saved) setStatus("success");
  }, []);

  // Auto-dismiss success message after 4 seconds
  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  // Watch cookie banner presence and height
  useEffect(() => {
    const measure = () => {
      const banner = document.querySelector("[class*='z-[9999]']") as HTMLElement | null;
      setCookieBannerHeight(banner ? banner.offsetHeight : 0);
    };
    measure();
    const observer = new MutationObserver(measure);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (hero) {
      const observer = new IntersectionObserver(
        ([entry]) => setShow(!entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(hero);
      return () => observer.disconnect();
    }

    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("submitting");
    try {
      const res = await fetch("https://api.weplanify.com/api/beta/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (res.ok) {
        setStatus("success");
        localStorage.setItem("beta_request_submitted", email.trim());
        trackEvent("beta_request_submit", { status: "success", location: "sticky_cta" });
      } else {
        setStatus("error");
        trackEvent("beta_request_submit", { status: "error", location: "sticky_cta" });
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed left-0 right-0 z-40 p-4 flex justify-center pointer-events-none transition-[bottom] duration-300"
          style={{ bottom: cookieBannerHeight > 0 ? cookieBannerHeight : 0 }}
        >
          <div className="pointer-events-auto w-full max-w-sm lg:max-w-xs">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 text-center space-y-1"
                >
                  <span className="text-lg">🎉</span>
                  <p className="font-karla font-bold text-sm text-[#001E13]">You&apos;re on the list!</p>
                  <p className="font-karla text-xs text-[#001E13]/60">We&apos;ll email you when the beta opens.</p>
                </motion.div>
              ) : formOpen ? (
                <motion.form
                  key="form"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-karla font-bold text-sm text-[#001E13]">{text}</span>
                    <button
                      type="button"
                      onClick={() => setFormOpen(false)}
                      className="text-[#001E13]/40 hover:text-[#001E13]/70 transition-colors text-lg leading-none"
                    >
                      ✕
                    </button>
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-karla focus:ring-2 focus:ring-[#F6391A]/30 focus:border-[#F6391A] outline-none transition-all"
                  />
                  {status === "error" && (
                    <p className="text-red-500 text-xs font-karla">Something went wrong. Please try again.</p>
                  )}
                  <PulsatingButton
                    type="submit"
                    disabled={status === "submitting" || !email.trim()}
                    className="w-full justify-center font-karla font-bold text-sm py-2.5"
                  >
                    {status === "submitting" ? "Sending..." : text}
                  </PulsatingButton>
                </motion.form>
              ) : (
                <motion.div
                  key="button"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                >
                  <PulsatingButton
                    onClick={() => {
                      setFormOpen(true);
                      trackEvent("cta_click", { location: "sticky_cta", label: text });
                    }}
                    className="w-full justify-center font-karla font-bold text-base py-3 shadow-lg rounded-full"
                  >
                    {text}
                  </PulsatingButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
