import { FC } from "react";

interface DetailItemProps {
    detailKey: string;
    detailValue: string;
}
export const DetailItem: FC<DetailItemProps> = ({ detailKey, detailValue }) => {
    return (
        <div className="bg-blue-300 border-2 p-8 basis-1/2 lg:basis-1/4 rounded-full min-w-72">
            <span className="font-bold">{detailKey}</span>: <span>{detailValue}</span>
        </div>
    );
};
