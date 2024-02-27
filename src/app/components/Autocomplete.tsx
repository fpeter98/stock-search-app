import { FC } from "react";
import { AutocompleteItem } from "@/app/components/AutocompleteItem";
import { AutocompleteItemModel } from "@/app/models/AutocompleteItem.model";
interface AutocompleteProps {
    items: AutocompleteItemModel[];
    query: string;
}

export const Autocomplete: FC<AutocompleteProps> = ({ items, query }) => {
    return (
        <div className="bg-white p-2 w-full min-w-72 absolute top-14">
            {items.map((autocompleteItem, index) => {
                return (
                    <AutocompleteItem key={index} item={autocompleteItem} query={query} />
                );
            })}
        </div>
    );
};
