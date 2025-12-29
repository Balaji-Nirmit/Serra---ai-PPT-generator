import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = () => {
    // search by throttling i.e. when user stops typing then only search operation will be performed
    return (
        <>
            <div className="group relative flex min-w-[60%] items-center overflow-hidden rounded-full border border-slate-200 bg-white/80 shadow-sm transition-all duration-300 focus-within:border-primary-500 focus-within:ring-4 focus-within:ring-primary-500/10 hover:border-slate-300">
                <Button
                    type="submit"
                    variant="ghost"
                    className="absolute left-1 h-10 w-10 rounded-full p-0 text-slate-500 hover:bg-transparent hover:text-primary-600"
                >
                    <Search className="h-5 w-5 transition-transform duration-200 group-focus-within:scale-110" />
                    <span className="sr-only">Search</span>
                </Button>

                <Input
                    type="text"
                    placeholder="Search titles, topics, or keywords..."
                    className="h-12 w-full border-none bg-transparent pl-12 pr-6 text-base placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                />
            </div>
        </>
    )
}
export default SearchBar;