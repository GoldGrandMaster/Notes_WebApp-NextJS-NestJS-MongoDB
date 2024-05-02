'use client'
import { fetcher } from '@/app/libs'
import useSWR from 'swr'

export default function Detail({params}: {params:{id :number}}) {
  const {data: note, isLoading, error}  = useSWR(`/api/notes/${params.id}`,fetcher)
  
  if(isLoading) return <div>Loading...</div>
  if (!note) return null;
  return (
    <div className='w-full'>
        <h2 className='text-center font-bold text-3xl py-3'>{note.result.title}</h2>

       <div className='w-full max-w-4xl m-auto border-[1px] p-3 border-gray-500 rounded-md'>
         <p dangerouslySetInnerHTML={{ __html: note.result.content}}></p>

       </div>
    </div>
  )
}