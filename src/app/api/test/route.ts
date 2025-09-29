import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'API está funcionando!',
    timestamp: new Date().toISOString()
  })
}

export async function POST() {
  return NextResponse.json({
    message: 'POST está funcionando!',
    timestamp: new Date().toISOString()
  })
}



