import { Monitor, Gamepad2 } from "lucide-react";

interface PlatformBadgeProps {
  platform: string;
}

export function PlatformBadge({ platform }: PlatformBadgeProps) {
  const icon = platform.includes("pc") ? (
    <Monitor size={14} />
  ) : (
    <Gamepad2 size={14} />
  );

  return (
    <span className="flex items-center gap-1 text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-300 backdrop-blur">
      {icon}
      {platform}
    </span>
  );
}
