import { AppHeader } from "@/components/app-header";
import { NoteEditor } from "@/components/note-editor";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Idea Inbox</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Quickly capture your fleeting ideas. Choose a template, write down your thoughts, and let AI help you organize.
          </p>
          <NoteEditor />
        </div>
      </main>
    </div>
  );
}
