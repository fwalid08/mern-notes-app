import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import Navbar from "../components/Navbar";
import RateLimitMessage from "../components/RateLimitMessage";
import NoteCard from '../components/NoteCard';
import NoteIsEmptyMessage from '../components/NoteIsEmptyMessage';

const HomePage = () => {
    const [isRateLimitReached, setIsRateLimitReached] = useState(false);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onNoteDelete = (id) => {
      setNotes((prev) => {
        return prev.filter(note => note._id !== id);
      });
    }

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await api.get('/notes');
                setNotes(res.data);
                setIsRateLimitReached(false);
            } catch (error) {
                if (error.response?.status == 429) {
                    setIsRateLimitReached(true);
                } else {
                    toast.error("Error fetching notes. Please try again later.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchNotes();
    }, []);

    return (
    <div className="min-h-screen">
      <Navbar />
      { isRateLimitReached && <RateLimitMessage /> }
      {
        notes.length === 0 && !isRateLimitReached && !isLoading && (
          <NoteIsEmptyMessage />
        )
      }
      <div className="max-w-7xl mx-auto p-4 mt-6">
        { isLoading && <div className="text-center text-primary py-10">Loading notes...</div> }
        {
          notes.length > 0 && !isRateLimitReached && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {
                notes.map(note => (
                  <NoteCard key={note._id} note={note} onDelete={onNoteDelete} />
                ))
              }
            </div>
          )
        }
      </div>
    </div>
  );
}

export default HomePage;