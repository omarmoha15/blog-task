import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import path from 'path';
import { promises as fs } from 'fs';

export const readJSONFile = async (filename) => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
};

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Read users from users.json
          const users = await readJSONFile('users.json');

          console.log("Incoming credentials:", credentials);
          console.log("Loaded users:", users);

          // Find the user that matches the provided credentials
          const user = users.find(
            (user) =>
              user.username === credentials.username &&
              user.password === credentials.password
          );

          // If user is found, return the user object
          if (user) {
            console.log("User authenticated successfully:", user);
            return { id: user.id, name: user.username, email: user.email };
          } else {
            console.log("Invalid credentials provided.");
            return null;
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  secret: 'YOUR_SECRET_KEY'  // Replace this with a secure secret key
};

// Export NextAuth directly for handling all requests
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
