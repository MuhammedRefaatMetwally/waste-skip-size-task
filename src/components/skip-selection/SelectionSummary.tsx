import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

interface Skip {
    id: number;
    size: number;
    price_before_vat: number;
    vat: number;
}

interface SelectionSummaryProps {
    selectedSkip: Skip;
    onClearSelection: () => void;
    onContinue: () => void;
    calculateTotal: (priceBeforeVat: number, vat: number) => number;
}

const SelectionSummary: React.FC<SelectionSummaryProps> = ({
                                                               selectedSkip,
                                                               onClearSelection,
                                                               onContinue,
                                                               calculateTotal
                                                           }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`fixed bottom-0 left-0 right-0 z-30 animate-slide-up backdrop-blur-lg border-t transition-all duration-500 ${
            isDarkMode
                ? 'bg-gray-900/90 border-gray-700'
                : 'bg-white/90 border-gray-200'
        }`}>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 animate-slide-right">
                        <div className={`w-12 h-8 rounded-lg ${
                            isDarkMode
                                ? 'bg-linear-to-r from-purple-600 to-blue-600'
                                : 'bg-linear-to-r from-orange-400 to-red-500'
                        } animate-pulse`} />
                        <div>
                            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {selectedSkip.size} Yard Skip Selected
                            </h3>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                £{calculateTotal(selectedSkip.price_before_vat, selectedSkip.vat)} inc. VAT
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-4 animate-slide-left">
                        <Button
                            variant="outline"
                            onClick={onClearSelection}
                            className={`px-6 py-3 transition-all duration-300 hover:scale-105 ${
                                isDarkMode
                                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            Change Selection
                        </Button>
                        <Button
                            onClick={onContinue}
                            className="px-8 py-3 bg-linear-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/30"
                        >
                            Continue to Permit Check →
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectionSummary;