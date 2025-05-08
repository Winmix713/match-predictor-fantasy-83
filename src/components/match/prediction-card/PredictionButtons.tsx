
import React from 'react';
import { BarChart, Brain } from 'lucide-react';

interface PredictionButtonsProps {
  showAdvancedStats?: boolean;
  onShowAdvancedStats?: () => void;
}

const PredictionButtons: React.FC<PredictionButtonsProps> = ({ 
  showAdvancedStats = false,
  onShowAdvancedStats 
}) => {
  return (
    <div className="mt-4 flex gap-2">
      <button 
        className="flex-1 py-2 px-4 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-colors"
      >
        <BarChart className="w-4 h-4" />
        <span>Statisztikák</span>
      </button>
      
      <button 
        className={`flex-1 py-2 px-4 ${
          showAdvancedStats ? 'bg-emerald-500/30 text-emerald-300' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800/80'
        } rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-colors`}
        onClick={onShowAdvancedStats}
      >
        <Brain className="w-4 h-4" />
        <span>Advanced analízis</span>
      </button>
    </div>
  );
};

export default PredictionButtons;
