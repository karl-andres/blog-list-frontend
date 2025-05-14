import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import BlogsPage from './components/BlogsPage'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {notification && <div className="notification">{notification}</div>}
      
      {user === null ? (
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
      ) : (
        <BlogsPage setUser={setUser} setErrorMessage={setErrorMessage} setNotification={setNotification}/>
      )}
    </div>
  )
}

export default App