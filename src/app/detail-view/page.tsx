'use client'
import { useSearchParams } from "next/navigation";
import { DetailItem } from "@/app/components/DetailItem";
import { DetailItemModel } from "@/app/models/DetailItem.model";
import { useEffect, useState } from "react";
const DetailView = () => {
    const [details, setDetails] = useState<DetailItemModel | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const searchParams = useSearchParams();
    const queryParam = searchParams.get('query');
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

    const emptyResults = Boolean(details && !Object.keys(details).length);
    const haveDetails = Boolean(details && Object.keys(details).length);

    return (
        <div className="w-full h-full">
            <h1 className="text-center text-4xl text-white m-auto pb-8">Stock details</h1>
            <div className=" flex flex-wrap justify-center items-center flex-row gap-6">
                {haveDetails && details &&(
                     Object.keys(details).map((key) => <DetailItem key={key} detailKey={key} detailValue={details[key as keyof DetailItemModel]} />)
                )}
                {emptyResults && <span className="text-white">No details found for the query</span>}
                {error && <span className="text-red-500">Error while loading details: {error.message}</span>}
            </div>
        </div>
    )
}

export default DetailView;