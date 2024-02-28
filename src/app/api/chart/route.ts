import { NextRequest, NextResponse } from "next/server";
import { ALPHAVANTAGE_DAILY_ENDPOINT, QUERY_PARAM } from "@/app/models/common.constants";
import { ChartDataModel } from "@/app/models/ChartData.model";
const fetchMonthlyStockInfo = async (
    query: string
): Promise<ChartDataModel> => {
    const response = await fetch(`${ALPHAVANTAGE_DAILY_ENDPOINT}&symbol=${query}&apikey=${process.env.APIKEY}`);
    const data = await response.json();
    if ("Time Series (Daily)" in data) {
        const lastFiftyKeys = Object.keys(data["Time Series (Daily)"]).slice(0, 50);
        return lastFiftyKeys.reduce((acc, key) => {
            return {
                ...acc,
                [key]: data["Time Series (Daily)"][key]
            };
        }, {} as ChartDataModel);
    }

    return {};
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
    const monthlyStockInfo = await fetchMonthlyStockInfo(query);
    return NextResponse.json(monthlyStockInfo);
};