import { useEffect, useState } from "react";
import { DetailItemModel } from "@/app/models/DetailItem.model";

interface UseDetailsResult {
    details: DetailItemModel | null;
    error: Error | null;
}

type UseDetails = (encodedQueryParam: string) => UseDetailsResult;
export const useDetails: UseDetails = (encodedQueryParam) => {
    const [details, setDetails] = useState<DetailItemModel | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/search?query=${encodedQueryParam}`);
                const data: DetailItemModel = await response.json();
                setDetails(data);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setError(error);
                }
            }
        };
        fetchData();
    }, [encodedQueryParam]);

    return {
        details,
        error,
    };
};
