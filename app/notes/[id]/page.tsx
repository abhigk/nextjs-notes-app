import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getNoteById } from "../../services/notes";
import { toggleNoteImportance } from "../../actions/notes";

type NotePageProps = {
  params: Promise<{ id: string }>;
};

const NotePage = ({ params }: NotePageProps) => {
  return (
    <Suspense fallback={<p>Loading note...</p>}>
      <NoteDetails params={params} />
    </Suspense>
  );
};

const NoteDetails = async ({ params }: NotePageProps) => {
  const { id } = await params;
  const note = getNoteById(Number(id));

  if (!note) {
    notFound();
  }

  return (
    <div>
      <h2>{note.content}</h2>
      <p>{note.important ? "Important" : "Not important"}</p>
      <form action={toggleNoteImportance}>
        <input type="hidden" name="id" value={note.id} />
        <button type="submit">
          {note.important ? "Mark as not important" : "Mark as important"}
        </button>
      </form>
    </div>
  );
};

export default NotePage;
