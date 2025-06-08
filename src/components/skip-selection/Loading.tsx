import { useTheme } from "@/components/skip-selection/ThemeProvider.tsx";
import ThemeToggle from "@/components/skip-selection/ThemeToggle.tsx";
import { Loader2 } from "lucide-react";
import type {LoadingProps} from "@/lib/types.ts";



const Loading: React.FC<LoadingProps> = ({ area }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen transition-all duration-700 ${
            isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900'
                : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}>
            <ThemeToggle />
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Loader2 className={`w-12 h-12 animate-spin mx-auto mb-4 ${
                        isDarkMode ? 'text-purple-400' : 'text-indigo-600'
                    }`} />
                    <h2 className={`text-xl font-semibold mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Loading available skips...
                    </h2>
                    <p className={`${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                        Finding the best options for {area}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Loading;