import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { StudentProfileProvider } from './context/StudentProfileContext';
import { router } from './routes';

export default function App() {
  return (
    <AuthProvider>
      <StudentProfileProvider>
        <RouterProvider router={router} />
      </StudentProfileProvider>
    </AuthProvider>
  );
} 