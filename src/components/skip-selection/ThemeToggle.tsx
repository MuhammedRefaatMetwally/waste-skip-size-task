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
                className={`h-12 w-12 rounded-full shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-110 ${
                    isDarkMode
                        ? 'bg-yellow-500/90 hover:bg-yellow-400 text-yellow-900 border-yellow-400'
                        : 'bg-indigo-600/90 hover:bg-indigo-700 text-white border-indigo-500'
                }`}
            >
                {isDarkMode ? (
                    <Sun className="h-6 w-6 animate-spin" />
                ) : (
                    <Moon className="h-6 w-6 rotate-12" />
                )}
            </Button>
        </div>
    );
};

export default ThemeToggle;