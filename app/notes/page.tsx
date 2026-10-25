import Link from "next/link";
import { Suspense } from "react";
import { getNotes } from "../services/notes";

type NotesProps = {
  searchParams: Promise<{ important?: string }>;
};

const Notes = ({ searchParams }: NotesProps) => {
  return (
    <div>
      <h2>Notes</h2>
      <Suspense fallback={<p>Loading notes...</p>}>
        <NoteList searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

const NoteList = async ({
  searchParams,
}: NotesProps) => {
  const { important } = await searchParams;
  const showImportant = important === "true";
  const allNotes = getNotes();
  const notes = showImportant
    ? allNotes.filter((note) => note.important)
    : allNotes;

  return (
    <>
      <div>
        <Link href={showImportant ? "/notes" : "/notes?important=true"}>
          {showImportant ? "show all" : "show important only"}
        </Link>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link href={`/notes/${note.id}`}>{note.content}</Link>
            {note.important && <strong> (important)</strong>}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Notes;
