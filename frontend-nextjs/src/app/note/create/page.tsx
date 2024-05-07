"use client"
import React, {useState } from 'react'
import { useRouter } from 'next/navigation'
export default function NoteCreate() {
  const router = useRouter()
  const [note, setNote] = useState<string>('');
  const [fullName, setfullName] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const addNote = async (e: any) => {
    e.preventDefault()

    if(note.length < 20) {
      setFormError("Note must not be shorter then 20 characters");
      return;
    }

    if(note.length > 300) {
      setFormError("Note must not be longer then 300 characters");
      return;
    }

    if (note != "" && fullName != "") {
      const formData = {
          fullName: fullName,
          note: note
      }
      const add = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const content = await add.json();

      if(content)
      {
        router.push('/note');
      }

      setFormError("");
      return ;
    }
    setFormError("Please fill note and fullName");
    
  };
  return (
    <form className='w-full' onSubmit={addNote}>
      <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Form Add</span>
      <div className='w-full py-2'>
        <label htmlFor="" className='text-sm font-bold py-2 block'>Full Name</label>
        <input type='text' name='fullName' className='w-full border-[1px] border-gray-200 p-2 rounded-sm'  onChange={(e:any)=>setfullName(e.target.value)}/>
      </div>
      <div className='w-full py-2'>
        <label htmlFor="" className='text-sm font-bold py-2 block'>Note</label>
        <textarea name='note' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' onChange={(e:any)=>setNote(e.target.value)} />
      </div>
      { formError != "" &&
        <div className='text-red-600'>{formError}</div>
      }
      <div className='w-full py-2'>
        <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
      </div>
  </form>
  )
}