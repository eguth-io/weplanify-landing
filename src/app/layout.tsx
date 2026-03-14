// Root layout - minimal wrapper, locale-specific content is in [locale]/layout.tsx
// This file exists to provide a valid React tree structure
// The actual html/body tags are in [locale]/layout.tsx

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
