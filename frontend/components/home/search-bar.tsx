"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconSearch, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ 
  className, 
  placeholder = "Buscar torneos, juegos, equipos...",
  onSearch 
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = () => {
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className={cn("fixed left-0 right-0 top-0 z-50", className)}>
      <div className="w-full border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-center">
            <div className={cn(
              "relative w-full max-w-2xl transition-all duration-300",
              isFocused && "max-w-3xl"
            )}>
              <div className={cn(
                "flex items-center gap-2 rounded-full border bg-muted/50 px-4 transition-all duration-300",
                isFocused && "border-primary ring-2 ring-primary/20"
              )}>
                <IconSearch className={cn(
                  "size-5 text-muted-foreground transition-colors",
                  isFocused && "text-primary"
                )} />
                <Input
                  type="text"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={handleKeyDown}
                  className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                />
                {query && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7"
                    onClick={clearSearch}
                  >
                    <IconX className="size-4" />
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={handleSearch}
                  className="rounded-full"
                >
                  Buscar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
