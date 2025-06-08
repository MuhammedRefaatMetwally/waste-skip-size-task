import React from 'react';
import { Check, AlertTriangle, X, Zap, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';

interface Skip {
    id: number;
    size: number;
    hire_period_days: number;
    price_before_vat: number;
    vat: number;
    allowed_on_road: boolean;
    allows_heavy_waste: boolean;
}

interface SkipCardProps {
    skip: Skip;
    isSelected: boolean;
    isDisabled: boolean;
    onSelect: (skip: Skip) => void;
    calculateTotal: (priceBeforeVat: number, vat: number) => number;
    animationDelay: number;
}

const SkipCard: React.FC<SkipCardProps> = ({
                                               skip,
                                               isSelected,
                                               isDisabled,
                                               onSelect,
                                               calculateTotal,
                                               animationDelay
                                           }) => {
    const { isDarkMode } = useTheme();
    const totalPrice = calculateTotal(skip.price_before_vat, skip.vat);

    const getSizeCategory = (size: number) => {
        if (size <= 6) return 'small';
        if (size <= 12) return 'medium';
        return 'large';
    };

    const sizeCategory = getSizeCategory(skip.size);

    return (
        <Card
            className={`group relative overflow-hidden transition-all duration-700 transform hover:scale-105 animate-slide-up cursor-pointer ${
                isDisabled
                    ? 'opacity-60 cursor-not-allowed'
                    : isSelected
                        ? isDarkMode
                            ? 'ring-4 ring-purple-500 shadow-2xl shadow-purple-500/30 bg-linear-to-br from-gray-800 to-purple-900 border-purple-500'
                            : 'ring-4 ring-indigo-500 shadow-2xl shadow-indigo-500/30 bg-linear-to-br from-white to-indigo-50 border-indigo-500'
                        : isDarkMode
                            ? 'bg-gray-800/80 border-gray-700 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20'
                            : 'bg-white border-gray-200 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/20'
            }`}
            style={{ animationDelay: `${animationDelay}ms` }}
            onClick={() => onSelect(skip)}
        >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                isDarkMode
                    ? 'bg-linear-to-br from-purple-900/20 to-blue-900/20'
                    : 'bg-linear-to-br from-indigo-50/50 to-purple-50/50'
            }`}>
                <div className="absolute top-4 right-8 w-2 h-2 bg-current opacity-20 rounded-full animate-ping" />
                <div className="absolute bottom-8 left-6 w-1 h-1 bg-current opacity-30 rounded-full animate-pulse" />
            </div>

            <div className="absolute top-4 right-4 z-10">
                <Badge className={`text-xs font-bold px-3 py-1 ${
                    isSelected
                        ? 'bg-linear-to-r from-green-500 to-emerald-600 text-white animate-pulse'
                        : sizeCategory === 'large'
                            ? 'bg-linear-to-r from-red-500 to-pink-600 text-white'
                            : sizeCategory === 'medium'
                                ? 'bg-linear-to-r from-orange-500 to-yellow-600 text-white'
                                : 'bg-linear-to-r from-blue-500 to-cyan-600 text-white'
                }`}>
                    {skip.size}yd³
                </Badge>
            </div>

            {isSelected && (
                <div className="absolute top-4 left-4 z-10 animate-bounce">
                    <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-full p-2 shadow-lg">
                        <Check className="w-4 h-4" />
                    </div>
                </div>
            )}

            {skip.allows_heavy_waste && skip.allowed_on_road && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        isDarkMode ? 'bg-yellow-500/100 text-white-300' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                        <Zap className="w-3 h-3 mr-1" />
                        Premium
                    </div>
                </div>
            )}

            <CardHeader className="pb-4">
                <div className={`h-40 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden transition-all duration-500 group-hover:scale-105 ${
                    isDarkMode
                        ? sizeCategory === 'large'
                            ? 'bg-linear-to-br from-red-700 via-pink-700 to-purple-800'
                            : sizeCategory === 'medium'
                                ? 'bg-linear-to-br from-purple-700 via-blue-700 to-indigo-700'
                                : 'bg-linear-to-br from-blue-600 via-cyan-600 to-teal-700'
                        : sizeCategory === 'large'
                            ? 'bg-linear-to-br from-red-400 via-pink-400 to-orange-500'
                            : sizeCategory === 'medium'
                                ? 'bg-linear-to-br from-orange-400 via-red-400 to-pink-500'
                                : 'bg-linear-to-br from-blue-400 via-cyan-400 to-teal-500'
                }`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-500" />

                    <div className="relative transform transition-transform duration-500 group-hover:rotate-y-12 group-hover:scale-110">
                        <div className={`${
                            sizeCategory === 'large' ? 'w-32 h-20' : sizeCategory === 'medium' ? 'w-28 h-18' : 'w-24 h-16'
                        } rounded-lg relative shadow-2xl ${
                            isDarkMode ? 'bg-gray-300' : 'bg-yellow-500'
                        }`}>
                            <div className={`absolute inset-0 rounded-lg ${
                                isDarkMode ? 'bg-linear-to-b from-gray-200 to-gray-400' : 'bg-linear-to-b from-yellow-400 to-yellow-600'
                            }`} />

                            <div className={`absolute top-1 -right-1 w-full h-full rounded-lg ${
                                isDarkMode ? 'bg-gray-500' : 'bg-yellow-700'
                            } -z-10`} />

                            {/* Skip Handle */}
                            <div className={`absolute top-2 left-2 right-2 h-1 rounded-full ${
                                isDarkMode ? 'bg-gray-600' : 'bg-yellow-800'
                            }`} />

                            <div className={`absolute top-1 left-1 ${
                                sizeCategory === 'large' ? 'w-6 h-3' : sizeCategory === 'medium' ? 'w-5 h-2.5' : 'w-4 h-2'
                            } bg-white/30 rounded-sm blur-sm`} />

                            {sizeCategory === 'large' && (
                                <div className={`absolute bottom-2 left-2 right-2 h-0.5 rounded-full ${
                                    isDarkMode ? 'bg-gray-600' : 'bg-yellow-800'
                                } opacity-50`} />
                            )}
                        </div>

                        <div className={`absolute inset-0 flex items-center justify-center ${
                            sizeCategory === 'large' ? 'text-sm' : sizeCategory === 'medium' ? 'text-xs' : 'text-xs'
                        } font-bold ${
                            isDarkMode ? 'text-gray-800' : 'text-yellow-900'
                        }`}>
                            {skip.size}YD
                        </div>
                    </div>

                    <div className={`absolute bottom-2 right-2 text-xs font-medium px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-black/30 text-white' : 'bg-white/30 text-white'
                    }`}>
                        {sizeCategory === 'large' ? 'XL' : sizeCategory === 'medium' ? 'M' : 'S'}
                    </div>
                </div>

                <CardTitle className={`text-xl font-bold transition-colors duration-300 ${
                    isDarkMode ? 'text-white group-hover:text-purple-300' : 'text-gray-900 group-hover:text-indigo-600'
                }`}>
                    {skip.size} Yard Skip
                </CardTitle>
                <p className={`text-sm flex items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Shield className="w-3 h-3 mr-1" />
                    {skip.hire_period_days} day hire period
                </p>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="space-y-3 mb-6">
                    <div className={`flex items-center text-sm p-2 rounded-lg transition-all duration-300 ${
                        skip.allowed_on_road
                            ? isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700'
                            : isDarkMode ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-700'
                    }`}>
                        {skip.allowed_on_road ? (
                            <Check className="w-4 h-4 mr-2 animate-pulse" />
                        ) : (
                            <AlertTriangle className="w-4 h-4 mr-2" />
                        )}
                        {skip.allowed_on_road ? 'Road placement ready' : 'Permit required for road'}
                    </div>
                    <div className={`flex items-center text-sm p-2 rounded-lg transition-all duration-300 ${
                        skip.allows_heavy_waste
                            ? isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700'
                            : isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700'
                    }`}>
                        {skip.allows_heavy_waste ? (
                            <Check className="w-4 h-4 mr-2 animate-pulse" />
                        ) : (
                            <X className="w-4 h-4 mr-2" />
                        )}
                        {skip.allows_heavy_waste ? 'Heavy waste welcome' : 'Light waste only'}
                    </div>
                </div>

                <div className="mb-6 relative">
                    <div className={`text-3xl font-bold bg-linear-to-r ${
                        isDarkMode
                            ? 'from-purple-400 to-blue-400'
                            : 'from-indigo-600 to-purple-600'
                    } bg-clip-text text-transparent flex items-center`}>
                        £{totalPrice}
                        {skip.size >= 20 && (
                            <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                                isDarkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-700'
                            }`}>
                Best Value
              </span>
                        )}
                    </div>
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        inc. VAT • £{Math.round(totalPrice / skip.hire_period_days)}/day
                    </div>
                </div>

                <Button
                    className={`w-full h-12 font-semibold transition-all duration-500 transform hover:scale-105 relative overflow-hidden ${
                        isDisabled
                            ? 'bg-gray-400 cursor-not-allowed opacity-50'
                            : isSelected
                                ? 'bg-linear-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white shadow-lg shadow-green-500/30'
                                : isDarkMode
                                    ? 'bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg shadow-purple-500/30'
                                    : 'bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/30'
                    }`}
                    disabled={isDisabled}
                >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                    {isDisabled ? (
                        'Not Available'
                    ) : isSelected ? (
                        <>
                            <Check className="w-5 h-5 mr-2" />
                            Selected
                        </>
                    ) : (
                        'Select This Skip'
                    )}
                </Button>
            </CardContent>
        </Card>
    );
};

export default SkipCard;