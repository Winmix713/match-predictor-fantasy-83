// src/components/Patterns/PatternDetailsContent.tsx (or your chosen path)
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { PatternDefinition, PatternCondition } from '../../types/match'; // Assuming types are in ../../types
import { ArrowRight, Check, X } from 'lucide-react';

interface PatternDetailsContentProps {
  /** The pattern definition object. */
  pattern: PatternDefinition;
}

/**
 * Renders the core details of a pattern definition, focusing on its conditions.
 * Does NOT show analysis results directly; results are handled elsewhere.
 */
const PatternDetailsContent: React.FC<PatternDetailsContentProps> = ({ pattern }) => {

  const renderConditionValue = (value: string | number) => {
      // Check if value references another field (simple heuristic)
      if (typeof value === 'string' && (value.startsWith('ft') || value.startsWith('ht'))) {
          return <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">{value}</Badge>;
      }
      return <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">{value}</Badge>;
  };

  const formatFieldName = (field: string) => {
      // Simple formatter for readability
      return field
          .replace(/([A-Z])/g, ' $1') // Add space before caps
          .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
          .replace(/Ft /g, 'FT ') // Fix acronyms
          .replace(/Ht /g, 'HT ');
  };

  return (
    <div className="space-y-5 text-sm">
      {/* Pattern Type */}
      <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Minta Típusa</h4>
          <Badge variant="outline" className="capitalize text-white border-white/20">{pattern.type || 'Egyedi'}</Badge>
      </div>

       {/* Pattern Status */}
       <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Állapot</h4>
          {pattern.isActive ? (
              <Badge variant="success" className="flex items-center w-fit">
                  <Check className="h-3 w-3 mr-1" /> Aktív
              </Badge>
          ) : (
              <Badge variant="secondary" className="flex items-center w-fit">
                  <X className="h-3 w-3 mr-1" /> Inaktív
              </Badge>
          )}
      </div>

      {/* Conditions */}
      <div>
        <h4 className="text-sm font-medium text-gray-400 mb-2">Minta Feltételei</h4>
        {pattern.conditions && pattern.conditions.length > 0 ? (
          <div className="bg-black/30 rounded-md p-4 border border-white/10 space-y-3">
            {pattern.conditions.map((condition: PatternCondition, idx: number) => (
              <div key={condition.id || idx} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                 {idx > 0 && condition.logicalOperator && (
                    <Badge variant="outline" className="border-amber-500/30 text-amber-400 font-semibold mr-2">
                        {condition.logicalOperator}
                    </Badge>
                 )}
                <Badge variant="outline" className="border-gray-500/30 text-gray-200">{formatFieldName(condition.field)}</Badge>
                <span className="font-mono text-lg text-cyan-400">{condition.operator}</span>
                 {renderConditionValue(condition.value)}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic">Nincsenek feltételek definiálva ehhez a mintához.</p>
        )}
      </div>

       {/* Timestamps */}
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Létrehozva</h4>
                <p className="text-gray-300">
                    {pattern.createdAt ? new Date(pattern.createdAt).toLocaleDateString('hu-HU') : '-'}
                </p>
            </div>
            <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Utoljára módosítva</h4>
                <p className="text-gray-300">
                    {pattern.lastUpdated ? new Date(pattern.lastUpdated).toLocaleDateString('hu-HU') : '-'}
                </p>
            </div>
       </div>
    </div>
  );
};

export default PatternDetailsContent;
