export default function ArabicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="ar" dir="rtl" className="text-right">
      {children}
    </div>
  );
}
