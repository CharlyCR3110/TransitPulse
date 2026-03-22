import { useT } from "@/lib/i18n-client";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title,
  description,
  onRetry,
}: ErrorStateProps) {
  const t = useT();
  const defaultTitle = t("ui.errorTitle");
  const defaultDescription = t("ui.errorDescription");

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-3">
      <span aria-hidden="true"><svg className="h-12 w-12 text-red-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg></span>
      <h3 className="text-base font-semibold text-red-700 dark:text-red-400">{finalTitle}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">{finalDescription}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold min-h-[44px] min-w-[44px] active:scale-95 transition-transform"
        >
          {t("buttons.tryAgain")}
        </button>
      )}
    </div>
  );
}
