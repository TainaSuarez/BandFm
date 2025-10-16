export interface Admin {
  id: string
  email: string
  password: string
  nome: string
  isMaster: boolean
  ativo: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Empresa {
  id: string
  nome: string
  foto?: string
  email: string
  senha: string
  descricao: string
  categoria: string
  createdAt: Date
  updatedAt: Date
}

export interface Noticia {
  id: string
  titulo: string
  imagem?: string
  descricao: string
  fonte: string
  createdAt: Date
  updatedAt: Date
}

export interface Promocao {
  id: string
  titulo: string
  descricao: string
  imagem?: string
  createdAt: Date
  updatedAt: Date
}

export interface ProgramacaoRadio {
  id: string
  diasSemana: string
  horarios: string
  nomePrograma: string
  nomeApresentador: string
  createdAt: Date
  updatedAt: Date
}

export interface Banner {
  id: string
  titulo: string
  imagem: string
  link?: string
  ativo: boolean
  ordem: number
  createdAt: Date
  updatedAt: Date
}

export interface Produto {
  id: string
  nome: string
  descricao: string
  imagem: string
  preco: number
  ativo: boolean
  empresaId: string
  empresa?: Empresa
  createdAt: Date
  updatedAt: Date
}

export interface Podcast {
  id: string
  titulo: string
  descricao: string
  imagem: string
  audioUrl: string
  ativo: boolean
  duracao?: string
  createdAt: Date
  updatedAt: Date
}

export interface LoginData {
  email: string
  password: string
}

export interface EnqueteMusicaVoto {
  id: string
  genero: string
  ipAddress?: string
  createdAt: Date
}

export interface EnqueteResultado {
  genero: string
  votos: number
  porcentagem: number
}

export interface GaleriaItem {
  id: string
  tipo: 'foto' | 'video'
  url: string
  legenda: string
  ativo: boolean
  ordem: number
  createdAt: Date
  updatedAt: Date
}
