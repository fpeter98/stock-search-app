"use client";
import { useSearchParams } from "next/navigation";
import { DetailItem } from "@/app/components/DetailItem";
import { DetailItemModel } from "@/app/models/DetailItem.model";
import { useMemo } from "react";
import { QUERY_PARAM } from "@/app/models/common.constants";
import { ViewFavouriteStocksButton } from "@/app/components/ViewFavouriteStocksButton";
import { useDetails } from "@/app/hooks/useDetails";
import { MarkAsFavouriteButton } from "@/app/components/MarkAsFavouriteButton";
import { StockPriceChart } from "@/app/components/StockPriceChart";

const DetailView = () => {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get(QUERY_PARAM);
    const encodedQueryParam = encodeURI(queryParam || "");

    const { details, error } = useDetails(encodedQueryParam);
    const emptyResults = Boolean(details && !Object.keys(details).length);
    const haveDetails = Boolean(details && Object.keys(details).length);

    const detailItems = useMemo(() => {
        if (details) {
            return Object.keys(details).map((key) => (
                <DetailItem
                    key={key}
                    detailKey={key}
                    detailValue={details[key as keyof DetailItemModel]}
                />
            ));
        }
    }, [details]);

    return (
        <div className="w-full h-full">
            <h1 className="text-center text-4xl text-white m-auto py-8">
                Stock details
            </h1>
            <div className="flex items-center justify-center flex-col gap-6 w-fit mb-6 mx-auto">
                {haveDetails && details && <MarkAsFavouriteButton details={details} />}
                <ViewFavouriteStocksButton />
            </div>
            <div className=" flex flex-wrap justify-center items-center flex-row gap-6 mb-12">
                {haveDetails && detailItems}
                {emptyResults && (
                    <span className="text-white text-2xl">
                        No details found for the query
                    </span>
                )}
                {error && (
                    <span className="text-red-500">
                        Error while loading details: {error.message}
                    </span>
                )}
            </div>
            {haveDetails && details && <StockPriceChart symbolValue={details["01. symbol"]}/>}
        </div>
    );
};

export default DetailView;
