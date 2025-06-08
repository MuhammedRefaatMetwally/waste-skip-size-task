import type {ProgressStep, Skip} from "@/lib/types.ts";
import {useMemo} from "react";
import {AlertTriangle, Calendar, CreditCard, MapPin, Package, Truck} from "lucide-react";

// eslint-disable-next-line react-hooks/rules-of-hooks
export const skipsData = useMemo<Skip[]>(() => [
    {
        id: 17933,
        size: 4,
        hire_period_days: 14,
        price_before_vat: 278,
        vat: 20,
        allowed_on_road: true,
        allows_heavy_waste: true
    },
    {
        id: 17934,
        size: 6,
        hire_period_days: 14,
        price_before_vat: 305,
        vat: 20,
        allowed_on_road: true,
        allows_heavy_waste: true
    },
    {
        id: 17935,
        size: 8,
        hire_period_days: 14,
        price_before_vat: 375,
        vat: 20,
        allowed_on_road: true,
        allows_heavy_waste: true
    },
    {
        id: 17936,
        size: 10,
        hire_period_days: 14,
        price_before_vat: 400,
        vat: 20,
        allowed_on_road: false,
        allows_heavy_waste: false
    },
    {
        id: 17937,
        size: 12,
        hire_period_days: 14,
        price_before_vat: 439,
        vat: 20,
        allowed_on_road: false,
        allows_heavy_waste: false
    },
    {
        id: 17938,
        size: 14,
        hire_period_days: 14,
        price_before_vat: 470,
        vat: 20,
        allowed_on_road: false,
        allows_heavy_waste: false
    },
    {
        id: 17939,
        size: 16,
        hire_period_days: 14,
        price_before_vat: 496,
        vat: 20,
        allowed_on_road: false,
        allows_heavy_waste: false
    },
    {
        id: 15124,
        size: 20,
        hire_period_days: 14,
        price_before_vat: 992,
        vat: 20,
        allowed_on_road: false,
        allows_heavy_waste: true
    },
    {
        id: 15125,
        size: 40,
        hire_period_days: 14,
        price_before_vat: 992,
        vat: 20,
        allowed_on_road: false,
        allows_heavy_waste: false
    }
], []);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const progressSteps = useMemo<ProgressStep[]>(() => [
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
], []);
