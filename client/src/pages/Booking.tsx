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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

const appointmentFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().regex(/^\+\d{10,15}$/, "Phone must be in format +1234567890"),
  email: z.string().email("Invalid email address"),
  preferredChannel: z.enum(['sms', 'email', 'both']),
  preferredContactTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']),
  appointmentDate: z.date({
    required_error: "Appointment date is required",
  }),
  appointmentTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in format HH:MM"),
  treatmentType: z.enum(['cleaning', 'root_canal', 'cosmetic', 'exam', 'emergency', 'orthodontics', 'extraction']),
  bookingMethod: z.enum(['phone', 'website', 'walk_in', 'ai_voice']),
});

type AppointmentFormData = z.infer<typeof appointmentFormSchema>;

export default function Booking() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      preferredChannel: "both",
      preferredContactTime: "anytime",
      appointmentTime: "",
      treatmentType: "exam",
      bookingMethod: "website",
    },
  });

  function onSubmit(data: AppointmentFormData) {
    console.log("Appointment Form Data:", {
      patient: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        preferredChannel: data.preferredChannel,
        preferredContactTime: data.preferredContactTime,
      },
      appointment: {
        appointmentDate: data.appointmentDate,
        appointmentTime: data.appointmentTime,
        treatmentType: data.treatmentType,
        bookingMethod: data.bookingMethod,
      }
    });
    
    toast({
      title: "Appointment Submitted",
      description: `Appointment for ${data.firstName} ${data.lastName} on ${format(data.appointmentDate, "PPP")} at ${data.appointmentTime}`,
    });
    form.reset();
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-foreground rounded-md flex items-center justify-center">
                <span className="text-lg text-background">🦷</span>
              </div>
              <span className="text-xl font-bold">Lume Dental</span>
            </div>
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="gap-2"
              data-testid="button-back"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-page-title">
            Book Your Appointment
          </h1>
          <p className="text-lg text-muted-foreground" data-testid="text-page-description">
            Fill out the form below to schedule your dental appointment
          </p>
        </div>

        <div className="bg-card rounded-lg shadow-xl p-8 md:p-12 border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Patient Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} data-testid="input-firstname" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} data-testid="input-lastname" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="preferredChannel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Contact Method *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-preferred-channel">
                              <SelectValue placeholder="Select contact method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredContactTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Contact Time *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-preferred-time">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="morning">Morning</SelectItem>
                            <SelectItem value="afternoon">Afternoon</SelectItem>
                            <SelectItem value="evening">Evening</SelectItem>
                            <SelectItem value="anytime">Anytime</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t">
                <h2 className="text-2xl font-semibold">Appointment Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="appointmentDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Appointment Date *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                                data-testid="button-date-picker"
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="appointmentTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Appointment Time *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} data-testid="input-time" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="treatmentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Treatment Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-treatment-type">
                              <SelectValue placeholder="Select treatment" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="cleaning">Cleaning</SelectItem>
                            <SelectItem value="root_canal">Root Canal</SelectItem>
                            <SelectItem value="cosmetic">Cosmetic</SelectItem>
                            <SelectItem value="exam">Exam</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                            <SelectItem value="orthodontics">Orthodontics</SelectItem>
                            <SelectItem value="extraction">Extraction</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bookingMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>How are you booking? *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-booking-method">
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="phone">Phone</SelectItem>
                            <SelectItem value="website">Website</SelectItem>
                            <SelectItem value="walk_in">Walk-in</SelectItem>
                            <SelectItem value="ai_voice">AI Voice</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="pt-6">
                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full bg-foreground text-background hover:bg-foreground/90" 
                  data-testid="button-submit"
                >
                  Submit Appointment Request
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                By submitting this form, you agree to our privacy policy and consent to be contacted 
                regarding your appointment.
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
