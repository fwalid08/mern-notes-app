import { ArrowLeftIcon } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";

const ShowNotePage = () => {

  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams ();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    setIsDeleting(true);
    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete note!');
      console.error("Error deleting note:", error);
    } finally {
      setIsDeleting(false);
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('All fields are required!');
      return;
    }
    setIsSaving(true);
    try {
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success('Note updated successfully!');
    } catch (error) {
      toast.error('Error updating note!');
      console.error("Error updating note:", error);
    } finally {
      setIsSaving(false);
    }
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data[0]);
      } catch (error) { 
        toast.error("Error fetching note. Please try again later.");
        console.error("Error fetching note:", error);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <LoaderIcon className="size-10 animate-spin" />
    </div>;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline" disabled={isDeleting}>
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Note</h2>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type="text" placeholder="Note Title" className="input input-bordered" value={note.title} onChange={(e) => setNote({...note, title: e.target.value})} />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea rows="10" placeholder="Note Content" className="textarea textarea-bordered" value={note.content} onChange={(e) => setNote({...note, content: e.target.value})} />
              </div>
              <div className="card-actions justify-end">
                <button onClick={(e) => handleSave(e, note._id)} type="submit" className="btn btn-primary" disabled={isSaving || isDeleting}>
                  { isSaving ? 'Updating...' : 'Update Note' }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowNotePage;
