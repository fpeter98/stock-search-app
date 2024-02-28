"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { DETAIL_VIEW_ROUTE } from "@/app/models/routes.constants";
import { useAutocomplete } from "@/app/hooks/useAutocomplete";
import Image from "next/image";
export const SearchBar = () => {
    const router = useRouter();
    const { query, setQuery, error, autocompleteComponent } = useAutocomplete();
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (query) {
            const encodedQuery = encodeURI(query);
            router.push(`/${DETAIL_VIEW_ROUTE}?query=${encodedQuery}`);
        }
    };

    return (
        <div className="w-1/2 min-w-72 relative">
            <form className="flex" onSubmit={handleSubmit}>
                <input
                    type="search"
                    className="block p-4 pl-10 w-full text-gray-900 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for a stock symbol or name"
                    onChange={(event) => setQuery(event.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="hidden lg:block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Search
                </button>
                <Image
                    src="./search-icon.svg"
                    className="absolute lg:hidden w-6 h-6 text-gray-600 left-2.5 bottom-4 cursor-pointer"
                    alt="search icon"
                    width={15}
                    height={15}
                    onClick={handleSubmit}
                />
            </form>
            {autocompleteComponent}
            {error && (
                <span className="text-red-500">
                    Error while fetching autocomplete results: {error.message}
                </span>
            )}
        </div>
    );
};
