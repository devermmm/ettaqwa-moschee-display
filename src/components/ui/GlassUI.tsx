import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => (
  <div className={`backdrop-blur-xl bg-card/60 dark:bg-card/40 rounded-3xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20 ${className}`}>
    {children}
  </div>
);

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  backLabel?: string;
  rightElement?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack, backLabel = "Zurück", rightElement }) => (
  <div className="sticky top-0 z-50 backdrop-blur-2xl bg-background/70 border-b border-white/10">
    <div className="safe-area-inset-top" />
    <div className="flex items-center justify-between px-5 py-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-primary font-semibold active:opacity-70 transition-opacity"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        <span>{backLabel}</span>
      </button>
      <h1 className="text-lg font-bold text-foreground">{title}</h1>
      <div className="w-16 flex justify-end">
        {rightElement}
      </div>
    </div>
  </div>
);

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className = "" }) => (
  <div className={`min-h-screen bg-gradient-to-b from-background via-background to-muted/30 ${className}`}>
    {children}
  </div>
);

export const SectionTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <p className={`text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-1 ${className}`}>
    {children}
  </p>
);
