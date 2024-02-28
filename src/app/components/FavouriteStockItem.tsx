"use client";

import { FC, memo } from "react";
import { useRouter } from "next/navigation";
import { DETAIL_VIEW_ROUTE } from "@/app/models/routes.constants";

interface FavouriteStockItemProps {
    favouriteStock: string;
    position: number;
}

const FavouriteStockItemComponent: FC<FavouriteStockItemProps> = ({ favouriteStock, position }) => {
    const router = useRouter();
    const onFavouriteClickHandler = () => {
        router.push(`/${DETAIL_VIEW_ROUTE}?query=${favouriteStock}`)
    };

    return (
        <div
            className="text-neutral-950 font-bold text-center border-amber-200 border-2 w-1/3 bg-white hover:bg-gray-400 active:bg-gray-600 cursor-pointer"
            onClick={onFavouriteClickHandler}
        >
            {position}. {favouriteStock}
        </div>
    )
}

export const FavouriteStockItem = memo(FavouriteStockItemComponent);