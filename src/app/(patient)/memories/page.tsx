'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { MemoryCard } from '@/app/(app)/memories/components/memory-card';
import { mockMemories } from '@/lib/mock-data';

type FilterType = 'all' | 'person' | 'event' | 'date';

export default function MemoriesPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [query, setQuery] = useState('');

  /**
   * MAIN FILTER LOGIC
   * Every option shows real memories by default
   */
  const filteredMemories = mockMemories.filter((memory: any) => {
    // CATEGORY FILTER
    const matchesFilter =
      filter === 'all' || memory.type === filter;

    // SAFE SEARCH (string-only)
    const searchableText = [
      memory.title,
      memory.description,
      memory.person,
      memory.event,
      memory.date,
    ]
      .filter((v) => typeof v === 'string')
      .join(' ')
      .toLowerCase();

    return (
      matchesFilter &&
      searchableText.includes(query.toLowerCase())
    );
  });

  return (
    <div className="flex gap-6">
      {/* LEFT SIDEBAR */}
      <aside className="w-48 shrink-0 rounded-lg border bg-background p-4">
        <h2 className="mb-4 text-sm font-semibold text-muted-foreground">
          Categories
        </h2>

        <div className="flex flex-col gap-2">
          {(['all', 'person', 'event', 'date'] as FilterType[]).map(
            (item) => (
              <Button
                key={item}
                variant={filter === item ? 'default' : 'ghost'}
                className="justify-start capitalize"
                onClick={() => setFilter(item)}
              >
                {item}
              </Button>
            )
          )}
        </div>
      </aside>

      {/* MAIN CONTENT (ALWAYS PRESENT) */}
      <div className="flex flex-1 flex-col gap-6">
        {/* HEADER */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold tracking-tight font-headline">
            Memories
          </h1>

          {/* SEARCH */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search memories..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </header>

        {/* MEMORY GRID (SAME AS ALL PAGE) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredMemories.map((memory: any) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      </div>
    </div>
  );
}
