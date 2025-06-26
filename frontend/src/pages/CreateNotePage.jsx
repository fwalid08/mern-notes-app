import api from '../lib/axios';
import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const CreateNotePage = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const isFormValid = () => {
    if (!title.trim() || !content.trim()) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!isFormValid()) {
      toast.error('All fields are required!');
      return;
    }

    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success('Note created succesfully!');
      navigate('/'); 
    } catch (error) {
      toast.error('Error creating note!', error.message)
      console.log(error.message); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input type="text" placeholder="Note Title" className="input input-bordered" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea rows="10" placeholder="Note Content" className="textarea textarea-bordered" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="card-actions justify-end">
                  <button type="submit" className="btn btn-primary" disabled={isLoading || !isFormValid()}>
                    { isLoading ? 'Creating...' : 'Create Note' }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNotePage;
