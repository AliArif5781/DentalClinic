import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Lock, Mail } from "lucide-react";
import { saveDoctorLogin } from "@/lib/firebase";
import AuthNav from "@/components/AuthNav";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);

    console.log("Doctor login credentials:", {
      email: data.email,
      password: data.password,
    });

    const result = await saveDoctorLogin({
      email: data.email,
      password: data.password,
    });

    if (result.success) {
      toast({
        title: "Login Successful",
        description: "Welcome back, Doctor!",
      });
      setLocation("/");
    } else {
      toast({
        title: "Login Failed",
        description:
          result.error || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <AuthNav />
      <div className="flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-primary">🦷</span>
            </div>
            <h1
              className="text-3xl font-bold text-foreground"
              data-testid="text-login-title"
            >
              Dental Clinic Login
            </h1>
            <p
              className="text-muted-foreground"
              data-testid="text-login-description"
            >
              Sign in to access the dental clinic dashboard
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          {...field}
                          data-testid="input-email"
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          className="pl-10"
                          {...field}
                          data-testid="input-password"
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                data-testid="button-login"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm">
            <p
              data-testid="text-register-info"
              className="text-muted-foreground"
            >
              Don't have an account?{" "}
              <button
                onClick={() => setLocation("/signup")}
                className="text-primary font-semibold hover:underline transition-all"
                data-testid="link-signup"
                disabled={isLoading}
              >
                Sign Up
              </button>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
