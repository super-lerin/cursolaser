import { courseData, totalLessons } from '../data/courses';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-[128px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-600 rounded-full blur-[128px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-orange-400 text-sm font-medium">Curso Online Completo</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Domine a Gravação a Laser com a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                TTS-55 Pro
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Aprenda do zero ao avançado como usar sua máquina de gravação a laser TwoTrees TTS-55 Pro. 
              Manutenção, gravação em copos, madeira e muito mais!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('register')}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl text-lg font-bold hover:from-orange-600 hover:to-red-700 transition shadow-2xl shadow-orange-500/30 transform hover:scale-105"
              >
                Começar Agora - Grátis
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="px-8 py-4 bg-gray-800 border border-gray-600 text-white rounded-xl text-lg font-medium hover:bg-gray-700 transition"
              >
                Já tenho conta
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-800/50 border-y border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">{courseData.length}</div>
              <div className="text-gray-400 text-sm mt-1">Módulos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">{totalLessons}</div>
              <div className="text-gray-400 text-sm mt-1">Videoaulas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">100%</div>
              <div className="text-gray-400 text-sm mt-1">Gratuito</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">∞</div>
              <div className="text-gray-400 text-sm mt-1">Acesso Vitalício</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Preview */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Conteúdo do Curso</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Organizado em módulos progressivos para você aprender no seu ritmo
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseData.map((module, index) => (
              <div
                key={module.id}
                className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-orange-500/50 transition group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{module.icon}</span>
                  <div>
                    <span className="text-orange-400 text-xs font-medium">MÓDULO {index + 1}</span>
                    <h3 className="text-white font-bold group-hover:text-orange-400 transition">{module.title}</h3>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">{module.description}</p>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <i className="fas fa-play-circle"></i>
                  <span>{module.lessons.length} aula{module.lessons.length > 1 ? 's' : ''}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">O que você vai aprender</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🔧', title: 'Manutenção Completa', desc: 'Aprenda a fazer manutenção e consertar sua TTS-55 Pro em casa' },
              { icon: '🥤', title: 'Gravação em Copos', desc: 'Domine a gravação em copos térmicos Stanley com o acessório rotativo' },
              { icon: '🪵', title: 'Gravação em Madeira', desc: 'Técnicas profissionais de gravação a laser em diversos tipos de madeira' },
              { icon: '💻', title: 'LightBurn', desc: 'Configure e use o software LightBurn para seus projetos' },
              { icon: '⚙️', title: 'Configurações', desc: 'Parâmetros ideais de potência, velocidade e passes para cada material' },
              { icon: '🎨', title: 'Projetos Criativos', desc: 'Crie peças personalizadas para presentear ou vender' },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-3xl flex-shrink-0">{feature.icon}</span>
                <div>
                  <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-orange-600 to-red-700 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pronto para dominar sua TTS-55 Pro?
          </h2>
          <p className="text-orange-100 text-lg mb-8">
            Cadastre-se gratuitamente e comece a aprender agora mesmo!
          </p>
          <button
            onClick={() => onNavigate('register')}
            className="px-8 py-4 bg-white text-orange-600 rounded-xl text-lg font-bold hover:bg-gray-100 transition shadow-2xl transform hover:scale-105"
          >
            Criar Minha Conta Grátis
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⚡</span>
              </div>
              <span className="text-gray-400 text-sm">Curso Gravação a Laser TTS-55 Pro</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.youtube.com/@gravacoesalasertts55pro" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
            <p className="text-gray-500 text-sm">© 2024 Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
