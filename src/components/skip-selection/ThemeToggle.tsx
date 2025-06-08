import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="fixed top-6 right-6 z-50">
            <Button
                onClick={toggleTheme}
                variant="outline"
                size="icon"
                className={`h-12 w-12 rounded-full shadow-xl backdrop-blur-md transition-all duration-500 hover:scale-110 active:scale-95 group ${
                    isDarkMode
                        ? 'bg-gray-800/95 hover:bg-gray-700 text-yellow-400 border-gray-600 hover:border-yellow-400/50 shadow-yellow-400/20'
                        : 'bg-white/95 hover:bg-gray-50 text-indigo-600 border-gray-200 hover:border-indigo-300 shadow-indigo-600/20'
                }`}
            >
                {isDarkMode ? (
                    <Sun className="h-6 w-6 transition-all duration-500 group-hover:rotate-180 group-hover:text-yellow-300" />
                ) : (
                    <Moon className="h-6 w-6 transition-all duration-500 group-hover:rotate-12 group-hover:text-indigo-700" />
                )}

                {/* Tooltip */}
                <div className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${
                    isDarkMode
                        ? 'bg-gray-700 text-gray-200 border border-gray-600'
                        : 'bg-gray-900 text-white border border-gray-700'
                }`}>
                    {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 ${
                        isDarkMode ? 'bg-gray-700 border-l border-t border-gray-600' : 'bg-gray-900 border-l border-t border-gray-700'
                    }`} />
                </div>
            </Button>
        </div>
    );
};

export default ThemeToggle;