import {Input} from "@/components/ui/input";
import {SearchIcon} from "lucide-react";



const SearchBar = () => {
    return (
        <div className="relative mb-10">
            <form className="" action="">
                <Input className="border-4 border-pink-300" />
                <div className="bg-pink-300 w-[50px] p-[6px] rounded-md absolute top-0 right-0 flex items-center justify-end">
                    <SearchIcon className="text-pink-900" />
                </div>
            </form>
        </div>
    )
}

export default SearchBar;