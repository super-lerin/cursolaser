import { courseData, totalLessons } from '../data/courses';
import { useAuth } from '../context/AuthContext';

interface DashboardProps {
  onNavigate: (page: string, lessonId?: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { user, completedLessons } = useAuth();
  const progress = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Olá, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-400 mt-1">Continue de onde parou no seu curso</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">{completedLessons.length}</div>
                <div className="text-gray-500 text-xs">Aulas concluídas</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">{progress}%</div>
                <div className="text-gray-500 text-xs">Progresso</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-400">Progresso geral do curso</span>
              <span className="text-orange-400 font-medium">{completedLessons.length}/{totalLessons} aulas</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-xl font-bold text-white mb-6">
          <i className="fas fa-book-open text-orange-400 mr-2"></i>
          Módulos do Curso
        </h2>

        <div className="space-y-6">
          {courseData.map((module, modIndex) => {
            const moduleCompleted = module.lessons.filter(l => completedLessons.includes(l.id)).length;
            const moduleProgress = module.lessons.length > 0 ? Math.round((moduleCompleted / module.lessons.length) * 100) : 0;

            return (
              <div key={module.id} className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">
                {/* Module Header */}
                <div className="p-6 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 rounded-xl flex items-center justify-center">
                        <span className="text-2xl">{module.icon}</span>
                      </div>
                      <div>
                        <span className="text-orange-400 text-xs font-medium">MÓDULO {modIndex + 1}</span>
                        <h3 className="text-white font-bold text-lg">{module.title}</h3>
                        <p className="text-gray-400 text-sm">{module.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                      <span className="text-gray-400 text-sm">{moduleCompleted}/{module.lessons.length}</span>
                      <div className="w-24 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all"
                          style={{ width: `${moduleProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lessons */}
                <div className="divide-y divide-gray-700/50">
                  {module.lessons.map((lesson, lessonIndex) => {
                    const isCompleted = completedLessons.includes(lesson.id);
                    return (
                      <div
                        key={lesson.id}
                        className={`p-4 md:p-5 flex items-center gap-4 hover:bg-gray-700/30 transition cursor-pointer group ${
                          isCompleted ? 'bg-green-500/5' : ''
                        }`}
                        onClick={() => onNavigate('lesson', lesson.id)}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted
                            ? 'bg-green-500/20 border border-green-500/30'
                            : 'bg-gray-700 border border-gray-600 group-hover:border-orange-500/50'
                        }`}>
                          {isCompleted ? (
                            <i className="fas fa-check text-green-400 text-sm"></i>
                          ) : (
                            <span className="text-gray-400 text-sm font-medium">{lessonIndex + 1}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-medium truncate ${isCompleted ? 'text-green-300' : 'text-white group-hover:text-orange-400'} transition`}>
                            {lesson.title}
                          </h4>
                          <p className="text-gray-500 text-sm truncate">{lesson.description}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-gray-500 text-sm hidden sm:block">
                            <i className="fas fa-clock mr-1"></i>{lesson.duration}
                          </span>
                          <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center group-hover:bg-orange-500/20 transition">
                            <i className="fas fa-play text-orange-400 text-xs"></i>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
