import { NextRequest, NextResponse } from "next/server";
import { DetailItemModel } from "@/app/models/DetailItem.model";
import {
    ALPHAVANTAGE_QUOTE_ENDPOINT,
    ALPHAVANTAGE_SYMBOL_SEARCH_ENDPOINT,
    NAME_KEY,
    QUERY_PARAM,
    SYMBOL_KEY,
} from "@/app/models/common.constants";
const fetchStockDetails = async (
    query: string
): Promise<DetailItemModel | undefined> => {
    // check if there is matching result for the provided symbol or name in query
    const response = await fetch(`${ALPHAVANTAGE_SYMBOL_SEARCH_ENDPOINT}&keywords=${query}&apikey=${process.env.APIKEY}`);
    const data = await response.json();
    let foundSymbol = '';
    if ("bestMatches" in data) {
        const matchingResult = data.bestMatches.find(
            (match: Record<string, string>) =>
                match[SYMBOL_KEY] === query || match[NAME_KEY] === query
        );
        if(matchingResult) {
            foundSymbol = matchingResult[SYMBOL_KEY];
        }
    }
    if(!foundSymbol) {
        return undefined;
    }

    //get stock quote details based on the found symbol
    const detailResponse = await fetch(`${ALPHAVANTAGE_QUOTE_ENDPOINT}&symbol=${foundSymbol}&apikey=${process.env.APIKEY}`);
    const detailData = await detailResponse.json();
    return detailData?.["Global Quote"];
};
export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get(QUERY_PARAM);
    if (!query) {
        return NextResponse.json(
            { error: "Query parameter is missing!" },
            { status: 500 }
        );
    }
    const stockDetails = await fetchStockDetails(query) || {};
    return NextResponse.json(stockDetails);
};
