"use client";

import { signIn, useSession, getCsrfToken } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useThemeLanguage } from '@/app/context/ThemeLanguageContext';
import { useTranslation } from 'next-i18next';
import { FiSun, FiMoon, FiFlag } from 'react-icons/fi';

export default function SignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [csrfToken, setCsrfToken] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { theme, toggleTheme, language, toggleLanguage } = useThemeLanguage();
  const { t } = useTranslation('common');

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token);
    };
    fetchCsrfToken();
  }, []);

  // Redirect to homepage if the user is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); // Redirect to homepage
    }
  }, [status, router]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
      callbackUrl: "/",
    });

    if (result?.ok) {
      router.push("/");
    } else {
      alert(t('sign_in_failed'));
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center ${theme} ${language === 'ar' ? 'rtl' : 'ltr'}`}
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : '#000000',
        color: theme === 'light' ? '#000000' : '#ffffff',
        direction: language === 'ar' ? 'rtl' : 'ltr'
      }}
    >
      {/* Language and Theme Buttons at the Top */}
      <div className="flex justify-end w-full p-4 space-x-4">
        <button
          onClick={toggleLanguage}
          className="p-3 rounded-full shadow-md hover:opacity-80 transition-colors flex items-center justify-center"
          style={{ backgroundColor: theme === 'light' ? '#007acc' : '#334155', color: '#ffffff' }}
        >
          {language === 'en' ? <FiFlag size={20} title="Arabic" /> : <FiFlag size={20} title="English" />}
        </button>
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full shadow-md hover:opacity-80 transition-colors flex items-center justify-center"
          style={{ backgroundColor: theme === 'light' ? '#007acc' : '#334155', color: '#ffffff' }}
        >
          {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>
      </div>

      <div className="relative w-96 h-auto bg-gray-800 dark:bg-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-center p-8">
        <h1 className="text-xl font-light mb-6">{t('member_login')}</h1>
        <form className="w-full" onSubmit={handleSignIn}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="mb-4">
            <input
              type="text"
              placeholder={t('username_placeholder')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={`w-full p-3 rounded ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300`}
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder={t('password_placeholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full p-3 rounded ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300`}
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white text-lg font-medium p-4 rounded-full shadow-md hover:bg-red-600 transition-colors"
          >
            {t('login_button')}
          </button>
        </form>
      </div>
    </div>
  );
}
