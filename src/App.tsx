import {Toaster, Toaster as Sonner} from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Define the router configuration
const router = createBrowserRouter([
    {
        path: "/",
        element: <Index />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <RouterProvider router={router} />
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;