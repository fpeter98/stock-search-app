"use client";

import { useRouter } from "next/navigation";
import { FAVOURITES_ROUTE } from "@/app/models/routes.constants";
import Image from "next/image";

export const ViewFavouriteStocksButton = () => {
    const router = useRouter();
    const handleViewFavouriteClick = () => {
        router.push(`/${FAVOURITES_ROUTE}`);
    };

    return (
        <button
            type="button"
            className="flex items-center gap-3 text-white text-xl bg-blue-400 rounded-full p-3"
            onClick={handleViewFavouriteClick}
        >
            View favourite stocks
            <Image src="./star.svg" alt="Star svg" width={30} height={30} />
        </button>
    );
};
