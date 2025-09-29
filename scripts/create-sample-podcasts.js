const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Creating sample podcasts...')

  try {
    const podcasts = [
      {
        titulo: 'Band FM Entrevista - Especial Música Brasileira',
        descricao: 'Neste episódio especial, conversamos com grandes nomes da música brasileira sobre suas carreiras, influências e projetos futuros. Uma conversa descontraída sobre os bastidores da indústria musical nacional.',
        imagem: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', // Sample MP3
        duracao: '45:30',
        ativo: true
      },
      {
        titulo: 'Papo de Rádio - Como Funciona uma Emissora',
        descricao: 'Você já se perguntou como funciona uma rádio por dentro? Neste podcast, mostramos todos os bastidores da Band FM, desde a seleção musical até a programação ao vivo. Conheça o trabalho de nossa equipe!',
        imagem: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', // Sample MP3
        duracao: '32:15',
        ativo: true
      },
      {
        titulo: 'Histórias de Sant\'Ana do Livramento',
        descricao: 'Um mergulho na rica história de nossa cidade. Conversamos com historiadores locais e moradores antigos sobre os acontecimentos que marcaram Sant\'Ana do Livramento ao longo dos anos.',
        imagem: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3', // Sample MP3
        duracao: '28:45',
        ativo: true
      }
    ]

    for (const podcastData of podcasts) {
      const podcast = await prisma.podcast.create({
        data: podcastData
      })
      console.log('Podcast created:', podcast.titulo)
    }

    console.log('✅ Sample podcasts created successfully!')
    console.log('\nPodcasts disponíveis:')
    console.log('- Band FM Entrevista - Especial Música Brasileira (45:30)')
    console.log('- Papo de Rádio - Como Funciona uma Emissora (32:15)')
    console.log('- Histórias de Sant\'Ana do Livramento (28:45)')
    console.log('\nAcesse: http://localhost:3000/podcasts')
    console.log('Admin: http://localhost:3000/admin/podcasts')

  } catch (error) {
    console.error('❌ Error creating sample podcasts:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
