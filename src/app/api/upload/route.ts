import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Configuración para Next.js 15
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    console.log('Upload request received')
    
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      console.error('No file in request')
      return NextResponse.json(
        { success: false, message: 'Nenhum arquivo foi enviado' },
        { status: 400 }
      )
    }

    console.log('File received:', {
      name: file.name,
      type: file.type,
      size: file.size
    })

    // Verificar tipo de arquivo
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'audio/mpeg', 'audio/mp3', 'audio/wav',
      'video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/avi'
    ]
    
    if (!allowedTypes.includes(file.type)) {
      console.error('Invalid file type:', file.type)
      return NextResponse.json(
        { success: false, message: 'Tipo de arquivo não suportado. Use imagens (JPG, PNG, GIF, WebP), áudio (MP3, WAV) ou vídeos (MP4, WebM, MOV, AVI)' },
        { status: 400 }
      )
    }

    // Verificar tamanho do arquivo (máximo 100MB para vídeos, 50MB para outros)
    const isVideo = file.type.startsWith('video/')
    const maxSize = isVideo ? 100 * 1024 * 1024 : 50 * 1024 * 1024 // 100MB para vídeos, 50MB para outros
    
    if (file.size > maxSize) {
      console.error('File too large:', file.size)
      return NextResponse.json(
        { success: false, message: `Arquivo muito grande. Máximo ${isVideo ? '100MB' : '50MB'}` },
        { status: 400 }
      )
    }

    console.log('Converting file to buffer...')
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log('Buffer created, size:', buffer.length)

    // Determinar pasta baseada no tipo de arquivo
    const isImage = file.type.startsWith('image/')
    const isAudio = file.type.startsWith('audio/')
    
    let folder = 'files'
    if (isImage) folder = 'images'
    if (isAudio) folder = 'audio'
    if (isVideo) folder = 'videos'

    console.log('Upload folder:', folder)

    // Crear nome único para o arquivo
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_') // Sanitizar nome
    const fileName = `${timestamp}-${originalName}`

    console.log('Generated filename:', fileName)

    // Crear diretório se não existir
    const uploadDir = join(process.cwd(), 'public', 'uploads', folder)
    console.log('Upload directory:', uploadDir)
    
    if (!existsSync(uploadDir)) {
      console.log('Creating directory...')
      await mkdir(uploadDir, { recursive: true })
      console.log('Directory created')
    }

    // Salvar arquivo
    const filePath = join(uploadDir, fileName)
    console.log('Saving file to:', filePath)
    
    await writeFile(filePath, buffer)
    console.log('File saved successfully')

    // Retornar URL pública do arquivo
    const publicUrl = `/uploads/${folder}/${fileName}`
    console.log('Public URL:', publicUrl)

    return NextResponse.json({
      success: true,
      message: 'Arquivo enviado com sucesso',
      url: publicUrl,
      filename: fileName,
      size: file.size,
      type: file.type
    })

  } catch (error: any) {
    console.error('Error uploading file:', error)
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      { success: false, message: `Erro ao enviar arquivo: ${error.message || 'Erro desconhecido'}` },
      { status: 500 }
    )
  }
}
