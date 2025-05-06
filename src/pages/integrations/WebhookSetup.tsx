
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import IntegrationLayout from "@/components/layouts/IntegrationLayout";

const WebhookSetup = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [eventTypes, setEventTypes] = useState<string[]>([]);

  const availableEvents = [
    { id: "match.created", label: "Match Created" },
    { id: "match.updated", label: "Match Updated" },
    { id: "match.deleted", label: "Match Deleted" },
    { id: "player.transfer", label: "Player Transfer" },
    { id: "team.update", label: "Team Updated" },
    { id: "league.status", label: "League Status Change" },
  ];

  const handleEventToggle = (id: string) => {
    setEventTypes((current) => 
      current.includes(id) 
        ? current.filter(item => item !== id) 
        : [...current, id]
    );
  };

  const handleSaveWebhook = () => {
    if (!webhookUrl) {
      toast.error("Webhook URL is required");
      return;
    }

    setIsLoading(true);
    
    // Simulate webhook registration
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Webhook registered successfully", {
        description: `Your webhook endpoint has been set up with ${eventTypes.length} events`
      });
      console.log("Webhook setup:", { webhookUrl, secretKey, eventTypes });
    }, 1500);
  };

  const handleTestWebhook = () => {
    if (!webhookUrl) {
      toast.error("Webhook URL is required");
      return;
    }

    toast.info("Sending test webhook", {
      description: "Preparing test payload..."
    });
    
    // Simulate webhook test
    setTimeout(() => {
      toast.success("Test webhook sent", {
        description: "A test event was dispatched to your webhook URL"
      });
    }, 2000);
  };

  return (
    <IntegrationLayout 
      title="Webhook Integration" 
      description="Set up webhooks to automate workflows and notifications"
      documentationLink="https://docs.example.com/webhook-setup"
    >
      <div className="space-y-6">
        <Alert>
          <AlertDescription>
            Webhooks allow external services to be notified when certain events happen in your V-SPORTS system.
          </AlertDescription>
        </Alert>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input 
              id="webhookUrl" 
              placeholder="https://your-app.com/webhook" 
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              This endpoint will receive POST requests when selected events occur
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secretKey">Secret Key (Optional)</Label>
            <Input 
              id="secretKey" 
              placeholder="Enter a secret key for signature verification" 
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              We'll sign webhook payloads with this key so you can verify they came from us
            </p>
          </div>

          <div className="space-y-2">
            <Label>Event Types</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border rounded-md p-3">
              {availableEvents.map((event) => (
                <div className="flex items-center space-x-2" key={event.id}>
                  <Checkbox 
                    id={event.id} 
                    checked={eventTypes.includes(event.id)}
                    onCheckedChange={() => handleEventToggle(event.id)}
                  />
                  <label 
                    htmlFor={event.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {event.label}
                  </label>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Select which events should trigger webhook notifications
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button onClick={handleSaveWebhook} disabled={isLoading} className="flex-1">
            {isLoading ? "Setting up..." : "Save Webhook"}
          </Button>
          
          <Button variant="outline" onClick={handleTestWebhook} className="flex-1">
            Test Webhook
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">?</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">About Webhooks</h4>
                <p className="text-sm text-gray-500">
                  Webhooks send HTTP POST requests to your specified URL when events happen in your V-SPORTS system.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="link" className="mt-2 h-auto p-0">
              View example payload
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Example Webhook Payload</DialogTitle>
              <DialogDescription>
                This is how the payload will look when sent to your webhook URL
              </DialogDescription>
            </DialogHeader>
            <pre className="bg-black/30 p-4 rounded-md overflow-auto text-xs">
{`{
  "event": "match.created",
  "timestamp": "2025-05-06T14:28:43.511Z",
  "data": {
    "matchId": "m_12345",
    "homeTeam": "Team A",
    "awayTeam": "Team B",
    "date": "2025-05-10T15:00:00Z",
    "league": "Premier League"
  }
}`}
            </pre>
          </DialogContent>
        </Dialog>
      </div>
    </IntegrationLayout>
  );
};

export default WebhookSetup;
