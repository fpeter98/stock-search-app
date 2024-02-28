import {
    Dispatch,
    ReactElement,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { AutocompleteItemModel } from "@/app/models/AutocompleteItem.model";
import { Autocomplete } from "@/app/components/Autocomplete";

interface UseAutocompleteResult {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    error: Error | null;
    autocompleteComponent: ReactElement;
}

type UseAutocomplete = () => UseAutocompleteResult;
export const useAutocomplete: UseAutocomplete = () => {
    const [query, setQuery] = useState("");
    const [error, setError] = useState<Error | null>(null);
    const [cachedAutocompleteItems, setCachedAutocompleteItems] =
        useState<Record<string, AutocompleteItemModel[]> | null>(null);
    const [autocompleteItems, setAutocompleteItems] =
        useState<AutocompleteItemModel[] | null>(null);

    useEffect(() => {
        const fetchAutocomplete = async () => {
            if (query) {
                if (cachedAutocompleteItems && query in cachedAutocompleteItems) {
                    setAutocompleteItems(cachedAutocompleteItems[query]);
                    return;
                }
                try {
                    const response = await fetch(`/api/autocomplete?query=${query}`);
                    const data: AutocompleteItemModel[] = await response.json();
                    setAutocompleteItems(data);
                    setCachedAutocompleteItems({
                        ...cachedAutocompleteItems,
                        [query]: data,
                    });
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        setError(error);
                    }
                }
            } else {
                setAutocompleteItems(null);
            }
        };
        fetchAutocomplete();
    }, [cachedAutocompleteItems, query]);

    return {
        query,
        setQuery,
        error,
        autocompleteComponent: autocompleteItems?.length ? (
            <Autocomplete items={autocompleteItems} query={query} />
        ) : (
            <></>
        ),
    };
};
