import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockMemories, mockPeople } from '@/lib/mock-data';
import { MemoryCard } from '../memories/components/memory-card';
import { notFound } from 'next/navigation';
import { Edit } from 'lucide-react';

export default function PersonDetailPage({ params }: { params: { peopleId: string } }) {
  const person = mockPeople.find((p) => p.id === params.peopleId);
  const personMemories = mockMemories.filter((m) => m.people.some((p) => p.id === params.peopleId));

  if (!person) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative h-32 w-32 shrink-0">
          <Image
            src={person.faceThumbUrl}
            alt={person.displayName}
            fill
            className="rounded-full object-cover border-4 border-background shadow-lg"
            data-ai-hint={person.faceThumbHint}
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-4xl font-bold tracking-tight font-headline">{person.displayName}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Label htmlFor="relationship" className="text-base text-muted-foreground">
              Relationship:
            </Label>
            <Input id="relationship" defaultValue={person.relationshipTag} className="w-48" />
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      
      <section>
        <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">Memories with {person.displayName}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {personMemories.length > 0 ? (
            personMemories.map((memory) => <MemoryCard key={memory.id} memory={memory} />)
          ) : (
            <p className="text-muted-foreground col-span-full">No memories found for {person.displayName}.</p>
          )}
        </div>
      </section>
    </div>
  );
}
