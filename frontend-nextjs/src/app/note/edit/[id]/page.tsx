"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetcher } from '@/app/libs'
import useSWR from 'swr'

export default function NoteEdit({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: record, isLoading, error } = useSWR(`/api/notes/${params.id}`, fetcher)
  const [fullName, setfullName] = useState<string>('');
  const [note, setNote] = useState<string>('');

  useEffect(() => {
    if (record) {
      setfullName(record?.fullName)
      setNote(record?.note)
    }
    else {
      setfullName('');
      setNote('');
    }
  }, [record, isLoading])

  const updateNote = async (e: any) => {
    e.preventDefault()
    if (fullName != "" && note != "") {
      const formData = {
        fullName: fullName,
        note: note
      }
      const res = await fetch(`/api/notes/${params.id}`, {
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

  if (isLoading) return <div>Loading...</div>
  if (!record) return null;
  return (
    <form className='w-full' onSubmit={updateNote}>
      <span className='font-bold text-yellow-500 py-2 block underline text-2xl'>Form Edit</span>
      <div className='w-full py-2'>
        <label htmlFor="" className='text-sm font-bold py-2 block'>Full Name</label>
        <input type='text' name='title' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' value={fullName} onChange={(e: any) => setfullName(e.target.value)} />
      </div>
      <div className='w-full py-2'>
        <label htmlFor="" className='text-sm font-bold py-2 block'>Note</label>
        <textarea name='title' className='w-full border-[1px] border-gray-200 p-2 rounded-sm' value={note} onChange={(e: any) => setNote(e.target.value)} />
      </div>
      <div className='w-full py-2'>
        <button className="w-20 p-2 text-white border-gray-200 border-[1px] rounded-sm bg-green-400">Submit</button>
      </div>
    </form>
  )
}