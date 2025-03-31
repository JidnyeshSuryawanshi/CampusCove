import { useEffect, useState } from 'react';

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('dark-mode') === 'true';
    setIsDark(savedMode);
    document.documentElement.classList.toggle('dark', savedMode);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark', !isDark);
    localStorage.setItem('dark-mode', !isDark);
  };

  return (
    <button onClick={toggleDarkMode} className="p-2 bg-gray-200 dark:bg-gray-700 rounded">
      {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}

export default DarkModeToggle;
