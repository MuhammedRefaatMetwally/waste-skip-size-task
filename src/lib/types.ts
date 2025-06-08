export interface Skip {
    id: number;
    size: number;
    hire_period_days: number;
    price_before_vat: number;
    vat: number;
    allowed_on_road: boolean;
    allows_heavy_waste: boolean;
}

export interface ProgressStep {
    id: number;
    name: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    completed: boolean;
    current?: boolean;
}

export interface FilterControlsProps {
    showOnlyRoadAllowed: boolean;
    onFilterChange: (checked: boolean) => void;
    totalCount: number;
    filteredCount: number;
}

export interface SkipCardProps {
    skip: Skip;
    isSelected: boolean;
    isDisabled: boolean;
    onSelect: (skip: Skip) => void;
    calculateTotal: (priceBeforeVat: number, vat: number) => number;
    animationDelay: number;
}

export interface SelectionSummaryProps {
    selectedSkip: Skip;
    onClearSelection: () => void;
    onContinue: () => void;
    calculateTotal: (priceBeforeVat: number, vat: number) => number;
}

export interface ProgressNavigationProps {
    steps: ProgressStep[];
}