'use client';

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Autocomplete } from "@/app/components/Autocomplete";
import { AutocompleteItemModel } from "@/app/models/AutocompleteItem.model";
import { DETAIL_VIEW_ROUTE } from "@/app/models/routes.constants";
export const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [autocompleteItems, setAutocompleteItems] = useState<AutocompleteItemModel[] | null>(null);
    const router = useRouter();
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (query) {
            const encodedQuery = encodeURI(query);
            router.push(`/${DETAIL_VIEW_ROUTE}?query=${encodedQuery}`);
        }
    };

    useEffect(() => {
        const fetchAutocomplete = async () => {
            if(query) {
                const response = await fetch(`/api/autocomplete?query=${query}`);
                const data: AutocompleteItemModel[] = await response.json();
                setAutocompleteItems(data);
            } else {
                setAutocompleteItems(null);
            }
        };
        fetchAutocomplete();
    }, [query])

    return (
        <div className="w-1/2 min-w-72 relative">
            <form className="flex" onSubmit={handleSubmit}>
                <input
                    type="search"
                    className="block p-4 pl-10 w-full text-gray-900 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for a stock quote"
                    onChange={(event) => setQuery(event.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="hidden lg:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Search
                </button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute lg:hidden w-6 h-6 text-gray-600 left-2.5 bottom-4 cursor-pointer"
                    onClick={handleSubmit}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                </svg>
            </form>
            {autocompleteItems && <Autocomplete items={autocompleteItems} query={query} />}
        </div>
    );
};
