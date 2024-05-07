"use client";
import React,{useEffect, useState} from "react";
import Note from "../components/Note";
import { NoteModel } from "../types";
import Link from "next/link";
import { useSearchParams } from 'next/navigation'

export default function Notes() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ""

  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadInitialData = async () => {
    const res = await fetch(`http://localhost:5000/api/notes/search?key=${search}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const content = await res.json();
    if(content) {
      setNotes(content);
    }
  
  }

  let delete_Note : NoteModel['deleteNote']= async (id:string) => {

    const res = await fetch(`http://localhost:5000/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const content = await res.json();
    if(content)
    {

      setNotes(notes?.filter((note:NoteModel)=>{  return note._id !== id  }));
    }
  }

  useEffect(() => {
    loadInitialData();
  }, [search]);


  return (
    <div className="w-full max-w-7xl m-auto">
      <div className="w-full flex items-center px-4 py-8 rounded-lg shadow-md gap-4">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search"
          className="h-[40px] flex-grow outline-none border-grey-200 border-[2px] rounded-md px-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link href={`/note?search=${searchTerm}`} className="p-2 bg-green-600 rounded-md text-white">Search</Link>
      </div>
      <div className="flex justify-between items-center py-4" >
        <div className="font-bold text-green-500 text-2xl text-left">
          List Notes :
          <span className="text-red-500 font-bold"> {notes?.length || 0}</span>
        </div>
        <div>
          <Link href={`/note/create`} className="p-2 bg-green-600 rounded-md text-white">Add Note</Link>
        </div>
      </div>
      <table className="w-full border-collapse border border-slate-400">
        <thead>
          <tr className="text-center">
            <th className="border border-slate-300 w-[20%]">Full Name</th>
            <th className="border border-slate-300">Note</th>
            <th className="border border-slate-300 w-[10%]">Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          notes?.map((item : NoteModel)=><Note key={item._id} {...item} deleteNote={delete_Note}/>)
        }
        </tbody>
      </table>
    </div>
  );
}