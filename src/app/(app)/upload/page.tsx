import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Image as ImageIcon, LoaderCircle, ShieldAlert, Sparkles, Users } from 'lucide-react';

const ProcessingStep = ({ icon, text, status }: { icon: React.ReactNode, text: string, status: 'pending' | 'processing' | 'done' }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                {status === 'processing' && <LoaderCircle className="h-5 w-5 animate-spin text-primary" />}
                {status === 'done' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                {status === 'pending' && icon}
            </div>
            <p className={`text-sm ${status === 'pending' ? 'text-muted-foreground' : ''}`}>{text}</p>
        </div>
    )
}

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight font-headline">New Memory</h1>
        <p className="text-muted-foreground">Upload a photo and add details to create a new memory.</p>
      </header>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Memory Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Photo</Label>
              <Input id="picture" type="file" className="h-auto" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="caption">Caption</Label>
              <Textarea id="caption" placeholder="Describe the memory..." rows={4} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event">Event (optional)</Label>
              <Input id="event" placeholder="e.g., Summer Vacation 2023" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="people">People (optional)</Label>
                <Input id="people" placeholder="Add names to tag people..." />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Processing Status</CardTitle>
                    <CardDescription>AI is helping to organize this memory.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ProcessingStep icon={<Users className="h-5 w-5 text-muted-foreground" />} text="Detecting people" status="processing" />
                    <ProcessingStep icon={<ShieldAlert className="h-5 w-5 text-muted-foreground" />} text="Checking for duplicates" status="pending" />
                    <ProcessingStep icon={<Sparkles className="h-5 w-5 text-muted-foreground" />} text="Extracting keywords" status="pending" />
                </CardContent>
            </Card>

            <Button size="lg" className="w-full">Upload and Process Memory</Button>
        </div>
      </div>
    </div>
  );
}
