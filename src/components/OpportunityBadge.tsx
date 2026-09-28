import React from 'react';
import { Flame, AlertCircle, CheckCircle2 } from 'lucide-react';

interface OpportunityBadgeProps {
  score: number;
  level?: string;
  showIcon?: boolean;
}

export default function OpportunityBadge({ score, level, showIcon = true }: OpportunityBadgeProps) {
  if (score >= 71) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-500/20">
        {showIcon && <Flame className="w-3.5 h-3.5 mr-1 text-cyan-400 animate-pulse" />}
        <span>{level || 'Alta oportunidade'}</span>
        <span className="ml-1.5 px-1.5 py-0.2 bg-cyan-400 text-navy-950 font-black rounded text-[10px]">
          {score}
        </span>
      </span>
    );
  }

  if (score >= 41) {
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
        {showIcon && <AlertCircle className="w-3.5 h-3.5 mr-1 text-amber-400" />}
        <span>{level || 'Média oportunidade'}</span>
        <span className="ml-1.5 px-1.5 py-0.2 bg-amber-400 text-navy-950 font-black rounded text-[10px]">
          {score}
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-500/15 text-gray-300 border border-gray-600/30">
      {showIcon && <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-gray-400" />}
      <span>{level || 'Baixa oportunidade'}</span>
      <span className="ml-1.5 px-1.5 py-0.2 bg-gray-600 text-white font-black rounded text-[10px]">
        {score}
      </span>
    </span>
  );
}
