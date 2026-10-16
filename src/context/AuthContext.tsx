import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  completedLessons: string[];
  toggleLesson: (lessonId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('laser_course_user');
    const storedProgress = localStorage.getItem('laser_course_progress');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedProgress) setCompletedLessons(JSON.parse(storedProgress));
  }, []);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('laser_course_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem('laser_course_user', JSON.stringify(userData));
      const progress = JSON.parse(localStorage.getItem(`laser_course_progress_${found.id}`) || '[]');
      setCompletedLessons(progress);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem('laser_course_users') || '[]');
    if (users.find((u: any) => u.email === email)) return false;
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem('laser_course_users', JSON.stringify(users));
    
    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem('laser_course_user', JSON.stringify(userData));
    setCompletedLessons([]);
    return true;
  };

  const logout = () => {
    setUser(null);
    setCompletedLessons([]);
    localStorage.removeItem('laser_course_user');
  };

  const toggleLesson = (lessonId: string) => {
    if (!user) return;
    let newProgress: string[];
    if (completedLessons.includes(lessonId)) {
      newProgress = completedLessons.filter(id => id !== lessonId);
    } else {
      newProgress = [...completedLessons, lessonId];
    }
    setCompletedLessons(newProgress);
    localStorage.setItem(`laser_course_progress_${user.id}`, JSON.stringify(newProgress));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, completedLessons, toggleLesson }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
