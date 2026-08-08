import React from 'react'
import Navbar from '../components/Navbar.jsx'
import RateLimitedUI from '../components/RateLimitedUI.jsx'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import NoteCard from '../components/NoteCard.jsx'
import api from '../lib/axios.js'
import NotesNotFound from '../components/NotesNotFound.jsx'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchNotes = async () => {
//         try {
//             const res = await fetch('http://localhost:5000/api/notes');
//             const data = await res.json();
//             console.log(data);
//         }
//         catch (error) {
//             console.error("Error fetching notes:", error);
//         }
//     }
//     fetchNotes();
//   }, []);

    useEffect(() => {
    const fetchNotes = async () => {
        try {
            const res = await api.get('/notes');
            console.log(res.data);
            setNotes(res.data);
            setIsRateLimited(false);
        }
        catch (error) {
            console.error("Error fetching notes:", error);
            if(error.response && error.response.status === 429) {
                setIsRateLimited(true);
            }
            else{
                console.error("Error fetching notes:", error);
            }
        }
        finally {
            setIsLoading(false);
        }
    }
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
        <Navbar />
        {isRateLimited && <RateLimitedUI />}
        <div className="max-w-7xl mx-auto p-4 mt-6">
            {isLoading && <div className="text-center text-primary py-10">Loading...</div>}

            {notes.length == 0 && !isRateLimited && <NotesNotFound/>}

            {notes.length > 0 && !isRateLimited &&
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {notes.map((note) => (
                        <NoteCard key={note._id} note={note} setNotes={setNotes}/>
                    ))}
                </div>}
        </div>
    </div>
  )
}

export default HomePage