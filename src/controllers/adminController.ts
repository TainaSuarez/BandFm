import { db } from '@/lib/db'
import { hashPassword, verifyPassword } from '@/lib/auth'
import { Admin, LoginData } from '@/types'

export class AdminController {
  static async login(loginData: LoginData): Promise<Admin | null> {
    try {
      const admin = await db.admin.findUnique({
        where: { email: loginData.email }
      })

      if (!admin) {
        return null
      }

      const isValidPassword = await verifyPassword(loginData.password, admin.password)
      if (!isValidPassword) {
        return null
      }

      return admin
    } catch (error) {
      console.error('Error in admin login:', error)
      return null
    }
  }

  static async createAdmin(email: string, password: string): Promise<Admin | null> {
    try {
      const hashedPassword = await hashPassword(password)
      
      const admin = await db.admin.create({
        data: {
          email,
          password: hashedPassword
        }
      })

      return admin
    } catch (error) {
      console.error('Error creating admin:', error)
      return null
    }
  }

  static async getAdminByEmail(email: string): Promise<Admin | null> {
    try {
      return await db.admin.findUnique({
        where: { email }
      })
    } catch (error) {
      console.error('Error getting admin:', error)
      return null
    }
  }
}



