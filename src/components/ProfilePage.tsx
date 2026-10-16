import { useAuth } from '../context/AuthContext';
import { courseData, totalLessons } from '../data/courses';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const { user, completedLessons, logout } = useAuth();

  if (!user) return null;

  const progress = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;
  const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : 'N/A';

  // Calculate stats
  const modulesStarted = new Set(
    courseData
      .filter(mod => mod.lessons.some(l => completedLessons.includes(l.id)))
      .map(mod => mod.id)
  ).size;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Profile Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-orange-600 to-red-700 relative">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-4 left-10 w-20 h-20 bg-white rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 right-20 w-32 h-32 bg-yellow-300 rounded-full blur-3xl"></div>
            </div>
          </div>
          <div className="px-6 pb-6 -mt-12">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center border-4 border-gray-800 shadow-xl mb-4">
              <span className="text-white text-3xl font-bold">{user.name[0].toUpperCase()}</span>
            </div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-gray-400">{user.email}</p>
            <p className="text-gray-500 text-sm mt-1">
              <i className="fas fa-calendar-alt mr-1"></i> Membro desde {joinDate}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-orange-400">{completedLessons.length}</div>
            <div className="text-gray-400 text-sm mt-1">Aulas Concluídas</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-orange-400">{totalLessons}</div>
            <div className="text-gray-400 text-sm mt-1">Total de Aulas</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-orange-400">{progress}%</div>
            <div className="text-gray-400 text-sm mt-1">Progresso</div>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-orange-400">{modulesStarted}</div>
            <div className="text-gray-400 text-sm mt-1">Módulos Iniciados</div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">
            <i className="fas fa-chart-line text-orange-400 mr-2"></i>
            Progresso por Módulo
          </h2>
          <div className="space-y-4">
            {courseData.map((mod, i) => {
              const modCompleted = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
              const modProgress = mod.lessons.length > 0 ? Math.round((modCompleted / mod.lessons.length) * 100) : 0;
              return (
                <div key={mod.id}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-300">{mod.icon} {mod.title}</span>
                    <span className="text-gray-500">{modCompleted}/{mod.lessons.length}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        modProgress === 100 ? 'bg-green-500' : 'bg-gradient-to-r from-orange-500 to-red-500'
                      }`}
                      style={{ width: `${modProgress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-bold text-white mb-4">
            <i className="fas fa-trophy text-orange-400 mr-2"></i>
            Conquistas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🎯', title: 'Primeira Aula', desc: 'Complete sua primeira aula', unlocked: completedLessons.length >= 1 },
              { icon: '🔥', title: 'Em Chamas', desc: 'Complete 5 aulas', unlocked: completedLessons.length >= 5 },
              { icon: '⭐', title: 'Dedicado', desc: 'Complete 10 aulas', unlocked: completedLessons.length >= 10 },
              { icon: '🏆', title: 'Mestre Laser', desc: 'Complete todo o curso', unlocked: completedLessons.length >= totalLessons },
            ].map((achievement, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl text-center border transition ${
                  achievement.unlocked
                    ? 'bg-orange-500/10 border-orange-500/30'
                    : 'bg-gray-700/30 border-gray-700 opacity-50'
                }`}
              >
                <span className="text-3xl">{achievement.icon}</span>
                <p className={`text-sm font-medium mt-2 ${achievement.unlocked ? 'text-orange-400' : 'text-gray-500'}`}>
                  {achievement.title}
                </p>
                <p className="text-gray-500 text-xs mt-1">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold hover:from-orange-600 hover:to-red-700 transition shadow-lg shadow-orange-500/25"
          >
            <i className="fas fa-play mr-2"></i> Continuar Estudando
          </button>
          <button
            onClick={() => { logout(); onNavigate('home'); }}
            className="px-6 py-3 bg-gray-700 border border-gray-600 text-gray-300 rounded-xl font-medium hover:bg-gray-600 transition"
          >
            <i className="fas fa-sign-out-alt mr-2"></i> Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
}
