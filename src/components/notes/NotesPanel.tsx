import { Task } from '@/types/index';
import AddNotesForm from './AddNotesForm';
import NoteDetail from './NoteDetail';

type NotesPanelProps = {
  notes: Task['notes'];
};

export default function NotesPanel({ notes }: NotesPanelProps) {
  return (
    <>
      <AddNotesForm />
      <div className="divide-y divide-gray-100 mt-10">
        {notes.length ? (
          <>
            <p className="font-bold text-2xl text-slate-600 my-5">Notas:</p>
            {notes.map((note) => (
              <NoteDetail key={note._id} note={note} />
            ))}
          </>
        ) : (
          <p className="text-gray-500 text-center p-3 pt-3">No hay notas</p>
        )}
      </div>
    </>
  );
}