import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from '../auth/SignUp'
import Todo from '../Todo'
import SignIN from '../auth/SignIN'

const Indexrouts = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<SignUp/>} />
          <Route path="/todo" element={<Todo/>} />
          <Route path="/signin" element={<SignIN/>} />
        </Routes>
      
    </div>
  )
}

export default Indexrouts
