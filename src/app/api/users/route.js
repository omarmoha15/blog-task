import { readJSONFile, writeJSONFile } from '@/utils/fileOperations';

// Get all users
export async function GET(req) {
  try {
    const users = await readJSONFile('users.json');
    return new Response(JSON.stringify(users), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
  }
}

// Create a new user
export async function POST(req) {
  try {
    const newUser = await req.json();
    const users = await readJSONFile('users.json');
    
    newUser.id = users.length ? users[users.length - 1].id + 1 : 1; // Assign a new ID
    users.push(newUser);
    
    await writeJSONFile('users.json', users);
    return new Response(JSON.stringify(newUser), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
  }
}

// Update a user by ID
export async function PUT(req) {
  const url = new URL(req.url);
  const id = parseInt(url.searchParams.get('id'));

  try {
    const updatedUser = await req.json();
    let users = await readJSONFile('users.json');
    
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    
    users[index] = { ...users[index], ...updatedUser };
    await writeJSONFile('users.json', users);
    
    return new Response(JSON.stringify(users[index]), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 500 });
  }
}

// Delete a user by ID
export async function DELETE(req) {
  const url = new URL(req.url);
  const id = parseInt(url.searchParams.get('id'));

  try {
    let users = await readJSONFile('users.json');
    users = users.filter(user => user.id !== id);
    
    await writeJSONFile('users.json', users);
    return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete user' }), { status: 500 });
  }
}
