import { useTheme } from "@/components/skip-selection/ThemeProvider.tsx";
import ThemeToggle from "@/components/skip-selection/ThemeToggle.tsx";
import { AlertCircle } from "lucide-react";
import type {ErrorLoadingProps} from "@/lib/types.ts";



const ErrorLoading: React.FC<ErrorLoadingProps> = ({ error, refetch }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`min-h-screen transition-all duration-700 ${
            isDarkMode
                ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900'
                : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
        }`}>
            <ThemeToggle />
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center max-w-md mx-auto px-4">
                    <AlertCircle className={`w-12 h-12 mx-auto mb-4 ${
                        isDarkMode ? 'text-red-400' : 'text-red-500'
                    }`} />
                    <h2 className={`text-xl font-semibold mb-2 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Unable to load skips
                    </h2>
                    <p className={`mb-4 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                        {error instanceof Error ? error.message : 'Something went wrong while fetching skip data.'}
                    </p>
                    <button
                        onClick={() => refetch()}
                        className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                            isDarkMode
                                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorLoading;