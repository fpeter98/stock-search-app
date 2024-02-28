"use client";

import { useEffect, useState } from "react";
import { FAVOURITES_LOCAL_STORAGE_KEY } from "@/app/models/common.constants";

const Favourites = () => {
    const [favoriteStocks, setFavoriteStocks] = useState<string[]>([]);

    useEffect(() => {
        const favouritesStorageItem = localStorage.getItem(
            FAVOURITES_LOCAL_STORAGE_KEY
        );
        if (!favouritesStorageItem) {
            return;
        }

        const favourites: string[] = JSON.parse(favouritesStorageItem);
        setFavoriteStocks(favourites);
    }, []);

    return (
        <div>
            <h1 className="text-5xl text-yellow-400 text-center py-8">
                Favourite stocks
            </h1>
            <div className="flex items-center justify-center flex-col">
                {favoriteStocks.length
                    ? (favoriteStocks.map((favouriteStock, index) => (
                        <div
                            className="text-neutral-950 font-bold text-center border-amber-200 border-2 w-1/3 bg-white"
                            key={favouriteStock}
                        >
                            {index + 1}. {favouriteStock}
                        </div>)))
                    : (
                    <span className="text-white text-2xl">No favourite stocks yet.</span>
                )}
            </div>
        </div>
    );
};
export default Favourites;
