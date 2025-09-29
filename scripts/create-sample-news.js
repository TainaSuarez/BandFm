const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const noticiasExemplo = [
  {
    titulo: "Band FM celebra 5 anos no ar com programação especial",
    imagem: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=400&fit=crop",
    descricao: "A rádio Band FM comemora cinco anos de transmissão com uma programação especial repleta de música, entrevistas e surpresas para os ouvintes. Durante toda a semana, teremos convidados especiais e muitas promoções.",
    fonte: "https://example.com/noticia-1"
  },
  {
    titulo: "Nova programação musical estreia na próxima semana",
    imagem: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop",
    descricao: "A Band FM apresenta sua nova grade de programação com shows musicais inéditos, podcasts exclusivos e muito mais entretenimento para todos os gostos musicais.",
    fonte: "https://example.com/noticia-2"
  },
  {
    titulo: "Entrevista exclusiva com artistas locais",
    imagem: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=400&fit=crop",
    descricao: "Confira nossa entrevista exclusiva com os principais artistas da região. Eles falam sobre seus novos projetos, inspirações e o cenário musical atual.",
    fonte: "https://example.com/noticia-3"
  },
  {
    titulo: "Band FM promove concurso de talentos musicais",
    imagem: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
    descricao: "Inscrições abertas para o grande concurso de talentos da Band FM. Participe e mostre seu talento musical para toda a cidade. Prêmios incríveis aguardam os vencedores!",
    fonte: "https://example.com/noticia-4"
  },
  {
    titulo: "Cobertura especial dos eventos culturais da cidade",
    imagem: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=400&fit=crop",
    descricao: "A Band FM está presente nos principais eventos culturais da cidade, trazendo cobertura ao vivo e entrevistas exclusivas com os organizadores e participantes.",
    fonte: "https://example.com/noticia-5"
  },
  {
    titulo: "Parceria com escolas de música da região",
    imagem: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&h=400&fit=crop",
    descricao: "A rádio firmou parceria com as principais escolas de música da região para promover a educação musical e descobrir novos talentos locais.",
    fonte: "https://example.com/noticia-6"
  }
]

async function main() {
  try {
    console.log('Criando notícias de exemplo...')
    
    for (const noticia of noticiasExemplo) {
      await prisma.noticia.create({
        data: noticia
      })
      console.log(`✅ Criada: ${noticia.titulo}`)
    }
    
    console.log(`\n🎉 ${noticiasExemplo.length} notícias criadas com sucesso!`)
  } catch (error) {
    console.error('❌ Erro ao criar notícias:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()



