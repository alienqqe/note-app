'use client'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { onValue, ref, set, remove, orderByChild } from 'firebase/database'
import { uuid } from 'uuidv4'
import { getAuth } from 'firebase/auth'
import { BsSendFill } from 'react-icons/bs'
import { FaTrashCan } from 'react-icons/fa6'

const Chat = () => {
  const auth = getAuth()
  const user = auth.currentUser
  const [noteText, setNoteText] = useState('')
  const [notes, setNotes] = useState<any[]>([])

  //read
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setNotes([])
      const data = snapshot.val()
      if (data !== null) {
        Object.values(data).map((note) => {
          setNotes((oldArray) => [...oldArray, note])
        })
      }
    })
  }, [])

  // write
  const writeToDatabase = (event: any) => {
    event.preventDefault()

    if (user) {
      const userID = auth.currentUser.uid

      const id = Date.now()
      set(ref(db, `/${id}`), {
        noteText,
        id,
        userID,
      })
      setNoteText('')
    }
  }
  // delete
  const handleDelete = (note: any) => {
    if (confirm('Do you want to delete this note?')) {
      remove(ref(db, `/${note.id}`))
    }
  }

  const userNotes = notes.filter((item) => item?.userID === user?.uid)

  return (
    <div className='main-container bg-secondary '>
      <div className='h-100  note-container position-relative container container-fluid mh-vh-100 overflow-y-scroll'>
        <div className='input-container'>
          <div className=''>
            <form className='' onSubmit={writeToDatabase}>
              <input
                className='input'
                type='text'
                value={noteText}
                placeholder='Add note'
                onChange={(e: any) => setNoteText(e.target.value)}
              />
              <button className='submit-btn btn mb-2 ms-2 fs-5 mt-1'>
                <BsSendFill />
              </button>
            </form>
          </div>
        </div>
        <div className='h-75 position-relative d-flex flex-column-reverse overflow-y-auto  mb-5 me-3 '>
          {userNotes.map((note) => (
            <>
              <div className='notes fs-5 d-flex justify-content-end align-items-end h-50 '>
                <div>
                  <div className='note p-1 mt-2 me-1 d-flex'>
                    {note.noteText}{' '}
                  </div>
                </div>

                <span
                  className='delete-button mb-1 ms-2'
                  onClick={() => handleDelete(note)}
                >
                  <FaTrashCan />
                </span>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chat
