import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import LessonPlayer from './components/LessonPlayer';
import ProfilePage from './components/ProfilePage';

function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  // Redirect to dashboard if user is logged in and on auth pages
  useEffect(() => {
    if (user && (currentPage === 'login' || currentPage === 'register')) {
      setCurrentPage('dashboard');
    }
    if (!user && (currentPage === 'dashboard' || currentPage === 'lesson' || currentPage === 'profile')) {
      setCurrentPage('home');
    }
  }, [user, currentPage]);

  const handleNavigate = (page: string, lessonId?: string) => {
    setCurrentPage(page);
    if (lessonId) setCurrentLessonId(lessonId);
    window.scrollTo(0, 0);
  };

  const showNavbar = currentPage !== 'login' && currentPage !== 'register';

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'lesson':
        return currentLessonId ? (
          <LessonPlayer lessonId={currentLessonId} onNavigate={handleNavigate} />
        ) : (
          <Dashboard onNavigate={handleNavigate} />
        );
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {showNavbar && <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}
      {renderPage()}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
