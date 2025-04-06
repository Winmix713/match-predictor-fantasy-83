
import React, { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  Search,
  Calendar,
  Clock,
  Eye,
  Filter,
  Activity,
  BarChart3,
  Star,
  Trophy,
  Shield
} from 'lucide-react';

const Brandbook: React.FC = () => {
  const [activeTab, setActiveTab] = useState("colors");

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-white">Matches Page Brandbook</h1>
      
      <Tabs defaultValue="colors" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="icons">Icons</TabsTrigger>
          <TabsTrigger value="animations">Animations</TabsTrigger>
        </TabsList>
        
        {/* Colors Section */}
        <TabsContent value="colors" className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 text-white">Primary Colors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorCard name="Background" className="bg-gradient-to-br from-gray-900/95 via-gray-900/98 to-black h-24" hexCode="Gradient" />
              <ColorCard name="Accent Blue" className="bg-blue-500 h-24" hexCode="#3b82f6" />
              <ColorCard name="Accent Red" className="bg-red-500 h-24" hexCode="#ef4444" />
              <ColorCard name="Accent Green" className="bg-emerald-500 h-24" hexCode="#10b981" />
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-bold mb-4 text-white">Secondary Colors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ColorCard name="Text Primary" className="bg-white h-24" hexCode="#ffffff" />
              <ColorCard name="Text Secondary" className="bg-gray-400 h-24" hexCode="#9ca3af" />
              <ColorCard name="Border Light" className="bg-white/10 h-24" hexCode="rgba(255,255,255,0.1)" />
              <ColorCard name="Card Background" className="bg-black/20 h-24" hexCode="rgba(0,0,0,0.2)" />
            </div>
          </section>
        </TabsContent>
        
        {/* Typography Section */}
        <TabsContent value="typography" className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 text-white">Font Sizes</h2>
            <div className="space-y-4 bg-black/20 p-6 rounded-xl">
              <div>
                <h3 className="text-xs text-gray-400 mb-2">Headers (text-xl)</h3>
                <p className="text-xl text-white font-bold">Matches Header</p>
              </div>
              <div>
                <h3 className="text-xs text-gray-400 mb-2">Subheaders (text-base)</h3>
                <p className="text-base text-white font-medium">Subheader Text</p>
              </div>
              <div>
                <h3 className="text-xs text-gray-400 mb-2">Body Text (text-sm)</h3>
                <p className="text-sm text-white">Regular body text used throughout the interface</p>
              </div>
              <div>
                <h3 className="text-xs text-gray-400 mb-2">Small Text/Labels (text-xs)</h3>
                <p className="text-xs text-gray-300">Small labels and metadata text</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-bold mb-4 text-white">Font Weights</h2>
            <div className="space-y-4 bg-black/20 p-6 rounded-xl">
              <div>
                <h3 className="text-xs text-gray-400 mb-2">Regular (400)</h3>
                <p className="text-white font-normal">Regular text weight</p>
              </div>
              <div>
                <h3 className="text-xs text-gray-400 mb-2">Medium (500)</h3>
                <p className="text-white font-medium">Medium text weight</p>
              </div>
              <div>
                <h3 className="text-xs text-gray-400 mb-2">Bold (700)</h3>
                <p className="text-white font-bold">Bold text weight</p>
              </div>
            </div>
          </section>
        </TabsContent>
        
        {/* Components Section */}
        <TabsContent value="components" className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 text-white">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-900/95 via-gray-900/98 to-black p-6 rounded-xl border border-white/5 hover:border-white/10 card-hover">
                <h3 className="text-white font-medium mb-2">Match Card</h3>
                <p className="text-sm text-gray-400">Standard match card with subtle hover effects</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900/95 via-gray-900/98 to-black p-6 rounded-xl border border-white/5 hover:border-white/10 relative overflow-hidden card-hover">
                <div className="absolute top-2 right-2">
                  <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
                </div>
                <h3 className="text-white font-medium mb-2">Live Match Card</h3>
                <p className="text-sm text-gray-400">Card with special styling for live matches</p>
                <div className="mt-4 bg-red-500/5 p-2 rounded">
                  <p className="text-xs text-red-300">Live indicator background</p>
                </div>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-bold mb-4 text-white">Buttons</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h3 className="text-xs text-gray-400">Primary Button</h3>
                <Button className="w-full">Primary Button</Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xs text-gray-400">Secondary Button</h3>
                <Button variant="outline" className="w-full bg-black/20 border-white/10">
                  Secondary Button
                </Button>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xs text-gray-400">Icon Button</h3>
                <Button size="icon" className="h-8 w-8 rounded-full bg-white/5 hover:bg-white/10">
                  <Eye className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-bold mb-4 text-white">Badges</h2>
            <div className="flex gap-4 flex-wrap">
              <Badge className="bg-red-500 text-white">LIVE</Badge>
              <Badge className="bg-blue-500 text-white">Upcoming</Badge>
              <Badge className="bg-green-500 text-white">Completed</Badge>
            </div>
          </section>
          
          <section>
            <h2 className="text-xl font-bold mb-4 text-white">Table Styling</h2>
            <div className="bg-black/20 rounded-lg overflow-hidden">
              <div className="bg-black/40 p-3 text-gray-400 font-normal">Table Header</div>
              <div className="p-3 border-b border-white/5 hover:bg-white/5">
                <p className="text-sm text-white">Regular Table Row</p>
              </div>
              <div className="p-3 border-b border-white/5 bg-red-500/5">
                <p className="text-sm text-white">Live Match Row</p>
              </div>
              <div className="p-3 border-b border-white/5 bg-blue-500/5">
                <p className="text-sm text-white">Upcoming Match Row</p>
              </div>
            </div>
          </section>
        </TabsContent>
        
        {/* Icons Section */}
        <TabsContent value="icons" className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 text-white">Icon Usage</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              <IconCard icon={<Calendar className="h-5 w-5" />} name="Calendar" />
              <IconCard icon={<Clock className="h-5 w-5" />} name="Clock" />
              <IconCard icon={<Search className="h-5 w-5" />} name="Search" />
              <IconCard icon={<Filter className="h-5 w-5" />} name="Filter" />
              <IconCard icon={<Eye className="h-5 w-5" />} name="Eye" />
              <IconCard icon={<Activity className="h-5 w-5" />} name="Activity" />
              <IconCard icon={<BarChart3 className="h-5 w-5" />} name="BarChart3" />
              <IconCard icon={<Star className="h-5 w-5" />} name="Star" />
              <IconCard icon={<Trophy className="h-5 w-5" />} name="Trophy" />
              <IconCard icon={<Shield className="h-5 w-5" />} name="Shield" />
              <IconCard icon={<ChevronDown className="h-5 w-5" />} name="ChevronDown" />
            </div>
          </section>
        </TabsContent>
        
        {/* Animations Section */}
        <TabsContent value="animations" className="space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4 text-white">Animation Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/20 p-6 rounded-xl">
                <h3 className="text-white font-medium mb-4">Hover Effects</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="card-hover">Hover Me (Scale)</Button>
                  <div className="bg-black/30 p-4 rounded-lg hover:bg-white/5 transition-colors duration-300">
                    <p className="text-sm text-center text-white">Hover (BG Change)</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/20 p-6 rounded-xl">
                <h3 className="text-white font-medium mb-4">Pulse Animation</h3>
                <div className="flex justify-center">
                  <Badge className="bg-red-500 text-white animate-pulse">LIVE</Badge>
                </div>
              </div>
              
              <div className="bg-black/20 p-6 rounded-xl">
                <h3 className="text-white font-medium mb-4">Transition Effects</h3>
                <Button 
                  className="w-full transition-all duration-500"
                  onClick={(e) => {
                    const btn = e.currentTarget;
                    btn.classList.toggle('bg-emerald-500');
                    setTimeout(() => btn.classList.toggle('bg-emerald-500'), 1000);
                  }}
                >
                  Click For Transition
                </Button>
              </div>
              
              <div className="bg-black/20 p-6 rounded-xl overflow-hidden">
                <h3 className="text-white font-medium mb-4">Shine Effect</h3>
                <div className="relative overflow-hidden rounded-lg bg-blue-500/20 p-8 shine-effect">
                  <p className="text-center text-white">Hover to see shine</p>
                </div>
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper Components
const ColorCard: React.FC<{ name: string; className?: string; hexCode: string }> = ({ name, className, hexCode }) => (
  <div className="rounded-lg overflow-hidden">
    <div className={`${className} rounded-t-lg`}></div>
    <div className="bg-black/40 p-2 rounded-b-lg">
      <p className="text-white text-sm font-medium">{name}</p>
      <p className="text-xs text-gray-400">{hexCode}</p>
    </div>
  </div>
);

const IconCard: React.FC<{ icon: React.ReactNode; name: string }> = ({ icon, name }) => (
  <div className="flex flex-col items-center gap-2 bg-black/20 p-4 rounded-lg">
    <div className="text-blue-400">{icon}</div>
    <p className="text-xs text-gray-300">{name}</p>
  </div>
);

export default Brandbook;
