import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import path from "path";
import { promises as fs } from "fs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Load users data from users.json
        const dataPath = path.join(process.cwd(), "src/data/users.json");
        const data = await fs.readFile(dataPath, "utf8");
        const users = JSON.parse(data);

        // Find user with matching email and password
        const user = users.find(
          (user) => user.email === credentials.email && user.password === credentials.password
        );

        if (user) {
          return user;
        } else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",  // Update to match your current signin page
  },
});
