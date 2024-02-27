import { NextRequest, NextResponse } from "next/server";
import { AutocompleteItemModel } from "@/app/models/AutocompleteItem.model";
import {
    ALPHAVANTAGE_SYMBOL_SEARCH_ENDPOINT,
    NAME_KEY,
    QUERY_PARAM,
    SYMBOL_KEY,
} from "@/app/models/api.constants";
import { numberOfAutocompleteItems } from "@/app/models/routes.constants";
const fetchAutocompleteSuggestions = async (
    query: string
): Promise<AutocompleteItemModel[]> => {
    const response = await fetch(`${ALPHAVANTAGE_SYMBOL_SEARCH_ENDPOINT}&keywords=${query}&apikey=${process.env.APIKEY}`);
    const data = await response.json();
    if ("bestMatches" in data) {
        return data.bestMatches.map(
            (suggestion: Record<string, string>) =>
                ({
                    [SYMBOL_KEY]: suggestion[SYMBOL_KEY],
                    [NAME_KEY]: suggestion[NAME_KEY],
                } as AutocompleteItemModel)
        ).slice(0, numberOfAutocompleteItems);
    }

    return [];
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
    const autocompleteItems = await fetchAutocompleteSuggestions(query);
    return NextResponse.json(autocompleteItems);
};
