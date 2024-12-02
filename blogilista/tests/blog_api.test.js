const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('./test_helper')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.blogs)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blogs contain a identifying field named id', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(blog => blog)
    const blog = contents[0]

    assert(blog.hasOwnProperty('id'))
  })

test('blog can be added to db', async () => {
    const blog = {
        title: "Walden",
        author: "Henry David Thoreau",
        url: "www.thoreau.com",
        likes: 100000
    }
    await api.post('/api/blogs').send(blog)
    .expect(201)

    const blogsAtEnd = await testHelper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, testHelper.blogs.length + 1)
})

test('blog can be deleted', async () => {
    const idToBeDeleted = testHelper.blogs[0]._id
    await api.delete(`/api/blogs/${idToBeDeleted}`).expect(204)
    
    const blogsAtEnd = await testHelper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, testHelper.blogs.length - 1)

})

test('blog title can be modified', async () => {
    const blogToBeModified = testHelper.blogs[0]
    blogToBeModified.title = "modified title"
    await api.put(`/api/blogs/${blogToBeModified._id}`).send(blogToBeModified).expect(200)

    const blogsInDb = await testHelper.blogsInDb()
    const titles = blogsInDb.map(blog => blog.title)

    assert(titles.includes("modified title"))
})

test('blog likes can be modified', async () => {
    const blogToBeModified = testHelper.blogs[0]
    const initialLikes = blogToBeModified.likes
    blogToBeModified.likes = blogToBeModified.likes + 1
    const modifieldBlog = await api.put(`/api/blogs/${blogToBeModified._id}`).send(blogToBeModified).expect(200)
    const likesAfterSave = modifieldBlog.body.likes

    assert.strictEqual(initialLikes + 1, likesAfterSave)
})

after(async () => {
  await mongoose.connection.close()
})