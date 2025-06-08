import axios from 'axios';
import type {Skip} from "@/lib/types.ts";
const BASE_URL = import.meta.env.VITE_BASE_URL ;

export  const fetchSkipsByLocation = async (postcode: string, area: string): Promise<Skip[]> => {
    const response = await axios.get(BASE_URL,
        {
            params: {
                postcode,
                area,
            },
        }
    );
    return response.data;
};