import { useState, useEffect } from 'react';
import { courseData, Lesson } from '../data/courses';
import { useAuth } from '../context/AuthContext';

interface LessonPlayerProps {
  lessonId: string;
  onNavigate: (page: string, lessonId?: string) => void;
}

function findLesson(lessonId: string): { lesson: Lesson; moduleIndex: number; lessonIndex: number } | null {
  for (let mi = 0; mi < courseData.length; mi++) {
    for (let li = 0; li < courseData[mi].lessons.length; li++) {
      if (courseData[mi].lessons[li].id === lessonId) {
        return { lesson: courseData[mi].lessons[li], moduleIndex: mi, lessonIndex: li };
      }
    }
  }
  return null;
}

function getAdjacentLessons(currentId: string): { prev: Lesson | null; next: Lesson | null } {
  const allLessons: Lesson[] = [];
  courseData.forEach(mod => mod.lessons.forEach(l => allLessons.push(l)));
  const idx = allLessons.findIndex(l => l.id === currentId);
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  };
}

export default function LessonPlayer({ lessonId, onNavigate }: LessonPlayerProps) {
  const { completedLessons, toggleLesson } = useAuth();
  const [showSidebar, setShowSidebar] = useState(false);
  const result = findLesson(lessonId);
  const adjacent = getAdjacentLessons(lessonId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [lessonId]);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Aula não encontrada</p>
          <button onClick={() => onNavigate('dashboard')} className="mt-4 text-orange-400 hover:text-orange-300">
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  const { lesson, moduleIndex } = result;
  const isCompleted = completedLessons.includes(lesson.id);
  const currentModule = courseData[moduleIndex];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6">
          <button onClick={() => onNavigate('dashboard')} className="text-gray-400 hover:text-orange-400 transition">
            <i className="fas fa-arrow-left mr-1"></i> Meu Curso
          </button>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400">{currentModule.icon} {currentModule.title}</span>
          <span className="text-gray-600">/</span>
          <span className="text-orange-400 truncate">{lesson.title}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Video Player */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl mb-6">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${lesson.videoId}?rel=0`}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Lesson Info */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-orange-400 text-xs font-medium">
                    MÓDULO {moduleIndex + 1} • AULA {result.lessonIndex + 1}
                  </span>
                  <h1 className="text-xl md:text-2xl font-bold text-white mt-1">{lesson.title}</h1>
                </div>
                <span className="text-gray-400 text-sm flex items-center gap-2">
                  <i className="fas fa-clock"></i> {lesson.duration}
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed">{lesson.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <button
                onClick={() => toggleLesson(lesson.id)}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                  isCompleted
                    ? 'bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30'
                    : 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 shadow-lg shadow-orange-500/25'
                }`}
              >
                {isCompleted ? (
                  <>
                    <i className="fas fa-check-circle"></i> Aula Concluída
                  </>
                ) : (
                  <>
                    <i className="far fa-circle"></i> Marcar como Concluída
                  </>
                )}
              </button>

              <a
                href={`https://www.youtube.com/watch?v=${lesson.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-700 border border-gray-600 text-gray-300 rounded-xl font-medium hover:bg-gray-600 transition flex items-center justify-center gap-2"
              >
                <i className="fab fa-youtube text-red-500"></i> Abrir no YouTube
              </a>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              {adjacent.prev ? (
                <button
                  onClick={() => onNavigate('lesson', adjacent.prev!.id)}
                  className="flex items-center gap-3 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl hover:border-orange-500/50 transition group flex-1"
                >
                  <i className="fas fa-chevron-left text-gray-500 group-hover:text-orange-400 transition"></i>
                  <div className="text-left min-w-0">
                    <span className="text-gray-500 text-xs">Aula Anterior</span>
                    <p className="text-white text-sm truncate group-hover:text-orange-400 transition">{adjacent.prev.title}</p>
                  </div>
                </button>
              ) : <div className="flex-1"></div>}
              
              {adjacent.next ? (
                <button
                  onClick={() => onNavigate('lesson', adjacent.next!.id)}
                  className="flex items-center gap-3 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl hover:border-orange-500/50 transition group flex-1 justify-end"
                >
                  <div className="text-right min-w-0">
                    <span className="text-gray-500 text-xs">Próxima Aula</span>
                    <p className="text-white text-sm truncate group-hover:text-orange-400 transition">{adjacent.next.title}</p>
                  </div>
                  <i className="fas fa-chevron-right text-gray-500 group-hover:text-orange-400 transition"></i>
                </button>
              ) : <div className="flex-1"></div>}
            </div>
          </div>

          {/* Sidebar - Lesson List */}
          <div className={`lg:w-80 flex-shrink-0 ${showSidebar ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden sticky top-20">
              <div className="p-4 border-b border-gray-700">
                <h3 className="text-white font-bold text-sm">
                  <i className="fas fa-list text-orange-400 mr-2"></i>
                  Conteúdo do Módulo
                </h3>
              </div>
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {courseData.map((mod, mi) => (
                  <div key={mod.id}>
                    <div className={`px-4 py-3 border-b border-gray-700/50 ${mi === moduleIndex ? 'bg-orange-500/10' : ''}`}>
                      <span className="text-xs text-gray-500">MÓDULO {mi + 1}</span>
                      <p className={`text-sm font-medium ${mi === moduleIndex ? 'text-orange-400' : 'text-gray-300'}`}>
                        {mod.icon} {mod.title}
                      </p>
                    </div>
                    {mod.lessons.map((l, li) => (
                      <button
                        key={l.id}
                        onClick={() => onNavigate('lesson', l.id)}
                        className={`w-full text-left px-4 py-3 flex items-center gap-3 border-b border-gray-700/30 hover:bg-gray-700/50 transition ${
                          l.id === lessonId ? 'bg-orange-500/10 border-l-2 border-l-orange-500' : ''
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                          completedLessons.includes(l.id)
                            ? 'bg-green-500/20 text-green-400'
                            : l.id === lessonId
                            ? 'bg-orange-500/20 text-orange-400'
                            : 'bg-gray-700 text-gray-500'
                        }`}>
                          {completedLessons.includes(l.id) ? (
                            <i className="fas fa-check text-[10px]"></i>
                          ) : (
                            <span>{li + 1}</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm truncate ${
                            l.id === lessonId ? 'text-orange-400 font-medium' : 'text-gray-300'
                          }`}>
                            {l.title}
                          </p>
                          <span className="text-gray-500 text-xs">{l.duration}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-2xl flex items-center justify-center text-white z-50"
        >
          <i className={`fas ${showSidebar ? 'fa-times' : 'fa-list'}`}></i>
        </button>
      </div>
    </div>
  );
}
