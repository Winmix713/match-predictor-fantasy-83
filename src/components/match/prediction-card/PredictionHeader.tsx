
import React from 'react';
import { Badge } from "@/components/ui/badge";

const PredictionHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="bg-blue-500/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-blue-400/20">
        <span className="text-xs font-medium text-blue-300">Élő mérkőzés</span>
      </div>
      <Badge variant="outline" className="text-xs font-medium text-blue-400 bg-blue-500/10 border-blue-400/10">
        21:00
      </Badge>
    </div>
  );
};

export default PredictionHeader;
