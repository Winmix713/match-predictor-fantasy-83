
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import IntegrationLayout from "@/components/layouts/IntegrationLayout";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const DatabaseConnection = () => {
  const [testingConnection, setTestingConnection] = useState(false);
  
  const form = useForm({
    defaultValues: {
      dbType: "postgresql",
      host: "",
      port: "",
      username: "",
      password: "",
      database: "",
      ssl: "required"
    }
  });

  const onSubmit = (data: any) => {
    setTestingConnection(true);
    
    // Simulate connection test
    setTimeout(() => {
      setTestingConnection(false);
      toast.success("Database connection successful", {
        description: `Connected to ${data.database} on ${data.host}`
      });
      console.log("Database connection data:", data);
    }, 1500);
  };

  return (
    <IntegrationLayout 
      title="Database Connection" 
      description="Link your existing databases for seamless data management"
      documentationLink="https://docs.example.com/database-connection"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="dbType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Database Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select database type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                    <SelectItem value="mssql">SQL Server</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose your database management system
                </FormDescription>
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="host">Host</Label>
                <Input 
                  id="host" 
                  placeholder="e.g., db.example.com" 
                  {...form.register("host")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="port">Port</Label>
                <Input 
                  id="port" 
                  placeholder="e.g., 5432" 
                  {...form.register("port")}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="database">Database Name</Label>
              <Input 
                id="database" 
                placeholder="Enter your database name" 
                {...form.register("database")}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Database username" 
                  {...form.register("username")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Database password" 
                  {...form.register("password")}
                />
              </div>
            </div>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="advanced">
              <AccordionTrigger>Advanced Options</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="ssl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SSL Mode</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select SSL mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="disabled">Disabled</SelectItem>
                            <SelectItem value="preferred">Preferred</SelectItem>
                            <SelectItem value="required">Required</SelectItem>
                            <SelectItem value="verify-ca">Verify CA</SelectItem>
                            <SelectItem value="verify-full">Verify Full</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex space-x-3">
            <Button type="submit" disabled={testingConnection}>
              {testingConnection ? "Testing Connection..." : "Test Connection"}
            </Button>
            <Button variant="outline">Save Configuration</Button>
          </div>
        </form>
      </Form>
    </IntegrationLayout>
  );
};

export default DatabaseConnection;
