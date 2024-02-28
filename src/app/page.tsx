import { SearchBar } from "@/app/components/SearchBar";
import { ViewFavouriteStocksButton } from "@/app/components/ViewFavouriteStocksButton";

const SearchView = () => {
    return (
        <main className="flex gap-10 flex-col justify-center items-center size-full">
            <ViewFavouriteStocksButton />
            <SearchBar />
        </main>
    );
};

export default SearchView;
