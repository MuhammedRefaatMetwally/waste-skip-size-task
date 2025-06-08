import type { ProgressStep } from "@/lib/types.ts";
import { AlertTriangle, Calendar, CreditCard, MapPin, Package, Truck } from "lucide-react";


export const progressSteps: ProgressStep[] = [
    {
        id: 1,
        name: 'Postcode',
        icon: MapPin,
        completed: true
    },
    {
        id: 2,
        name: 'Waste Type',
        icon: Package,
        completed: true
    },
    {
        id: 3,
        name: 'Select Skip',
        icon: Truck,
        completed: false,
        current: true
    },
    {
        id: 4,
        name: 'Permit Check',
        icon: AlertTriangle,
        completed: false
    },
    {
        id: 5,
        name: 'Choose Date',
        icon: Calendar,
        completed: false
    },
    {
        id: 6,
        name: 'Payment',
        icon: CreditCard,
        completed: false
    },
] as const;

export interface SkipSelectionPageProps {
    postcode?: string;
    area?: string;
}

export const getProgressSteps = (): ProgressStep[] => progressSteps;

