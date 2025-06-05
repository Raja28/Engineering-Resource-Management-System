import { useState } from 'react'
import './App.css'

import { Header } from './components/Header'
import { LoginForm } from './components/LoginForm'
import { Signup } from './components/Signup'

function App() {
  const [showForm, setShowForm] = useState(true)
  return (
    <>
      <Header />
      {
        showForm ? (<LoginForm setShowForm={setShowForm} />) : (<Signup setShowForm={setShowForm} />)
      }
    
    </>
  )
}

export default App
