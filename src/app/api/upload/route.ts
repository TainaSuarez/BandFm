import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Nenhum arquivo foi enviado' },
        { status: 400 }
      )
    }

    // Verificar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'audio/mpeg', 'audio/mp3', 'audio/wav']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: 'Tipo de arquivo não suportado. Use imagens (JPG, PNG, GIF, WebP) ou áudio (MP3, WAV)' },
        { status: 400 }
      )
    }

    // Verificar tamanho do arquivo (máximo 50MB)
    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, message: 'Arquivo muito grande. Máximo 50MB' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Determinar pasta baseada no tipo de arquivo
    const isImage = file.type.startsWith('image/')
    const isAudio = file.type.startsWith('audio/')
    
    let folder = 'files'
    if (isImage) folder = 'images'
    if (isAudio) folder = 'audio'

    // Criar nome único para o arquivo
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_') // Sanitizar nome
    const fileName = `${timestamp}-${originalName}`

    // Criar diretório se não existir
    const uploadDir = join(process.cwd(), 'public', 'uploads', folder)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Salvar arquivo
    const filePath = join(uploadDir, fileName)
    await writeFile(filePath, buffer)

    // Retornar URL pública do arquivo
    const publicUrl = `/uploads/${folder}/${fileName}`

    console.log(`File uploaded successfully: ${publicUrl}`)

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
    return NextResponse.json(
      { success: false, message: `Erro ao enviar arquivo: ${error.message}` },
      { status: 500 }
    )
  }
}
