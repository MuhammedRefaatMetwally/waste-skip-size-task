import React from 'react';
import { useTheme } from './ThemeProvider';

interface ProgressStep {
    id: number;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    completed: boolean;
    current?: boolean;
}

interface ProgressNavigationProps {
    steps: ProgressStep[];
}

const ProgressNavigation: React.FC<ProgressNavigationProps> = ({ steps }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`sticky top-0 z-40 backdrop-blur-lg border-b transition-all duration-500 w-full ${
            isDarkMode
                ? 'bg-gray-900/80 border-gray-700'
                : 'bg-white/80 border-gray-200'
        }`}>
            <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-3 sm:py-4 lg:py-6">
                {/* Mobile View - Horizontal Scroll */}
                <div className="block sm:hidden">
                    <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <div className="flex items-center shrink-0">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-all duration-300 ${
                                        step.completed
                                            ? 'bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-md'
                                            : step.current
                                                ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white border-2 border-blue-200 shadow-lg'
                                                : isDarkMode
                                                    ? 'bg-gray-700 text-gray-400 border border-gray-600'
                                                    : 'bg-gray-100 text-gray-400 border border-gray-300'
                                    }`}>
                                        <step.icon className="w-3 h-3" />
                                    </div>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-4 h-0.5 rounded-full shrink-0 ${
                                        step.completed
                                            ? 'bg-linear-to-r from-green-500 to-emerald-600'
                                            : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                                    }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Tablet View */}
                <div className="hidden sm:block md:hidden">
                    <div className="flex items-center justify-between space-x-2">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <div className="flex items-center min-w-0 flex-1">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all duration-300 ${
                                        step.completed
                                            ? 'bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                                            : step.current
                                                ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white border-3 border-blue-200 shadow-xl'
                                                : isDarkMode
                                                    ? 'bg-gray-700 text-gray-400 border-2 border-gray-600'
                                                    : 'bg-gray-100 text-gray-400 border-2 border-gray-300'
                                    }`}>
                                        <step.icon className="w-4 h-4" />
                                    </div>
                                    <span className={`ml-2 text-xs font-medium truncate transition-colors duration-300 ${
                                        step.completed || step.current
                                            ? isDarkMode ? 'text-white' : 'text-gray-900'
                                            : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                    {step.name}
                  </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`flex-1 h-1 mx-2 rounded-full max-w-8 ${
                                        step.completed
                                            ? 'bg-linear-to-r from-green-500 to-emerald-600'
                                            : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                                    }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                    <div className="flex items-center justify-between space-x-4">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <div className="flex items-center min-w-0">
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-full text-sm font-medium transition-all duration-500 transform hover:scale-110 ${
                                        step.completed
                                            ? 'bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30'
                                            : step.current
                                                ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white border-4 border-blue-200 shadow-xl animate-pulse'
                                                : isDarkMode
                                                    ? 'bg-gray-700 text-gray-400 border-2 border-gray-600'
                                                    : 'bg-gray-100 text-gray-400 border-2 border-gray-300'
                                    }`}>
                                        <step.icon className="w-6 h-6" />
                                    </div>
                                    <span className={`ml-3 text-sm font-medium transition-colors duration-300 ${
                                        step.completed || step.current
                                            ? isDarkMode ? 'text-white' : 'text-gray-900'
                                            : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                    {step.name}
                  </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`flex-1 h-1 mx-4 rounded-full min-w-16 ${
                                        step.completed
                                            ? 'bg-linear-to-r from-green-500 to-emerald-600'
                                            : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
                                    }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressNavigation;