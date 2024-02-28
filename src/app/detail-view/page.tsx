'use client'
import { useSearchParams } from "next/navigation";
import { DetailItem } from "@/app/components/DetailItem";
import { DetailItemModel } from "@/app/models/DetailItem.model";
import { useEffect, useMemo, useState } from "react";
import { FAVOURITES_LOCAL_STORAGE_KEY, QUERY_PARAM } from "@/app/models/common.constants";
import Image from "next/image";
import { ViewFavouriteStocksButton } from "@/app/components/ViewFavouriteStocksButton";

const DetailView = () => {
    const [details, setDetails] = useState<DetailItemModel | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const searchParams = useSearchParams();
    const queryParam = searchParams.get(QUERY_PARAM);
    const encodedQueryParam = encodeURI(queryParam || "");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/search?query=${encodedQueryParam}`);
                const data: DetailItemModel = await response.json();
                setDetails(data);
            } catch (error: unknown) {
                if(error instanceof Error) {
                    setError(error);
                }
            }
        };
        fetchData();
    }, [encodedQueryParam])

    const handleFavouriteClicked = () => {
        if(details) {
            const favouriteSymbol = details["01. symbol"];
            const favouritesStorageItem = localStorage.getItem("favourites") || "";

            const favourites = favouritesStorageItem ? JSON.parse(favouritesStorageItem) : [];
            if(favourites.includes(favouriteSymbol)) {
                return;
            }
            const updatedFavourites = [...favourites, favouriteSymbol];
            localStorage.setItem(FAVOURITES_LOCAL_STORAGE_KEY, JSON.stringify(updatedFavourites));
        }
    }

    const emptyResults = Boolean(details && !Object.keys(details).length);
    const haveDetails = Boolean(details && Object.keys(details).length);
    
    const detailItems = useMemo(() => {
        if(details) {
            return Object.keys(details).map((key) => <DetailItem key={key} detailKey={key} detailValue={details[key as keyof DetailItemModel]} />)
        }
    }, [details]);

    return (
        <div className="w-full h-full">
            <h1 className="text-center text-4xl text-white m-auto py-8">Stock details</h1>
            <div className="flex items-center justify-center flex-col gap-6 w-fit mb-6 mx-auto">
                <button type="button" className="flex items-center gap-3 bg-yellow-50 p-4 rounded-full" onClick={handleFavouriteClicked}>
                    Mark as favourite
                    <Image src="./star.svg" alt="Star svg" width={30} height={30} />
                </button>
                <ViewFavouriteStocksButton />
            </div>
            <div className=" flex flex-wrap justify-center items-center flex-row gap-6">
                {haveDetails && detailItems}
                {emptyResults && <span className="text-white">No details found for the query</span>}
                {error && <span className="text-red-500">Error while loading details: {error.message}</span>}
            </div>
        </div>
    )
}

export default DetailView;