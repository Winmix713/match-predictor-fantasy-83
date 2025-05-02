
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Upload, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import Header from "@/components/Header";

// Types
import type { LeagueConfiguration } from '../types/league';

const LeagueCreate: React.FC = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<string>("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [leagueData, setLeagueData] = useState({
    name: '',
    country: '',
    season: '2024-2025',
    description: '',
    logo: null as File | null,
    logoPreview: '',
    startDate: '',
    endDate: '',
  });
  
  // Configuration state
  const [leagueConfig, setLeagueConfig] = useState<LeagueConfiguration>({
    pointsForWin: 3,
    pointsForDraw: 1,
    pointsForLoss: 0,
    matchesPerTeam: 2,
    promotionSpots: 0,
    relegationSpots: 0,
    tiebreakers: ['goalDifference', 'goalsFor'],
    competitionFormat: 'league',
    groupCount: 1,
  });
  
  // Teams state
  const [teams, setTeams] = useState<string[]>([]);
  const [newTeam, setNewTeam] = useState('');
  
  // Upload logo handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLeagueData({
          ...leagueData,
          logo: file,
          logoPreview: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Add team handler
  const handleAddTeam = () => {
    if (!newTeam.trim()) return;
    if (teams.includes(newTeam.trim())) {
      toast.error('This team is already in the league');
      return;
    }
    setTeams([...teams, newTeam.trim()]);
    setNewTeam('');
  };
  
  // Remove team handler
  const handleRemoveTeam = (teamToRemove: string) => {
    setTeams(teams.filter(team => team !== teamToRemove));
  };
  
  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLeagueData({ ...leagueData, [name]: value });
  };
  
  // Config change handler
  const handleConfigChange = (field: keyof LeagueConfiguration, value: any) => {
    setLeagueConfig({ ...leagueConfig, [field]: value });
  };
  
  // Submit handler
  const handleSubmit = async () => {
    if (!leagueData.name.trim()) {
      toast.error('League name is required');
      return;
    }
    
    if (!leagueData.season.trim()) {
      toast.error('Season is required');
      return;
    }
    
    if (teams.length < 2) {
      toast.error('You need at least 2 teams');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('League created successfully', {
        description: `${leagueData.name} has been created for the ${leagueData.season} season`,
      });
      
      navigate('/league-management');
    } catch (error) {
      toast.error('Failed to create league');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isBasicInfoComplete = Boolean(
    leagueData.name && leagueData.country && leagueData.season
  );
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-gray-800/60 border-white/10"
            onClick={() => navigate('/league-management')}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to League Management</span>
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-8">Create New League</h1>
        
        <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-gray-800/60">
            <TabsTrigger value="basic" className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400">
              Basic Info
            </TabsTrigger>
            <TabsTrigger 
              value="config" 
              className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400"
              disabled={!isBasicInfoComplete}
            >
              Configuration
            </TabsTrigger>
            <TabsTrigger 
              value="teams" 
              className="data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400"
              disabled={!isBasicInfoComplete}
            >
              Teams
            </TabsTrigger>
          </TabsList>
          
          <div className="bg-gray-800/40 p-8 rounded-lg border border-white/10 mb-8">
            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-6">
                    <Label htmlFor="name" className="text-white mb-2 block">League Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={leagueData.name}
                      onChange={handleInputChange}
                      placeholder="Enter league name"
                      className="bg-gray-900/60 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="country" className="text-white mb-2 block">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={leagueData.country}
                      onChange={handleInputChange}
                      placeholder="Enter country"
                      className="bg-gray-900/60 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <Label htmlFor="season" className="text-white mb-2 block">Season</Label>
                    <Input
                      id="season"
                      name="season"
                      value={leagueData.season}
                      onChange={handleInputChange}
                      placeholder="E.g. 2024-2025"
                      className="bg-gray-900/60 border-white/10 text-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="startDate" className="text-white mb-2 block">Start Date</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={leagueData.startDate}
                        onChange={handleInputChange}
                        className="bg-gray-900/60 border-white/10 text-white"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="endDate" className="text-white mb-2 block">End Date</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={leagueData.endDate}
                        onChange={handleInputChange}
                        className="bg-gray-900/60 border-white/10 text-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-white mb-2 block">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={leagueData.description}
                      onChange={handleInputChange}
                      placeholder="Enter league description"
                      className="bg-gray-900/60 border-white/10 text-white"
                      rows={4}
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-white mb-2 block">League Logo</Label>
                  <div className="border-2 border-dashed border-white/10 rounded-lg p-6 flex flex-col items-center justify-center mb-6" style={{ minHeight: '200px' }}>
                    {leagueData.logoPreview ? (
                      <div className="w-full flex flex-col items-center">
                        <img 
                          src={leagueData.logoPreview} 
                          alt="League logo preview" 
                          className="max-h-40 max-w-full mb-4 object-contain"
                        />
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => setLeagueData({ ...leagueData, logo: null, logoPreview: '' })}
                          className="bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                        >
                          Remove Logo
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-gray-400 mb-4 text-center">Upload league logo</p>
                        <Button 
                          variant="outline" 
                          className="bg-gray-900/60 border-white/10"
                          onClick={() => document.getElementById('logo-upload')?.click()}
                        >
                          Select File
                        </Button>
                        <input 
                          id="logo-upload"
                          type="file" 
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                      </>
                    )}
                  </div>
                  
                  <div className="bg-gray-900/60 rounded-lg p-4 border border-white/10">
                    <h3 className="text-white font-semibold mb-3">Preview</h3>
                    <div className="flex items-center p-3 bg-gray-700/30 rounded-lg">
                      {leagueData.logoPreview ? (
                        <img 
                          src={leagueData.logoPreview} 
                          alt="Logo" 
                          className="w-10 h-10 mr-3 rounded object-contain"
                        />
                      ) : (
                        <div className="w-10 h-10 mr-3 bg-gray-600 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-400">Logo</span>
                        </div>
                      )}
                      <div>
                        <h4 className="text-white font-medium">
                          {leagueData.name || 'League Name'}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {leagueData.season || 'Season'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setActiveStep('config')}
                  disabled={!isBasicInfoComplete}
                >
                  Continue to Configuration
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="config" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Points System</h2>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="pointsForWin" className="text-white mb-2 block">Win</Label>
                      <Input
                        id="pointsForWin"
                        type="number"
                        value={leagueConfig.pointsForWin}
                        onChange={e => handleConfigChange('pointsForWin', Number(e.target.value))}
                        className="bg-gray-900/60 border-white/10 text-white"
                        min={0}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="pointsForDraw" className="text-white mb-2 block">Draw</Label>
                      <Input
                        id="pointsForDraw"
                        type="number"
                        value={leagueConfig.pointsForDraw}
                        onChange={e => handleConfigChange('pointsForDraw', Number(e.target.value))}
                        className="bg-gray-900/60 border-white/10 text-white"
                        min={0}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="pointsForLoss" className="text-white mb-2 block">Loss</Label>
                      <Input
                        id="pointsForLoss"
                        type="number"
                        value={leagueConfig.pointsForLoss}
                        onChange={e => handleConfigChange('pointsForLoss', Number(e.target.value))}
                        className="bg-gray-900/60 border-white/10 text-white"
                        min={0}
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-white mb-4">Competition Format</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="format" className="text-white mb-2 block">Format</Label>
                      <Select
                        value={leagueConfig.competitionFormat}
                        onValueChange={(value) => handleConfigChange('competitionFormat', value)}
                      >
                        <SelectTrigger className="bg-gray-900/60 border-white/10 text-white">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="league">League (Round Robin)</SelectItem>
                          <SelectItem value="cup">Cup (Knockout)</SelectItem>
                          <SelectItem value="group+knockout">Group + Knockout</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {leagueConfig.competitionFormat === 'group+knockout' && (
                      <div>
                        <Label htmlFor="groupCount" className="text-white mb-2 block">Number of Groups</Label>
                        <Input
                          id="groupCount"
                          type="number"
                          value={leagueConfig.groupCount}
                          onChange={e => handleConfigChange('groupCount', Number(e.target.value))}
                          className="bg-gray-900/60 border-white/10 text-white"
                          min={1}
                          max={8}
                        />
                      </div>
                    )}
                    
                    <div>
                      <Label htmlFor="matchesPerTeam" className="text-white mb-2 block">
                        Matches Per Team Against Each Opponent
                      </Label>
                      <Input
                        id="matchesPerTeam"
                        type="number"
                        value={leagueConfig.matchesPerTeam}
                        onChange={e => handleConfigChange('matchesPerTeam', Number(e.target.value))}
                        className="bg-gray-900/60 border-white/10 text-white"
                        min={1}
                        max={4}
                      />
                      <p className="text-sm text-gray-400 mt-1">
                        {leagueConfig.matchesPerTeam === 1 ? "Each team plays once against each opponent" : 
                         leagueConfig.matchesPerTeam === 2 ? "Each team plays home and away against each opponent" : 
                         `Each team plays ${leagueConfig.matchesPerTeam} times against each opponent`}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-white mb-4">League Structure</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="promotionSpots" className="text-white mb-2 block">Promotion Spots</Label>
                      <Input
                        id="promotionSpots"
                        type="number"
                        value={leagueConfig.promotionSpots}
                        onChange={e => handleConfigChange('promotionSpots', Number(e.target.value))}
                        className="bg-gray-900/60 border-white/10 text-white"
                        min={0}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="relegationSpots" className="text-white mb-2 block">Relegation Spots</Label>
                      <Input
                        id="relegationSpots"
                        type="number"
                        value={leagueConfig.relegationSpots}
                        onChange={e => handleConfigChange('relegationSpots', Number(e.target.value))}
                        className="bg-gray-900/60 border-white/10 text-white"
                        min={0}
                      />
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-semibold text-white mb-4">Tiebreakers</h2>
                  
                  <div className="space-y-4 bg-gray-900/40 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tiebreak-gd" className="cursor-pointer flex items-center">
                        <span className="text-white">Goal Difference</span>
                      </Label>
                      <Switch
                        id="tiebreak-gd"
                        checked={leagueConfig.tiebreakers?.includes('goalDifference')}
                        onCheckedChange={(checked) => {
                          const newTiebreakers = checked
                            ? [...(leagueConfig.tiebreakers || []), 'goalDifference']
                            : (leagueConfig.tiebreakers || []).filter(t => t !== 'goalDifference');
                          handleConfigChange('tiebreakers', newTiebreakers);
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tiebreak-gf" className="cursor-pointer flex items-center">
                        <span className="text-white">Goals For</span>
                      </Label>
                      <Switch
                        id="tiebreak-gf"
                        checked={leagueConfig.tiebreakers?.includes('goalsFor')}
                        onCheckedChange={(checked) => {
                          const newTiebreakers = checked
                            ? [...(leagueConfig.tiebreakers || []), 'goalsFor']
                            : (leagueConfig.tiebreakers || []).filter(t => t !== 'goalsFor');
                          handleConfigChange('tiebreakers', newTiebreakers);
                        }}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tiebreak-h2h" className="cursor-pointer flex items-center">
                        <span className="text-white">Head-to-Head</span>
                      </Label>
                      <Switch
                        id="tiebreak-h2h"
                        checked={leagueConfig.tiebreakers?.includes('headToHead')}
                        onCheckedChange={(checked) => {
                          const newTiebreakers = checked
                            ? [...(leagueConfig.tiebreakers || []), 'headToHead']
                            : (leagueConfig.tiebreakers || []).filter(t => t !== 'headToHead');
                          handleConfigChange('tiebreakers', newTiebreakers);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  className="bg-gray-800/60 border-white/10"
                  onClick={() => setActiveStep('basic')}
                >
                  Back to Basic Info
                </Button>
                
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setActiveStep('teams')}
                >
                  Continue to Teams
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="teams" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Add Teams</h2>
                  
                  <div className="flex items-center mb-6">
                    <Input
                      value={newTeam}
                      onChange={(e) => setNewTeam(e.target.value)}
                      placeholder="Enter team name"
                      className="bg-gray-900/60 border-white/10 text-white rounded-r-none"
                    />
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 rounded-l-none"
                      onClick={handleAddTeam}
                      disabled={!newTeam.trim()}
                    >
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add</span>
                    </Button>
                  </div>
                  
                  <div className="overflow-y-auto max-h-[400px] bg-gray-900/40 rounded-lg border border-white/10">
                    {teams.length === 0 ? (
                      <div className="p-6 text-center">
                        <p className="text-gray-400">No teams added yet</p>
                      </div>
                    ) : (
                      <ul>
                        {teams.map((team, index) => (
                          <li 
                            key={index} 
                            className="p-3 flex justify-between items-center border-b border-white/5 last:border-0"
                          >
                            <span className="text-white">{team}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveTeam(team)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">League Summary</h2>
                  
                  <Card className="bg-gray-900/60 border-white/10">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-white">
                        {leagueData.name || 'New League'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">Season</p>
                          <p className="text-white">{leagueData.season}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Country</p>
                          <p className="text-white">{leagueData.country}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Format</p>
                          <p className="text-white capitalize">
                            {leagueConfig.competitionFormat === 'league' ? 'League (Round Robin)' : 
                             leagueConfig.competitionFormat === 'cup' ? 'Cup (Knockout)' : 
                             'Group + Knockout'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Teams</p>
                          <p className="text-white">{teams.length}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Points System</p>
                        <p className="text-white">
                          Win: {leagueConfig.pointsForWin} pts • 
                          Draw: {leagueConfig.pointsForDraw} pts • 
                          Loss: {leagueConfig.pointsForLoss} pts
                        </p>
                      </div>
                      
                      {(leagueConfig.promotionSpots > 0 || leagueConfig.relegationSpots > 0) && (
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Spots</p>
                          <p className="text-white">
                            {leagueConfig.promotionSpots > 0 && (
                              <span>Promotion: {leagueConfig.promotionSpots} • </span>
                            )}
                            {leagueConfig.relegationSpots > 0 && (
                              <span>Relegation: {leagueConfig.relegationSpots}</span>
                            )}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="mt-6">
                    <h3 className="text-white font-semibold mb-2">Ready to Create?</h3>
                    <p className="text-gray-400 mb-4 text-sm">
                      This will create your league with the configuration and teams you've specified.
                      You can edit these details later if needed.
                    </p>
                    
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
                      onClick={handleSubmit}
                      disabled={isSubmitting || teams.length < 2}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                          <span>Creating...</span>
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Create League</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  className="bg-gray-800/60 border-white/10"
                  onClick={() => setActiveStep('config')}
                >
                  Back to Configuration
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default LeagueCreate;
