'use client'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { onValue, ref, set, remove } from 'firebase/database'
import { uid } from 'uid'
import { getAuth } from 'firebase/auth'
import { BsSendFill } from 'react-icons/bs'

const Chat = () => {
  const auth = getAuth()
  const user = auth.currentUser
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([])

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
  const writeToDatabase = (e: any) => {
    e.preventDefault()
    if (user) {
      const displayName = auth.currentUser.displayName
      


     

     

      const uuid = uid()
      set(ref(db, `/${uuid}`), {
        note,
        uuid,
        displayName,
      })
      setNote('')
    }
  }
  return (
    <div className='main-container bg-secondary '>
      <div className='container container-fluid bg-danger border h-100 w-25'>
        <div className='d-flex text-center align-items-center justify-content-center'>
          <div className='position-absolute bottom-0'>
            <form action=''>
              <input className='input mb-5' type='text' />
              <button
                className='submit-btn btn mb-2 ms-2 fs-5 mt-1'
                type='submit'
                onChange={(e: any) => setNote(e.target.value)}
              >
                <BsSendFill />
              </button>
            </form>
          </div>
          <div>
            <h1>123</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
