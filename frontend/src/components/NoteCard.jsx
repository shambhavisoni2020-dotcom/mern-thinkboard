import { PenSquareIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { Trash2Icon } from 'lucide-react'
import { formatDate } from '../lib/utils.js'
import toast from 'react-hot-toast'
import api from '../lib/axios.js'

const NoteCard = ({note, setNotes}) => {
    const handleDelete = async (e, id) => {
        e.preventDefault();

        if(!window.confirm("Are you sure you want to delete")) return;

        try{
            await api.delete(`/notes/${id}`);
            toast.success("Deleted successfully");
            setNotes((prev) => prev.filter(note => note._id !== id));
        }
        catch(error){
            console.error("error", error);
            toast.error("Error deleting note");
        }
    }
  return (
    <Link to={`/notes/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]">
        <div className="card-body">
            <h2 className="card-title text-base-content">{note.title}</h2>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-actions justify-between items-center mt-4">
                <span className="text-sm text-base-content/50">{formatDate(new Date(note.createdAt))}</span>
                <div className="flex items-center gap-1">
                    <PenSquareIcon className ="size-4"/>
                    <button onClick={(e) => handleDelete(e, note._id)} className="btn btn-ghost btn-xs text-error">
                        <Trash2Icon className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default NoteCard