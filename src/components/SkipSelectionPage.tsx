import {useState, useMemo, useCallback} from 'react';
import {Sparkles} from 'lucide-react';
import ProgressNavigation from './skip-selection/ProgressNavigation';
import ThemeToggle from './skip-selection/ThemeToggle';
import SkipCard from './skip-selection/SkipCard';
import FilterControls from './skip-selection/FilterControls';
import SelectionSummary from './skip-selection/SelectionSummary';
import {useTheme} from './skip-selection/ThemeProvider';
import {useSkipsByLocation} from '@/hooks/useSkipsByLocation';
import type {Skip} from "@/lib/types.ts";
import {getProgressSteps, type SkipSelectionPageProps} from "@/lib/constants.ts";
import ErrorLoading from "@/components/skip-selection/ErrorLoading.tsx";
import Loading from "@/components/skip-selection/Loading.tsx";
import {toast} from "sonner";


const SkipSelectionPage: React.FC<SkipSelectionPageProps> = ({
                                                                 postcode = 'NR32',
                                                                 area = 'Lowestoft'
                                                             }) => {
    const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
    const [showOnlyRoadAllowed, setShowOnlyRoadAllowed] = useState<boolean>(false);
    const {isDarkMode} = useTheme();

    const {
        data: skipsData,
        isLoading,
        isError,
        error,
        refetch
    } = useSkipsByLocation(postcode, area);

    const calculateTotal = useCallback((priceBeforeVat: number, vat: number): number => {
        return Math.round(priceBeforeVat * (1 + vat / 100));
    }, []);

    const filteredSkips = useMemo<Skip[]>(() => {
        if (!skipsData) return [];

        return showOnlyRoadAllowed
            ? skipsData.filter((skip: Skip) => skip.allowed_on_road)
            : skipsData;
    }, [skipsData, showOnlyRoadAllowed]);

    const isSkipDisabled = useCallback((skip: Skip): boolean => {
        return !skip.allowed_on_road && !skip.allows_heavy_waste;
    }, []);

    const handleSkipSelection = useCallback((skip: Skip): void => {
        if (isSkipDisabled(skip)) return;

        setSelectedSkip((prev: Skip | null) => {
            if (prev?.id === skip.id) {
                return null;
            }
            return skip;
        });
    }, [isSkipDisabled]);

    const handleFilterChange = useCallback((checked: boolean): void => {
        setShowOnlyRoadAllowed(checked);

        if (checked && selectedSkip && !selectedSkip.allowed_on_road) {
            setSelectedSkip(null);
        }
    }, [selectedSkip]);

    const handleContinue = useCallback((): void => {
        if (selectedSkip) {
           toast.warning("Can't continue right now. We will provide that functionality soon.");
        }
    }, [selectedSkip]);

    const handleClearSelection = useCallback((): void => {
        setSelectedSkip(null);
    }, []);


    if (isLoading) {
        return <Loading area={area} />;
    }


    if (isError) {
        return <ErrorLoading error={error} refetch={refetch} />
    }

    return (
        <div className={`min-h-screen transition-all duration-700 ${
            isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900'
                : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}>
            <ThemeToggle/>
            <ProgressNavigation steps={getProgressSteps()}/>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <div className="flex items-center justify-center mb-6">
                        <Sparkles
                            className={`w-8 h-8 mr-3 ${
                                isDarkMode ? 'text-yellow-400' : 'text-indigo-600'
                            } animate-pulse`}
                        />
                        <h1 className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${
                            isDarkMode
                                ? 'from-yellow-400 via-purple-400 to-blue-400'
                                : 'from-indigo-600 via-purple-600 to-blue-600'
                        } bg-clip-text text-transparent`}>
                            Choose Your Skip
                        </h1>
                        <Sparkles
                            className={`w-8 h-8 ml-3 ${
                                isDarkMode ? 'text-yellow-400' : 'text-indigo-600'
                            } animate-pulse`}
                        />
                    </div>
                    <p className={`text-xl max-w-3xl mx-auto ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Select the perfect skip for your project in {area}. All prices include VAT and 14-day hire
                        period.
                    </p>
                </div>

                <FilterControls
                    showOnlyRoadAllowed={showOnlyRoadAllowed}
                    onFilterChange={handleFilterChange}
                    totalCount={skipsData?.length || 0}
                    filteredCount={filteredSkips.length}
                />


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    {filteredSkips.map((skip: Skip, index: number) => (
                        <SkipCard
                            key={skip.id}
                            skip={skip}
                            isSelected={selectedSkip?.id === skip.id}
                            isDisabled={isSkipDisabled(skip)}
                            onSelect={handleSkipSelection}
                            calculateTotal={calculateTotal}
                            animationDelay={index * 100}
                        />
                    ))}
                </div>


                {filteredSkips.length === 0 && skipsData && skipsData.length > 0 && (
                    <div className="text-center py-12">
                        <div className={`text-6xl mb-4 ${
                            isDarkMode ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                            🚛
                        </div>
                        <h3 className={`text-xl font-semibold mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            No skips found
                        </h3>
                        <p className={`${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            Try adjusting your filters to see more options.
                        </p>
                    </div>
                )}


                {(!skipsData || skipsData.length === 0) && !isLoading && (
                    <div className="text-center py-12">
                        <div className={`text-6xl mb-4 ${
                            isDarkMode ? 'text-gray-600' : 'text-gray-300'
                        }`}>
                            📍
                        </div>
                        <h3 className={`text-xl font-semibold mb-2 ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            No skips available
                        </h3>
                        <p className={`${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            No skip hire services found for {area} ({postcode}).
                        </p>
                    </div>
                )}

                {selectedSkip && (
                    <SelectionSummary
                        selectedSkip={selectedSkip}
                        onClearSelection={handleClearSelection}
                        onContinue={handleContinue}
                        calculateTotal={calculateTotal}
                    />
                )}
            </div>
        </div>
    );
};

export default SkipSelectionPage;