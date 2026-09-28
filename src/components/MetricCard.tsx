import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  trendPositive?: boolean;
  glow?: boolean;
}

export default function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  glow = false
}: MetricCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 border transition-all duration-200 ${
        glow
          ? 'bg-gradient-to-b from-navy-900 to-navy-950 border-accent/40 shadow-lg shadow-accent/15'
          : 'bg-navy-900/70 border-navy-800 hover:border-navy-700'
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
        <div
          className={`p-2.5 rounded-xl ${
            glow ? 'bg-accent/20 text-accent' : 'bg-navy-800 text-gray-300'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline space-x-2">
        <span className="text-3xl font-extrabold text-white tracking-tight">{value}</span>
        {trend && (
          <span
            className={`text-xs font-bold ${
              trendPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {trend}
          </span>
        )}
      </div>

      {subtitle && <p className="mt-1.5 text-xs text-gray-400">{subtitle}</p>}

      {glow && (
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-accent/15 rounded-full blur-xl pointer-events-none" />
      )}
    </div>
  );
}
