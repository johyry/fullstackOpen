import { useState, useEffect, useRef } from 'react'
import BlogList from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedBlogappUser') 
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const blog = await blogService.create({
        title: blogObject.title,
        author: blogObject.author,
        url: blogObject.url,
        likes: 0
      })
      setBlogs(blogs.concat(blog))
      setNotification(`${blog.title} by ${blog.author} added succesfully.`)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      console.log("exception:", exception, "???")
    }
}

  const setNotification = (string) => {
    setNotificationMessage(string)
    setTimeout(() => {
      setNotificationMessage("")
    }, 5000)
  }

  const addLike = async (blogObject) => {
    blogObject.likes++
    const newBlog = await blogService.like(blogObject)
    const newBlogs = blogs.map(blog => blog.id === newBlog.id ? newBlog : blog)
    setBlogs(newBlogs)
  }

  const deleteBlog = async (blogObject) => {
    try {
      if (window.confirm(`You really want to delete ${blogObject.title}?`)) {
        await blogService.deleteBlog(blogObject)
        setNotification(`Deleting blog ${blogObject.title} succesful.`)
      }
    } catch (exception) {
      setNotification(`You can only delete your stuff mate.`)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification(`${user.name} logged in succesfully.`)
    } catch (exception) {
      setNotification('wrong credentials')
    }
  }

  const handleLogOut = () => {
    setUser(null)
  }

  return (
    <div>
      <Notification notificationMessage={notificationMessage}/>
      <h2>blogs</h2>
      {!user && <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>}
      {user && 
      <div>
      <LogOutButton handleLogOut={handleLogOut} />
      <> {user.username} logged in</>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <br/>
      </div>
      }
      {user && <BlogList blogs={blogs} addLike={addLike} deleteBlog={deleteBlog} loggedInUser={user} />}
    </div>
  )
}



const LogOutButton = ({ handleLogOut }) => {
  return (
    <button onClick={handleLogOut}>log out</button>
  )
}

export default App