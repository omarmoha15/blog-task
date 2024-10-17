Multi-Language Blog Platform

This project is a multi-language blog platform built using Next.js. It allows users to create, edit, and manage blog posts with features including user authentication, theme customization, and language support. Below is an overview of the core functionalities:
Features

    Blog Management: Users can create, edit, view, and delete blog posts. Each post includes a title, content, tags, and an optional image. Blog details are shown in a user-friendly, animated modal.

    Multi-Language Support: The platform supports English (LTR) and Arabic (RTL) languages, and provides a language switcher that allows users to toggle between languages. All content and UI elements adjust dynamically according to the selected language.

    User Authentication: User authentication is implemented using NextAuth.js with credentials provider. Users can sign in, and once authenticated, manage their own blog posts.
        Login credentials for testing:
            Username: user1
            Password: password1

    Theme Customization: The application supports both light and dark themes, which users can toggle between. The selected theme is stored in local storage, providing a consistent user experience across sessions.

    Responsive UI/UX: The UI is designed to be responsive and user-friendly, ensuring that the platform is easily accessible from both mobile and desktop devices.

    Deployment: The application is ready to be deployed on Vercel, with environment configurations for production and development.

Project Structure

arduino

blogs-project/
├── next-i18next.config.mjs
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.js
│   │   │   ├── blogs/
│   │   │   │   └── route.js
│   │   │   └── users/
│   │   │       └── route.js
│   │   ├── auth/
│   │   │   ├── signin/
│   │   │   │   └── page.js
│   │   │   └── [...nextauth].js
│   │   ├── blog-control/
│   │   │   └── create/page.js
│   │   ├── profile/
│   │   │   └── page.js
│   │   ├── components/
│   │   │   ├── AuthButtons.js
│   │   │   ├── BlogCard.js
│   │   │   └── BlogDetailModal.js
│   │   ├── context/
│   │   │   └── ThemeLanguageContext.js
│   │   ├── layout.js
│   │   └── globals.css
│   ├── data/
│   │   ├── blogs.json
│   │   └── users.json
│   ├── i18n.js
│   ├── utils/
│   │   └── fileOperations.js
│   └── public/
│       └── locales/
│           ├── ar/
│           │   └── common.json
│           └── en/
│               └── common.json
└── public/
    ├── uploads/
    │   ├── ai_revolution.jpg
    │   ├── climate.jpg
    │   ├── autonomous.jpg
    │   ├── gaming.jpg
    │   ├── jobs.jpg
    │   └── customer_service.jpg
    └── favicon.ico

Running the Project Locally

To run this project locally, follow these steps:

    Clone the repository:

    bash

git clone <repository-url>
cd <repository-directory>

Install dependencies:

npm install

Set up environment variables:

    Create a .env.local file in the root of your project and add the following environment variables:

    makefile

    NEXTAUTH_SECRET=<your_secret_key>
    NEXTAUTH_URL=http://localhost:3000

    Replace <your_secret_key> with a secure secret key.

Run the development server:

arduino

    npm run dev

    Access the application:
        Open your browser and go to http://localhost:3000.

This project showcases core skills in front-end web development, including managing themes, language, authentication, and a full CRUD system for blog posts. It also emphasizes a clean, modular approach to code and a focus on responsive, accessible design.