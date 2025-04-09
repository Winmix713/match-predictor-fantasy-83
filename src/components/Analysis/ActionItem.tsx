// src/components/Analysis/ActionItem.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface ActionItemProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
}

const ActionItem: React.FC<ActionItemProps> = ({
  icon,
  title,
  description,
  buttonText,
  buttonAction
}) => (
  <div className="bg-gray-800/60 p-4 rounded-lg border border-white/10 shadow-md space-y-3">
    <div className="flex items-center gap-3">
      {icon}
      <h5 className="text-white font-semibold">{title}</h5>
    </div>
    <p className="text-gray-300 text-sm">{description}</p>
    <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={buttonAction}>
      {buttonText}
    </Button>
  </div>
);

export default ActionItem;
