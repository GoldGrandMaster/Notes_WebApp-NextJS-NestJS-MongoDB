"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetcher } from '@/app/libs'
import useSWR from 'swr'
import { useForm } from 'react-hook-form'


export default function NoteEdit({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: record, isLoading, error } = useSWR(`http://localhost:5000/api/notes/${params.id}`, fetcher) // ${process.env.PATH_URL_BACKEND}/api/notes/${params.id}
  const { register, handleSubmit, reset } = useForm({});
  const [formError, setFormError] = useState<string>("");

  useEffect(() => {
    let defaultValues = { fullName: "", note: ""};
    if(record)
    {
      defaultValues.fullName = record.fullName;
      defaultValues.note = record.note;
      reset({ ...defaultValues });
    }
  }, [record, isLoading])

  const updateNote = async (e: any) => {
    if(e.note.length < 20) {
      setFormError("Note must not be shorter then 20 characters");
      return;
    }

    if(e.note.length > 300) {
      setFormError("Note must not be longer then 300 characters");
      return;
    }

    if (e.fullName != "" && e.note != "") {
      const formData = {
        fullName: e.fullName,
        note: e.note
      }
      const res = await fetch(`http://localhost:5000/api/notes/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const content = await res.json();

      if (content) {
        router.push('/note');
      }

    }
  };

  if (!record) return null;
  return (
    <form className='w-full' onSubmit={handleSubmit(updateNote)}>
      <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Form Edit</span>
      <div className='w-full py-2'>
        <label htmlFor="" className='text-sm font-bold py-2 block'>Full Name</label>
        <input type='text' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' { ...register("fullName") } />
      </div>
      <div className='w-full py-2'>
        <label htmlFor="" className='text-sm font-bold py-2 block'>Note</label>
        <textarea className='w-full border-[1px] border-gray-200 p-2 rounded-sm' { ...register("note") } />
      </div>
      { formError != "" &&
        <div className='p-2 text-red-600'>
          {formError}
        </div>
      }
      <div className='w-full py-2'>
        <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
      </div>
    </form>
  )
}