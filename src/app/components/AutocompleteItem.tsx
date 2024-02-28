"use client";
import Highlighter from "react-highlight-words";
import { AutocompleteItemModel } from "@/app/models/AutocompleteItem.model";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { DETAIL_VIEW_ROUTE } from "@/app/models/routes.constants";

interface AutocompleteItemProps {
    item: AutocompleteItemModel;
    query: string;
}
export const AutocompleteItem: FC<AutocompleteItemProps> = ({
    item,
    query,
}) => {
    const router = useRouter();
    const onAutocompleteItemClick = () => {
        router.push(`/${DETAIL_VIEW_ROUTE}?query=${item["1. symbol"]}`);
    };

    return (
        <div
            className="flex justify-between bg-white py-2 hover:bg-blue-300 hover:cursor-pointer"
            onClick={onAutocompleteItemClick}
        >
            <Highlighter
                highlightClassName="font-bold bg-transparent"
                searchWords={[query]}
                autoEscape={true}
                textToHighlight={item["1. symbol"]}
            />
            <Highlighter
                highlightClassName="font-bold bg-transparent"
                searchWords={[query]}
                autoEscape={true}
                textToHighlight={item["2. name"]}
            />
        </div>
    );
};
