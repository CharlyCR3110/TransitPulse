interface LoadingSpinnerProps {
  label?: string;
  fullPage?: boolean;
}

export default function LoadingSpinner({
  label = "Loading…",
  fullPage = false,
}: LoadingSpinnerProps) {
  const wrapper = fullPage
    ? "flex flex-col items-center justify-center min-h-[60vh] gap-3"
    : "flex flex-col items-center justify-center py-12 gap-3";

  return (
    <div className={wrapper} role="status" aria-label={label}>
      <div className="h-10 w-10 rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin" />
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
}
