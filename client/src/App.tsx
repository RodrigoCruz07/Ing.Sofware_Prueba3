import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";
import UserHome from "@/pages/user-home";
import MyRequests from "@/pages/my-requests";
import AdminDashboard from "@/pages/admin-dashboard";
import CertificateDashboard from "@/pages/certificate-dashboard";
import MinorDocumentation from "@/pages/minor-documentation";
import InventoryForm from "@/pages/inventory-form";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/user-home" component={UserHome} />
      <Route path="/my-requests" component={MyRequests} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
      <Route path="/certificate-dashboard" component={CertificateDashboard} />
      <Route path="/procedures/minor-documentation" component={MinorDocumentation} />
      <Route path="/procedures/inventory-form" component={InventoryForm} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
