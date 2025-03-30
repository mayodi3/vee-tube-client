"use client";

import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Search } from "lucide-react";
import { searchVideos } from "@/lib/actions";
import type { VideoInfo } from "@/lib/types";

interface SearchBarProps {
  onSearchResults: (results: VideoInfo[]) => void;
  onSearching: (isSearching: boolean) => void;
}

const SearchBar = ({ onSearchResults, onSearching }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    setIsLoading(true);
    onSearching(true);

    try {
      const results = await searchVideos(query);
      onSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
      onSearching(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Input
              className="pl-12 h-14 text-lg border-2 border-primary/20 focus-visible:ring-primary/30 rounded-xl search-input"
              placeholder="Search VeeTube videos..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
            />
            <Heart className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
          </div>
          <Button
            type="submit"
            className="h-14 px-6 rounded-xl bg-primary hover:bg-primary/90 download-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Search className="h-5 w-5" />
            )}
            <span className="ml-2 hidden sm:inline">Search</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
