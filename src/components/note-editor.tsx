"use client";

import { useEffect, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { processNote, type FormState } from "@/lib/actions";
import { templates, type NoteTemplate } from "@/lib/templates";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Send, Copy, Check, Bot } from "lucide-react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

const initialState: FormState = {
  message: "",
};

export function NoteEditor() {
  const [formState, formAction] = useFormState(processNote, initialState);
  const [isPending, startTransition] = useTransition();
  const [selectedTemplate, setSelectedTemplate] = useState<NoteTemplate>(
    templates[0]
  );
  const [useAi, setUseAi] = useState(true);
  const [noteContent, setNoteContent] = useState("");
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (formState.message && !formState.finalContent) {
      toast({
        title: formState.error ? "Error" : "Success",
        description: formState.message,
        variant: formState.error ? "destructive" : "default",
      });
    }
  }, [formState, toast]);

  const handleCopyToClipboard = () => {
    if (formState.finalContent) {
      navigator.clipboard.writeText(formState.finalContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: "Copied to clipboard!" });
    }
  };

  const handleSendToKeep = () => {
    toast({
        title: "Sent to Google Keep!",
        description: "Your note has been transferred.",
    });
  }

  return (
    <Card className="w-full shadow-lg">
      <form
        action={(formData) => {
          startTransition(() => formAction(formData));
        }}
      >
        <CardHeader>
          <CardTitle>Create a new note</CardTitle>
          <CardDescription>
            Select a template that best fits your idea.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs
            defaultValue={selectedTemplate.id}
            onValueChange={(id) =>
              setSelectedTemplate(templates.find((t) => t.id === id)!)
            }
          >
            <TabsList className="grid w-full grid-cols-3">
              {templates.map((template) => (
                <TabsTrigger key={template.id} value={template.id}>
                  {template.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <input type="hidden" name="templateId" value={selectedTemplate.id} />
          <input type="hidden" name="useAi" value={useAi.toString()} />
          
          <div className="space-y-2">
            <Label htmlFor="note">Note Content</Label>
            <Textarea
              id="note"
              name="note"
              placeholder={selectedTemplate.placeholder}
              className="min-h-[150px] text-base"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="ai-suggestions"
              checked={useAi}
              onCheckedChange={setUseAi}
            />
            <Label htmlFor="ai-suggestions" className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-primary" />
              Enable AI Suggestions (Title & Tags)
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending || !noteContent.trim()}>
            {isPending ? "Processing..." : "Process Note"}
            <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </form>

      {formState.finalContent && (
        <>
          <CardHeader>
            <CardTitle>Processed Note</CardTitle>
            <CardDescription>
              Your note is ready. You can edit the details before sending.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Suggested Title</Label>
              <Input id="title" defaultValue={formState.title} />
            </div>
            <div className="space-y-2">
              <Label>Suggested Tags</Label>
              <div className="flex flex-wrap gap-2">
                {formState.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Final Note Preview</Label>
              <div className="relative">
                <Textarea
                  value={formState.finalContent}
                  readOnly
                  className="min-h-[200px] bg-muted/50"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={handleCopyToClipboard}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSendToKeep}>
              Send to Google Keep <Send className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
