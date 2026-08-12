"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { normalizeText } from "@/lib/normalize-text";

type Props = {
  /** [country name, how many destinations it holds], already sorted. */
  countries: Array<[string, number]>;
  value: string;
  onChange: (value: string) => void;
  labels: { all: string; empty: string };
};

/**
 * Country picker you can type into.
 *
 * A plain `<select>` with sixty-odd countries means scrolling a native dropdown
 * to find one, which is the problem this page is trying to solve rather than
 * repeat. Typing narrows the list; the accent-insensitive match is shared with
 * the search box so "perou" finds "Pérou" in both.
 */
export default function CountryFilter({
  countries,
  value,
  onChange,
  labels,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const wrapper = useRef<HTMLDivElement>(null);
  const listId = "country-filter-list";

  const options = useMemo(() => {
    const needle = normalizeText(query.trim());
    if (!needle) return countries;
    return countries.filter(([name]) => normalizeText(name).includes(needle));
  }, [countries, query]);

  // Close when the click lands anywhere else, the usual dropdown contract.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  function select(name: string) {
    onChange(name);
    setQuery("");
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setHighlight((current) => {
        const next = event.key === "ArrowDown" ? current + 1 : current - 1;
        if (next < 0) return options.length; // wrap onto the "all countries" row
        if (next > options.length) return 0;
        return next;
      });
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (!open) return setOpen(true);
      // Index 0 is the "all countries" reset row, the rest are the options.
      if (highlight === 0) return select("");
      const option = options[highlight - 1];
      if (option) select(option[0]);
      return;
    }
    if (event.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }

  const rows = [
    { name: "", label: labels.all },
    ...options.map(([name, count]) => ({
      name,
      label: `${name} (${count})`,
    })),
  ];

  return (
    <div ref={wrapper} className="relative lg:w-64">
      <input
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-label={labels.all}
        value={open ? query : value}
        placeholder={labels.all}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setHighlight(0);
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
        className="w-full font-karla text-base bg-white border border-[#001E13]/15 rounded-full pl-4 pr-9 py-2.5 text-[#001E13] placeholder:text-[#001E13]/40 focus:outline-none focus:border-[#F6391A]"
      />

      {value && !open ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label={labels.all}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#001E13]/40 hover:text-[#001E13]"
        >
          ✕
        </button>
      ) : (
        <span
          aria-hidden="true"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#001E13]/40 text-xs"
        >
          ▾
        </span>
      )}

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-2 w-full max-h-72 overflow-y-auto bg-white border border-[#001E13]/15 rounded-2xl shadow-lg py-1"
        >
          {rows.length === 1 && (
            <li className="px-4 py-2 font-karla text-sm text-[#001E13]/50">
              {labels.empty}
            </li>
          )}
          {rows.map((row, index) => (
            <li key={row.name || "__all"}>
              <button
                type="button"
                role="option"
                aria-selected={row.name === value}
                onMouseEnter={() => setHighlight(index)}
                onClick={() => select(row.name)}
                className={`w-full text-left px-4 py-2 font-karla text-sm transition-colors ${
                  index === highlight ? "bg-[#EEF899]" : "bg-transparent"
                } ${row.name === value ? "font-bold text-[#001E13]" : "text-[#001E13]/80"}`}
              >
                {row.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
