import React from 'react';
import { Filter, Sparkles, BarChart3 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useTheme } from './ThemeProvider';

interface FilterControlsProps {
    showOnlyRoadAllowed: boolean;
    onFilterChange: (checked: boolean) => void;
    totalCount: number;
    filteredCount: number;
}

const FilterControls: React.FC<FilterControlsProps> = ({
                                                           showOnlyRoadAllowed,
                                                           onFilterChange,
                                                           totalCount,
                                                           filteredCount
                                                       }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`mb-8 p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 relative overflow-hidden ${
            isDarkMode
                ? 'bg-gray-800/50 border border-gray-700'
                : 'bg-white/70 border border-white shadow-xl'
        }`}>
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-indigo-500/10 to-cyan-500/10 rounded-full blur-2xl" />

            <div className="relative z-10">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-full ${
                            isDarkMode ? 'bg-purple-900/50' : 'bg-indigo-100'
                        }`}>
                            <Filter className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-indigo-600'} animate-pulse`} />
                        </div>
                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="road-allowed"
                                checked={showOnlyRoadAllowed}
                                onCheckedChange={onFilterChange}
                                className="data-[state=checked]:bg-linear-to-r data-[state=checked]:from-indigo-500 data-[state=checked]:to-purple-600 scale-110"
                            />
                            <label htmlFor="road-allowed" className={`text-sm font-medium cursor-pointer flex items-center ${
                                isDarkMode ? 'text-gray-200' : 'text-gray-700'
                            }`}>
                                <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                                Show only road placement ready
                            </label>
                        </div>
                    </div>

                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                        isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                    }`}>
                        <BarChart3 className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {filteredCount} of {totalCount} options
            </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterControls;