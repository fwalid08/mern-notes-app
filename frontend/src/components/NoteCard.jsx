import { Link } from "react-router";
import { PenSquareIcon, TrashIcon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

export default function NoteCard({ note, onDelete }) {

  const handleDelete = (e, id) => {
    e.preventDefault();
    
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    try {
      api.delete(`/notes/${id}`);
      onDelete(id);
      toast.success('Note deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete note!');
      console.log(error.message);
    }
  };

  return (
    <Link to={`/notes/${note._id}`}>
      <div
        key={note._id}
        className="card h-[250px] bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-200 border-t-4 border-solid"
      >
        <div className="card-body">
          <h2 className="card-title text-based-content">{note.title}</h2>
          <p className="text-based-content/70 line-clamp-3">
            {note.content.substring(0, 100)}
            {note.content.length > 100 ? "..." : null}
          </p>
          <hr className="border-t border-gray-400" />
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/70">
              {formatDate(note.createdAt)}
            </span>
            <div className="flex items-center gap-2">
              <PenSquareIcon className="size-5" />
              <TrashIcon className="size-5 text-error" onClick={(e) => handleDelete(e, note._id)} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
