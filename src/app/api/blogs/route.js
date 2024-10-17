import { readJSONFile, writeJSONFile } from '@/utils/fileOperations';
import fs from 'fs';
import path from 'path';

// Helper function to get buffer data from incoming request
async function getBufferData(req) {
  const chunks = [];
  for await (const chunk of req.body) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

// Get all blogs
export async function GET(req) {
  console.log("GET request received at /api/blogs");
  try {
    const blogs = await readJSONFile('blogs.json');
    return new Response(JSON.stringify(blogs), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch blogs' }), { status: 500 });
  }
}

// Create a new blog post
export async function POST(req) {
  try {
    const boundary = req.headers.get('content-type').split('boundary=')[1];
    const buffer = await getBufferData(req);

    // Parsing form data
    const parts = buffer.toString().split(`--${boundary}`);
    let fields = {};
    let files = {};

    parts.forEach(part => {
      const [headers, body] = part.split('\r\n\r\n');
      if (!headers) return;

      if (headers.includes('Content-Disposition: form-data; name="image"')) {
        const contentType = headers.match(/Content-Type: (.+)/);
        const filename = headers.match(/filename="(.+)"/);
        if (contentType && filename) {
          const imagePath = path.join(process.cwd(), 'public', 'uploads', filename[1]);
          fs.writeFileSync(imagePath, Buffer.from(body.trim(), 'binary'));
          files.image = `/uploads/${filename[1]}`;
        }
      } else {
        const nameMatch = headers.match(/name="(.+)"/);
        if (nameMatch) {
          const name = nameMatch[1];
          fields[name] = body.trim();
        }
      }
    });

    const blogs = await readJSONFile('blogs.json');

    const newBlog = {
      id: blogs.length ? blogs[blogs.length - 1].id + 1 : 1,
      title: fields.title,
      content: fields.content,
      tags: fields.tags ? fields.tags.split(',').map(tag => tag.trim()) : [],
      dateCreated: new Date().toISOString(),
      image: files.image,
      authorId: fields.authorId,
    };

    blogs.push(newBlog);
    await writeJSONFile('blogs.json', blogs);

    return new Response(JSON.stringify(newBlog), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return new Response(JSON.stringify({ error: 'Failed to create blog post' }), { status: 500 });
  }
}

// Update a blog post by ID
export async function PUT(req) {
  const url = new URL(req.url);
  const id = parseInt(url.searchParams.get('id'));

  try {
    const boundary = req.headers.get('content-type').split('boundary=')[1];
    const buffer = await getBufferData(req);

    // Parsing form data
    const parts = buffer.toString().split(`--${boundary}`);
    let fields = {};
    let files = {};

    parts.forEach((part) => {
      const [headers, body] = part.split('\r\n\r\n');
      if (!headers) return;

      if (headers.includes('Content-Disposition: form-data; name="image"')) {
        const contentType = headers.match(/Content-Type: (.+)/);
        const filename = headers.match(/filename="(.+)"/);
        if (contentType && filename) {
          const imagePath = path.join(process.cwd(), 'public', 'uploads', filename[1]);
          fs.writeFileSync(imagePath, Buffer.from(body.trim(), 'binary'));
          files.image = `/uploads/${filename[1]}`;
        }
      } else {
        const nameMatch = headers.match(/name="(.+)"/);
        if (nameMatch) {
          const name = nameMatch[1];
          fields[name] = body.trim();
        }
      }
    });

    let blogs = await readJSONFile('blogs.json');
    const index = blogs.findIndex((blog) => blog.id === id);
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
    }

    const updatedBlog = {
      ...blogs[index],
      title: fields.title || blogs[index].title,
      content: fields.content || blogs[index].content,
      tags: fields.tags ? fields.tags.split(',').map((tag) => tag.trim()) : blogs[index].tags,
      image: files.image || blogs[index].image,
    };

    blogs[index] = updatedBlog;
    await writeJSONFile('blogs.json', blogs);

    return new Response(JSON.stringify(updatedBlog), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return new Response(JSON.stringify({ error: 'Failed to update blog post' }), { status: 500 });
  }
}

// Delete a blog post by ID
export async function DELETE(req) {
  const url = new URL(req.url);
  const id = parseInt(url.searchParams.get('id'));

  try {
    let blogs = await readJSONFile('blogs.json');
    blogs = blogs.filter(blog => blog.id !== id);

    await writeJSONFile('blogs.json', blogs);
    return new Response(JSON.stringify({ message: 'Blog deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete blog post' }), { status: 500 });
  }
}
