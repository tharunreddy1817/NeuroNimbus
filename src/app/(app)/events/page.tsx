import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { mockEvents } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Events</h1>
        <Button>
          <Plus className="-ml-1 mr-2 h-4 w-4" />
          Create Event
        </Button>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockEvents.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id}>
            <Card className="overflow-hidden transition-all hover:shadow-xl group">
              <CardHeader className="p-0">
                <div className="relative w-full aspect-video">
                  {event.coverPhotoUrl && (
                    <Image
                      src={event.coverPhotoUrl}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      data-ai-hint={event.coverPhotoHint}
                    />
                  )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </CardHeader>
              <CardContent className="absolute bottom-0 w-full p-4">
                <h3 className="text-xl font-bold text-white font-headline">{event.title}</h3>
                {event.date && (
                  <p className="text-sm text-gray-200">{format(new Date(event.date), 'MMMM d, yyyy')}</p>
                )}
                <p className="text-sm text-gray-300 mt-1">{event.memoryCount} {event.memoryCount === 1 ? 'memory' : 'memories'}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
