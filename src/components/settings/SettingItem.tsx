import * as React from "react";

type SettingItemProps = {
  icon: React.ElementType;
  iconColor?: string;
  iconBg?: string;
  label: string;
  sublabel?: string;
  children?: React.ReactNode;
};

export function SettingItem({
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  label,
  sublabel,
  children,
}: SettingItemProps) {
  return (
    <div className="flex items-center justify-between py-4 px-1">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-2xl ${iconBg} flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div>
          <p className="font-medium text-foreground">{label}</p>
          {sublabel && (
            <p className="text-xs text-muted-foreground mt-0.5">{sublabel}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
