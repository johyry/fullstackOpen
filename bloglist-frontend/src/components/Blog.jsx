import { useState } from 'react'
import '../index.css'
 

const BlogList = ({ blogs, addLike, deleteBlog, loggedInUser }) => {
  const blogsToShow = blogs.sort((a, b) => b.likes - a.likes)
  return (
    <div>
      {blogsToShow.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} loggedInUser={loggedInUser} />
      )}
    </div>
  )
}

const Blog = ({ blog, addLike, deleteBlog, loggedInUser }) => {
const [visibility, setVisibility] = useState(false)

if (!visibility) {
  return (
    <div className="blogList" >
      <SimpleView blog={blog} /> <button onClick={() => setVisibility(!visibility)}>show</button>
    </div>  
  )
} else {

  return (
    <div className="blogList" >
      <DetailedView deleteBlog={deleteBlog} addLike={addLike} blog={blog} loggedInUser={loggedInUser} /> <button onClick={() => setVisibility(!visibility)}>hide</button>
    </div> 
  )

}
}

const SimpleView = ({ blog }) => (
  <>
    {blog.title} by {blog.author}
  </>  
)

const DetailedView = ({ blog, addLike, deleteBlog, loggedInUser }) => {
  return (
  <div>
    {blog.title}  <br/>
    {blog.author}  <br/>
    {blog.url}  <br/>
    Likes: {blog.likes}  <button onClick={() => addLike(blog)}>like</button> <br/>
    By user: {blog.user.username}<br/>
    {loggedInUser.username === blog.user.username && 
    <div>
      <button onClick={() => deleteBlog(blog)}>delete</button>
      <br/>
    </div>
    } 
  </div>  
)}

export default BlogList