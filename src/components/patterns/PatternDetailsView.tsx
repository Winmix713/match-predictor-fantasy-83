// src/components/Patterns/PatternDetailsView.tsx (or your chosen path)
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { PatternDefinition } from '../../types/match'; // Assuming types are in ../../types
import PatternDetailsContent from './PatternDetailsContent';
import { FileSearch, Play } from 'lucide-react';

interface PatternDetailsViewProps {
  /** The pattern definition object to display. */
  pattern: PatternDefinition;
  /** Flag indicating if the view should adapt for mobile. */
  isMobile: boolean;
  /** Handler to trigger an analysis specifically for this pattern (optional). */
  handleRunAnalysisForPattern?: (patternId: string) => void;
}

/**
 * Provides a view (Dialog or Drawer) to display the details of a pattern definition.
 */
const PatternDetailsView: React.FC<PatternDetailsViewProps> = ({
  pattern,
  isMobile,
  handleRunAnalysisForPattern
}) => {
  const triggerButton = (
    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-white/5">
      <FileSearch className="h-4 w-4 mr-1 sm:mr-0" /> <span className="hidden sm:inline ml-1">Részletek</span>
    </Button>
  );

  const content = <PatternDetailsContent pattern={pattern} />;

  const footerActions = handleRunAnalysisForPattern && (
    <Button
        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        onClick={() => handleRunAnalysisForPattern(pattern.id)}
    >
        <Play className="h-4 w-4" /> Elemzés futtatása erre a mintára
    </Button>
  );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
        <DrawerContent className="bg-gray-950 border-t border-white/10 text-white">
          <DrawerHeader className="text-left">
            <DrawerTitle className="text-xl">{pattern.name}</DrawerTitle>
            <DrawerDescription className="text-gray-400">{pattern.description}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2 max-h-[60vh] overflow-y-auto">
            {content}
          </div>
          <DrawerFooter className="mt-auto pt-4 border-t border-white/10">
            {footerActions}
            <DrawerClose asChild>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">Bezárás</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      {/* Increased width for better content display */}
      <DialogContent className="sm:max-w-3xl bg-gray-950 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">{pattern.name}</DialogTitle>
          <DialogDescription className="text-gray-400">{pattern.description}</DialogDescription>
        </DialogHeader>
        <div className="py-6 max-h-[70vh] overflow-y-auto pr-3">
          {content}
        </div>
        {footerActions && (
             <DialogFooter className="sm:justify-start pt-4 border-t border-white/10">
                 {footerActions}
             </DialogFooter>
         )}
      </DialogContent>
    </Dialog>
  );
};

export default PatternDetailsView;
