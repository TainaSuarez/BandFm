# 🔐 Sistema de Administradores - Band FM

## 📋 Descripción

El sistema de administradores cuenta con una jerarquía de permisos:

- **Admin Master** 🔒: Tiene control total, puede crear, editar y eliminar otros administradores
- **Admin Normal** 👤: Puede acceder al panel administrativo pero NO puede gestionar otros admins

## 🔑 Reglas Importantes

### ✅ Lo que el Admin Master PUEDE hacer:
- ✅ Crear nuevos administradores
- ✅ Editar cualquier administrador (excepto otros masters)
- ✅ Eliminar administradores normales
- ✅ Activar/Desactivar administradores
- ✅ Editar su propia información

### ❌ Lo que NADIE puede hacer:
- ❌ Eliminar un Admin Master
- ❌ Editar un Admin Master (excepto él mismo)
- ❌ Convertir un admin normal en Master (solo por base de datos)
- ❌ Un admin normal NO puede acceder a la gestión de administradores

## 🚀 Configuración Inicial

### 1. El administrador master ya está configurado:
```
Email: admin@bandfm.com
Master: ✅ Sí
```

### 2. Para agregar el primer admin master manualmente (si es necesario):

```bash
# Ejecutar el script de configuración
node src/scripts/setup-master.js
```

Este script convierte el primer administrador en Master automáticamente.

### 3. Para convertir un admin específico en Master (usando el script TypeScript):

```bash
npx ts-node src/scripts/set-master-admin.ts admin@example.com
```

## 📱 Uso del Sistema

### Acceder a la Gestión de Admins:

1. Iniciar sesión como **Admin Master**
2. En el panel lateral, ir a **👥 Administradores**
3. Desde ahí puede:
   - Ver todos los administradores
   - Crear nuevos admins
   - Editar admins existentes
   - Activar/Desactivar admins
   - Eliminar admins normales

### Crear Nuevo Administrador:

1. Click en **"+ Novo Administrador"**
2. Llenar el formulario:
   - **Nome**: Nombre del administrador
   - **Email**: Email único
   - **Senha**: Contraseña segura
   - **Ativo**: Marcar para activar
3. Click en **"Criar Administrador"**

### Editar Administrador:

1. Click en **"Editar"** en la fila del admin
2. Modificar los datos necesarios
3. Dejar la contraseña vacía para NO cambiarla
4. Click en **"Salvar Alterações"**

### Eliminar Administrador:

1. Click en **"Excluir"** en la fila del admin
2. Confirmar la eliminación
3. ⚠️ Solo se pueden eliminar admins normales

## 🔒 Seguridad

- Las contraseñas se almacenan con hash bcrypt
- Los admins inactivos NO pueden iniciar sesión
- El sistema valida permisos en cada operación
- Los Masters están protegidos contra eliminación/edición no autorizada

## 📊 Estructura de la Base de Datos

```prisma
model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  nome      String   @default("Admin")
  isMaster  Boolean  @default(false)
  ativo     Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🛠️ API Endpoints

### GET `/api/admins`
Obtener todos los administradores (sin contraseñas)

### POST `/api/admins`
Crear nuevo administrador
```json
{
  "nome": "Nombre",
  "email": "email@example.com",
  "password": "contraseña123"
}
```

### GET `/api/admins/[id]`
Obtener administrador por ID

### PUT `/api/admins/[id]`
Actualizar administrador (requiere requesterId)
```json
{
  "nome": "Nuevo Nombre",
  "email": "nuevo@email.com",
  "password": "nueva_contraseña",
  "ativo": true,
  "requesterId": "id_del_admin_master"
}
```

### DELETE `/api/admins/[id]?requesterId=xxx`
Eliminar administrador (requiere requesterId en query params)

## 🎯 Ubicaciones en el Código

- **Modelo**: `prisma/schema.prisma` - Admin model
- **Controller**: `src/controllers/adminController.ts`
- **API Routes**: `src/app/api/admins/`
- **Página Admin**: `src/app/admin/administradores/page.tsx`
- **Types**: `src/types/index.ts` - Admin interface
- **Scripts**: `src/scripts/setup-master.js` y `set-master-admin.ts`

## 📝 Notas

- El primer admin creado será automáticamente Master si ejecutas `setup-master.js`
- Solo puede haber admins Master configurados manualmente
- Los nuevos admins siempre se crean como admins normales
- El sistema valida permisos tanto en frontend como backend

