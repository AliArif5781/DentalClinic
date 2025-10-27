import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import LandingNav from "../LandingNav";

export default function LandingNavExample() {
  return (
    <QueryClientProvider client={queryClient}>
      <LandingNav />
    </QueryClientProvider>
  );
}
