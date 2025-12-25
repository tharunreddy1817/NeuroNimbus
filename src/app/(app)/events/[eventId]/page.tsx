import { mockEvents, mockMemories } from '@/lib/mock-data';
import { MemoryCard } from '../memories/components/memory-card';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';

export default function EventDetailPage({ params }: { params: { eventId: string } }) {
  const event = mockEvents.find((e) => e.id === params.eventId);
  const eventMemories = mockMemories.filter((m) => m.event?.id === params.eventId);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight font-headline">{event.title}</h1>
        {event.date && (
            <p className="text-lg text-muted-foreground mt-1">
                {format(new Date(event.date), 'MMMM d, yyyy')}
            </p>
        )}
      </header>
      
      <section>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {eventMemories.length > 0 ? (
            eventMemories.map((memory) => <MemoryCard key={memory.id} memory={memory} />)
          ) : (
            <p className="text-muted-foreground col-span-full">No memories found for this event.</p>
          )}
        </div>
      </section>
    </div>
  );
}
