import React from 'react'
import { NoteModel } from '../types'
import Link from 'next/link'

export default function Note(params: NoteModel) {
  return (
    <tr>
        <td className='border border-slate-300 text-center'>{params.fullName}</td>
        <td className='border border-slate-300 text-center'>{params.note}</td>
        <td className='border border-slate-300'>
          <div className='flex gap-2 px-2'>
            <Link href={`/note/edit/${params._id}`} className='p-2 bg-orange-600 rounded-md text-white'>Edit</Link>
            <button className='p-2 bg-red-600 rounded-md text-white' onClick={() => params.deleteNote(params._id)}>Delete</button>
          </div>
        </td>
    </tr>
  )
}