
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import IntegrationLayout from "@/components/layouts/IntegrationLayout";
import { useForm } from "react-hook-form";

const AnalyticsIntegration = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  
  const form = useForm({
    defaultValues: {
      provider: "google",
      apiKey: "",
      propertyId: ""
    }
  });

  const onSubmit = (data: any) => {
    setIsConnecting(true);
    
    // Simulate connection attempt
    setTimeout(() => {
      setIsConnecting(false);
      toast.success("Analytics connection successful", {
        description: `Connected to ${data.provider} Analytics with Property ID: ${data.propertyId}`
      });
      console.log("Analytics connection data:", data);
    }, 1500);
  };

  return (
    <IntegrationLayout 
      title="Analytics Integration" 
      description="Connect to analytics platforms for advanced data insights"
      documentationLink="https://docs.example.com/analytics"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Analytics Provider</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="google" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Google Analytics
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="matomo" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Matomo Analytics
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="custom" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Custom Analytics
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormDescription>
                  Select your analytics provider
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input 
                id="apiKey" 
                placeholder="Enter your analytics API key"
                {...form.register("apiKey")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyId">Property ID</Label>
              <Input 
                id="propertyId" 
                placeholder="Enter your property/tracking ID"
                {...form.register("propertyId")}
              />
              <p className="text-sm text-gray-500">
                Your property ID can be found in your analytics account settings
              </p>
            </div>
          </div>

          <Button type="submit" disabled={isConnecting}>
            {isConnecting ? "Connecting..." : "Connect Analytics"}
          </Button>
        </form>
      </Form>
    </IntegrationLayout>
  );
};

export default AnalyticsIntegration;
