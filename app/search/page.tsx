import getSongsByTitle from "@/actions/getSongsByTitle"
import Header from "../components/Header";
import SearchInput from "../components/SearchInput";
import SearchContent from "./components/SearchContent";

export const revalidate = 0;

interface SearchProps{
    searchParams:{
        title:string
    }
};

const Search  = async ({searchParams}:SearchProps)=>{
    const songs = await getSongsByTitle(searchParams.title);

    return(
        <div className="bg-neutral-900 h-full rounded-md overflow-hidden overflow-y-auto ml-2">
           <Header className="from-neutral-900">
            <div className="mb-2 flex flex-col gap-y-6">
                <h1 className="text-3xl font-semibold">
                    Search
                </h1>
                <SearchInput/>
            </div>
           </Header>
            <SearchContent songs={songs}/>
        </div>
    )
}

export default Search;