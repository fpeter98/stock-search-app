import { NextRequest, NextResponse } from "next/server";
import { DetailItemModel } from "@/app/models/DetailItem.model";
import {
    ALPHAVANTAGE_SYMBOL_SEARCH_ENDPOINT,
    NAME_KEY,
    QUERY_PARAM,
    SYMBOL_KEY,
} from "@/app/models/api.constants";
const fetchStockDetails = async (
    query: string
): Promise<DetailItemModel | undefined> => {
    const response = await fetch(`${ALPHAVANTAGE_SYMBOL_SEARCH_ENDPOINT}&keywords=${query}&apikey=${process.env.APIKEY}`);
    const data = await response.json();
    if ("bestMatches" in data) {
        return data.bestMatches.find(
            (match: Record<string, string>) =>
                match[SYMBOL_KEY] === query || match[NAME_KEY] === query
        );
    }
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
