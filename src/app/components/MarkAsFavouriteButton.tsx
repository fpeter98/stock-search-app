import Image from "next/image";
import { FAVOURITES_LOCAL_STORAGE_KEY } from "@/app/models/common.constants";
import { DetailItemModel } from "@/app/models/DetailItem.model";
import { FC } from "react";

interface MarkAsFavouriteButtonProps {
    details: DetailItemModel;
}
export const MarkAsFavouriteButton: FC<MarkAsFavouriteButtonProps> = ({ details }) => {
    const handleFavouriteClicked = () => {
        const favouriteSymbol = details["01. symbol"];
        const favouritesStorageItem = localStorage.getItem(FAVOURITES_LOCAL_STORAGE_KEY) || "";
        const favourites = favouritesStorageItem ? JSON.parse(favouritesStorageItem) : [];
        if(favourites.includes(favouriteSymbol)) {
            return;
        }

        const updatedFavourites = [...favourites, favouriteSymbol];
        localStorage.setItem(FAVOURITES_LOCAL_STORAGE_KEY, JSON.stringify(updatedFavourites));
    }

    return (
        <button
            type="button"
            className="flex items-center gap-3 bg-yellow-50 p-4 rounded-full"
            onClick={handleFavouriteClicked}
        >
            Mark as favourite
            <Image src="./star.svg" alt="Star svg" width={30} height={30} />
        </button>
    )
}