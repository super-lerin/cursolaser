import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-orange-500/30 sticky top-0 z-50 backdrop-blur-sm bg-gray-900/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate(user ? 'dashboard' : 'home')}>
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">Laser TTS-55 Pro</h1>
              <p className="text-orange-400 text-xs">Curso Completo</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    currentPage === 'dashboard' ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <i className="fas fa-home mr-2"></i>Meu Curso
                </button>
                <button
                  onClick={() => onNavigate('profile')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    currentPage === 'profile' ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <i className="fas fa-user mr-2"></i>Perfil
                </button>
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-700">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{user.name[0].toUpperCase()}</span>
                  </div>
                  <span className="text-gray-300 text-sm hidden sm:block">{user.name}</span>
                  <button
                    onClick={logout}
                    className="text-gray-400 hover:text-red-400 transition ml-2"
                    title="Sair"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('login')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    currentPage === 'login' ? 'text-orange-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  Entrar
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-700 transition shadow-lg shadow-orange-500/25"
                >
                  Cadastrar Grátis
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
