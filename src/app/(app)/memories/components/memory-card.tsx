import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Memory } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';

interface MemoryCardProps {
  memory: Memory;
}

export function MemoryCard({ memory }: MemoryCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-4">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={memory.photoUrl}
            alt={memory.caption}
            fill
            className="rounded-md object-cover"
            data-ai-hint={memory.photoHint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="text-sm text-muted-foreground">
          {format(new Date(memory.createdAt), 'MMMM d, yyyy')}
        </p>
        <p className="mt-2 text-base leading-relaxed">{memory.caption}</p>
        {memory.duplicateStatus === 'candidate' && (
          <Alert variant="destructive" className="mt-4">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Possible Duplicate</AlertTitle>
            <AlertDescription>This memory seems similar to another one.</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-4 p-4 pt-0">
        <div className="flex -space-x-2 overflow-hidden">
          {memory.people.map((person) => (
            <Avatar key={person.id} className="h-8 w-8 border-2 border-card">
              <AvatarImage src={person.faceThumbUrl} alt={person.displayName} data-ai-hint={person.faceThumbHint} />
              <AvatarFallback>{person.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {memory.keywords.map((keyword) => (
            <Badge key={keyword} variant="secondary" className="font-normal">
              {keyword}
            </Badge>
          ))}
          {memory.event && (
            <Badge variant="outline" className="font-normal border-accent text-accent-foreground">
              {memory.event.title}
            </Badge>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
