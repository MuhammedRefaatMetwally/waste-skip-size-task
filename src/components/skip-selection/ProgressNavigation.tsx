import React from 'react';
import { useTheme } from './ThemeProvider';

interface ProgressStep {
    id: number;
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    completed: boolean;
    current?: boolean;
    description?: string;
}

interface ProgressNavigationProps {
    steps: ProgressStep[];
    onStepClick?: (stepId: number) => void;
    allowStepNavigation?: boolean;
}

const ProgressNavigation: React.FC<ProgressNavigationProps> = ({
                                                                   steps,
                                                                   onStepClick,
                                                                   allowStepNavigation = false
                                                               }) => {
    const { isDarkMode } = useTheme();

    const handleStepClick = (step: ProgressStep) => {
        if (allowStepNavigation && (step.completed || step.current) && onStepClick) {
            onStepClick(step.id);
        }
    };

    const getStepStyles = (step: ProgressStep) => {
        if (step.completed) {
            return {
                circle: 'bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-200',
                text: isDarkMode ? 'text-emerald-200' : 'text-emerald-700',
                connector: 'bg-gradient-to-r from-emerald-500 to-green-600'
            };
        } else if (step.current) {
            return {
                circle: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl shadow-blue-500/30 ring-4 ring-blue-200/50 ring-offset-2 ring-offset-white dark:ring-offset-gray-900',
                text: isDarkMode ? 'text-blue-200' : 'text-blue-700',
                connector: isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            };
        } else {
            return {
                circle: isDarkMode
                    ? 'bg-gray-800 text-gray-500 border-2 border-gray-700 shadow-inner'
                    : 'bg-gray-50 text-gray-400 border-2 border-gray-200 shadow-inner',
                text: isDarkMode ? 'text-gray-500' : 'text-gray-400',
                connector: isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
            };
        }
    };

    return (
        <div className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
            isDarkMode
                ? 'bg-gray-900/90 border-b border-gray-800/50'
                : 'bg-white/90 border-b border-gray-200/50'
        }`}>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Mobile View (< 640px) - Better UX with all steps visible */}
                <div className="block sm:hidden py-3">
                    {/* Current step indicator */}
                    <div className="flex items-center justify-center mb-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                            Step {steps.findIndex(s => s.current) + 1} of {steps.length}
                        </div>
                    </div>

                    {/* Steps navigation */}
                    <div className="flex items-center justify-between gap-1 px-2">
                        {steps.map((step, index) => {
                            const styles = getStepStyles(step);
                            return (
                                <React.Fragment key={step.id}>
                                    <div className="flex flex-col items-center flex-1 min-w-0">
                                        <button
                                            onClick={() => handleStepClick(step)}
                                            disabled={!allowStepNavigation || (!step.completed && !step.current)}
                                            className={`flex items-center justify-center w-10 h-10 rounded-full text-xs font-semibold transition-all duration-300 transform active:scale-95 mb-2 ${
                                                allowStepNavigation && (step.completed || step.current)
                                                    ? 'hover:scale-105 cursor-pointer'
                                                    : 'cursor-default'
                                            } ${styles.circle}`}
                                        >
                                            <step.icon className="w-4 h-4" />
                                        </button>
                                        <span className={`text-xs font-medium text-center leading-tight transition-colors duration-300 ${styles.text}`}>
                                            {step.name.length > 8 ? step.name.substring(0, 8) + '...' : step.name}
                                        </span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`w-4 h-0.5 rounded-full flex-shrink-0 transition-all duration-300 mt-5 ${styles.connector}`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Tablet View (640px - 1024px) - Balanced layout */}
                <div className="hidden sm:block lg:hidden py-6">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const styles = getStepStyles(step);
                            return (
                                <React.Fragment key={step.id}>
                                    <div className="flex flex-col items-center min-w-0 flex-1">
                                        <button
                                            onClick={() => handleStepClick(step)}
                                            disabled={!allowStepNavigation || (!step.completed && !step.current)}
                                            className={`flex items-center justify-center w-12 h-12 rounded-full text-sm font-semibold transition-all duration-500 transform ${
                                                allowStepNavigation && (step.completed || step.current)
                                                    ? 'hover:scale-110 active:scale-95 cursor-pointer'
                                                    : 'cursor-default'
                                            } ${step.current ? 'animate-pulse' : ''} ${styles.circle}`}
                                        >
                                            <step.icon className="w-5 h-5" />
                                        </button>
                                        <div className="mt-3 text-center">
                                            <p className={`text-sm font-medium transition-colors duration-300 ${styles.text}`}>
                                                {step.name}
                                            </p>
                                            {step.description && (
                                                <p className={`text-xs mt-1 transition-colors duration-300 ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    {step.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="flex-1 max-w-24 mx-4 mt-6">
                                            <div className={`h-1 rounded-full transition-all duration-500 ${styles.connector}`} />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* Desktop View (>= 1024px) - Full featured layout */}
                <div className="hidden lg:block py-8">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const styles = getStepStyles(step);
                            return (
                                <React.Fragment key={step.id}>
                                    <div className="flex flex-col items-center min-w-0 group">
                                        <button
                                            onClick={() => handleStepClick(step)}
                                            disabled={!allowStepNavigation || (!step.completed && !step.current)}
                                            className={`relative flex items-center justify-center w-16 h-16 rounded-full text-base font-semibold transition-all duration-500 transform ${
                                                allowStepNavigation && (step.completed || step.current)
                                                    ? 'hover:scale-110 active:scale-95 cursor-pointer'
                                                    : 'cursor-default'
                                            } ${step.current ? 'animate-pulse' : ''} ${styles.circle}`}
                                        >
                                            <step.icon className="w-7 h-7" />

                                            {/* Tooltip on hover */}
                                            {step.description && (
                                                <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 ${
                                                    isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'
                                                }`}>
                                                    {step.description}
                                                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
                                                        isDarkMode ? 'bg-gray-800' : 'bg-gray-900'
                                                    }`} />
                                                </div>
                                            )}
                                        </button>

                                        <div className="mt-4 text-center max-w-32">
                                            <p className={`text-base font-semibold transition-colors duration-300 ${styles.text}`}>
                                                {step.name}
                                            </p>
                                            {step.description && (
                                                <p className={`text-sm mt-2 transition-colors duration-300 leading-tight ${
                                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                    {step.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="flex-1 max-w-32 mx-6 mt-8">
                                            <div className={`h-1.5 rounded-full transition-all duration-500 ${styles.connector}`} />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgressNavigation;