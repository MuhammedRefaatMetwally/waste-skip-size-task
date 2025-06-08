import { useQuery } from '@tanstack/react-query';
import {fetchSkipsByLocation} from "@/hooks/apiClient.ts";

export const useSkipsByLocation = (postcode: string, area: string) => {
    return useQuery({
        queryKey: ['skips-by-location', postcode, area],
        queryFn: () => fetchSkipsByLocation(postcode, area),
        enabled: !!postcode && !!area,
        staleTime: 5 * 60 * 1000,
    });
};