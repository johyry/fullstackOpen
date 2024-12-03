import { useState } from 'react'

const BlogForm = ({
    createBlog,
  }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
       setTitle(event.target.value)
    }
    
    const handleAuthorChange = (event) => {
      setAuthor(event.target.value)
    }
    
    const handleUrlChange = (event) => {
      setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
    }
    
    return (
    <div>
      <br/>
      <form onSubmit={addBlog}>
        Title: <input
          value={title}
          onChange={handleTitleChange}
        />
        <br/>
        Author: <input
          value={author}
          onChange={handleAuthorChange}
        />
        <br/>
        Url: <input
          value={url}
          onChange={handleUrlChange}
        />
        <br/>
        <button type="submit">save</button>
      </form>
      <br/>
    </div>  
  )}

  export default BlogForm