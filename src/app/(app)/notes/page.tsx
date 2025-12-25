import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { mockNoteSession } from '@/lib/mock-data';
import { format } from 'date-fns';
import { Bot, Plus, Sparkles } from 'lucide-react';

export default function NotesPage() {
  const { title, notes, summaryText, summaryKeywords, updatedAt } = mockNoteSession;

  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Memory Notes</h1>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Add fragmented notes below.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="space-y-3">
              {notes.map((note, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-sm text-muted-foreground min-w-16 text-right">
                    {format(new Date(note.createdAt), 'h:mm a')}
                  </div>
                  <div className="flex-1 rounded-md border bg-muted/50 p-3 text-sm">{note.text}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Textarea placeholder="Type a new note..." />
              <Button size="icon" className="h-auto aspect-square">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Reconstructed Summary
            </CardTitle>
            <CardDescription>
              Last updated on {format(new Date(updatedAt), 'MMMM d, yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none text-foreground font-body">
              <p>{summaryText}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="secondary">
                <Bot className='mr-2 h-4 w-4' />
                Regenerate Summary
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
