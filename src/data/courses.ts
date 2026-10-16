export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoId: string;
  duration: string;
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export const courseData: Module[] = [
  {
    id: "mod-1",
    title: "Introdução à TTS-55 Pro",
    description: "Conheça sua máquina de gravação a laser TwoTrees TTS-55 Pro e aprenda os fundamentos.",
    icon: "🔧",
    lessons: [
      {
        id: "l-1-1",
        title: "Primeiros Passos com a TTS-55 Pro",
        description: "Primeiro vídeo da série sobre como trabalhar com a TwoTrees TTS-55 Pro. Conheça os componentes básicos e configurações iniciais.",
        videoId: "I5aXe4v0b5M",
        duration: "8:43",
      },
    ],
  },
  {
    id: "mod-2",
    title: "Manutenção e Reparos",
    description: "Aprenda a fazer manutenção e consertar sua gravadora a laser TTS-55 Pro em casa.",
    icon: "🛠️",
    lessons: [
      {
        id: "l-2-1",
        title: "Troca da Placa Mãe - Instalação",
        description: "Segundo vídeo da série: como trocar a placa mãe da TTS-55 Pro e instalar as correias Y1 e Y2.",
        videoId: "qqr4IHuAn4s",
        duration: "26:22",
      },
      {
        id: "l-2-2",
        title: "Instalando e Ajustando Y1/Y2",
        description: "Terceiro vídeo da série: instalando e ajustando os motores Y1/Y2 da sua gravadora.",
        videoId: "9brEJmMoB_g",
        duration: "1:02:33",
      },
      {
        id: "l-2-3",
        title: "Finalizando o Reparo da TTS-55 Pro",
        description: "Quarto e último vídeo da série: como finalizar o conserto da sua gravadora a laser em casa.",
        videoId: "BoOFGlYVJHg",
        duration: "23:41",
      },
    ],
  },
  {
    id: "mod-3",
    title: "Gravação em Copos Térmicos",
    description: "Aprenda a gravar em copos térmicos Stanley e similares usando o acessório rotativo.",
    icon: "🥤",
    lessons: [
      {
        id: "l-3-1",
        title: "Gravação em Copo Stanley - Setup Completo",
        description: "Como fazer gravação a laser em copo térmico Stanley usando o chuck e o LightBurn.",
        videoId: "pLEkCJjY7fI",
        duration: "25:28",
      },
      {
        id: "l-3-2",
        title: "Gravação Completa em Copo Térmico - Ao Vivo",
        description: "Setup completo ao vivo para gravação a laser em copo térmico na TTS-55 Pro.",
        videoId: "-Z_kiGDiVZI",
        duration: "28:02",
      },
    ],
  },
  {
    id: "mod-4",
    title: "Gravação em Madeira",
    description: "Técnicas de gravação a laser em madeira com a TTS-55 Pro.",
    icon: "🪵",
    lessons: [
      {
        id: "l-4-1",
        title: "Gravação em Madeira - Parte 1",
        description: "Início da gravação em madeira com a TTS-55 Pro. Configurações e preparação do material.",
        videoId: "XBlCW1InhcA",
        duration: "Short",
      },
      {
        id: "l-4-2",
        title: "Gravação em Madeira - Parte 2 (Final)",
        description: "Finalização da gravação em madeira. Resultados e acabamento.",
        videoId: "6CSwT3N2TnA",
        duration: "Short",
      },
      {
        id: "l-4-3",
        title: "Gravação One Piece em Madeira",
        description: "Gravação temática One Piece em madeira usando a TTS-55 Pro.",
        videoId: "qxX2Zbw8iM0",
        duration: "Short",
      },
    ],
  },
  {
    id: "mod-5",
    title: "Projetos Especiais",
    description: "Projetos criativos e personalizados com gravação a laser.",
    icon: "✨",
    lessons: [
      {
        id: "l-5-1",
        title: "Garrafa para Casal",
        description: "Gravação especial de garrafa para casal com gravação a laser na TTS-55 Pro.",
        videoId: "ncDdfpRvSK0",
        duration: "Short",
      },
      {
        id: "l-5-2",
        title: "Post no Canal com Seus Vídeos",
        description: "Como criar um post no canal do YouTube usando seus próprios vídeos de gravação.",
        videoId: "OJeyuB_zCUU",
        duration: "Tutorial",
      },
    ],
  },
];

export const totalLessons = courseData.reduce((acc, mod) => acc + mod.lessons.length, 0);
