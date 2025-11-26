<div align="center">

# Band FM - Sistema Web de Radio

<img src="./public/logo-bandfm.png" alt="Band FM Logo" width="200"/>

### Aplicación web completa para gestión de radio online

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Características](#-características-principales) • [Instalación](#-instalación-rápida) • [Uso](#-uso) • [Tecnologías](#-tecnologías) • [Documentación](#-documentación)

</div>

---

## Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características Principales](#-características-principales)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación Rápida](#-instalación-rápida)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Base de Datos](#-base-de-datos)
- [Scripts Disponibles](#-scripts-disponibles)
- [Deploy](#-deploy)
- [Documentación](#-documentación)
- [Soporte](#-soporte)

---

## Acerca del Proyecto

**Band FM** es una plataforma web moderna y completa diseñada para la gestión integral de una estación de radio online. Ofrece una experiencia intuitiva tanto para los administradores del sistema como para los oyentes, con características avanzadas de gestión de contenido multimedia.

### ¿Para quién es este sistema?

- **Estaciones de radio** que quieren presencia digital profesional
- **Emisoras locales** que necesitan gestionar contenido fácilmente
- **Empresas de medios** que buscan una solución escalable
- **Comunidades** que desean su propia radio online

---

## Características Principales

### Portal Público

<table>
<tr>
<td width="50%">

#### Para los Oyentes

- **Reproductor de Radio en Vivo**
  - Streaming de audio continuo
  - Controles intuitivos
  - Visualización de lo que está sonando

- **Noticias Actualizadas**
  - Feed de noticias dinámico
  - Imágenes y descripciones
  - Enlaces a fuentes originales

-  **Programación**
  - Horarios detallados
  - Información de presentadores
  - Programas por día de la semana

</td>
<td width="50%">

#### Más Funciones

- **Promociones y Sorteos**
  - Promociones activas
  - Detalles de participación

-  **Podcasts**
  - Biblioteca de episodios
  - Reproductor integrado
  - Descarga de contenido

- **Galería Multimedia**
  - Fotos y videos de eventos
  - Vista tipo masonry
  - Lightbox integrado

- **Directorio de Empresas**
  - Catálogo de negocios asociados
  - Productos destacados

</td>
</tr>
</table>

###  Panel Administrativo

<table>
<tr>
<td width="50%">

#### Gestión de Contenido

-  **Noticias**: Crear, editar y eliminar noticias
-  **Promociones**: Gestionar campañas promocionales
-  **Programación**: Configurar horarios y programas
-  **Podcasts**: Subir y gestionar episodios
-  **Galería**: Administrar fotos y videos
-  **Banners**: Control de publicidad

</td>
<td width="50%">

#### Gestión Avanzada

-  **Empresas**: CRUD completo de negocios
-  **Productos**: Catálogo por empresa
-  **Administradores**: Gestión de usuarios admin
-  **Encuestas Musicales**: Votaciones de géneros
-  **Seguridad**: Autenticación y autorización
-  **Dashboard**: Estadísticas en tiempo real

</td>
</tr>
</table>

###  Características Técnicas

- ✅ **Diseño Responsivo**: Funciona perfectamente en móviles, tablets y desktop
- ✅ **PWA Ready**: Instalable como aplicación nativa
- ✅ **SEO Optimizado**: Metadata y estructura optimizada para buscadores
- ✅ **Carga Rápida**: Optimización de imágenes y code splitting
- ✅ **Modo Oscuro**: Interfaz adaptable (próximamente)
- ✅ **Multilenguaje**: Soporte para internacionalización

---

## Tecnologías

### Frontend

| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| [Next.js](https://nextjs.org/) | 15.5.3 | Framework React con SSR y App Router |
| [React](https://react.dev/) | 18.3.1 | Biblioteca para interfaces de usuario |
| [TypeScript](https://www.typescriptlang.org/) | 5.7.2 | JavaScript con tipado estático |
| [Tailwind CSS](https://tailwindcss.com/) | 3.4.15 | Framework CSS utilitario |

### Backend

| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| [Prisma](https://www.prisma.io/) | 6.0.1 | ORM moderno para Node.js |
| [PostgreSQL](https://www.postgresql.org/) | - | Base de datos relacional |
| [NextAuth.js](https://next-auth.js.org/) | 4.24.10 | Autenticación para Next.js |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | 2.4.3 | Encriptación de contraseñas |

### Integraciones

-  **Supabase** - Hosting de base de datos y storage
-  **Autoprefixer** - Compatibilidad CSS cross-browser
-  **ESLint** - Linter para código JavaScript/TypeScript

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18.17 o superior) - [Descargar](https://nodejs.org/)
- **npm** (viene con Node.js) o **yarn**
- **Git** - [Descargar](https://git-scm.com/)
- **PostgreSQL** (versión 12 o superior) - [Descargar](https://www.postgresql.org/) o usar servicio en la nube

### Verificar instalación:

```bash
node --version  # Debe mostrar v18.17.0 o superior
npm --version   # Debe mostrar 9.0.0 o superior
git --version   # Debe mostrar 2.30.0 o superior
```

---

## Instalación Rápida

### 1️⃣ Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd AppBandFM
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

### 3️⃣ Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de Datos PostgreSQL
DATABASE_URL="postgresql://usuario:contraseña@host:puerto/nombredb?schema=public"
DIRECT_URL="postgresql://usuario:contraseña@host:puerto/nombredb?schema=public"

# Autenticación NextAuth
NEXTAUTH_SECRET="genera_una_clave_secreta_aqui"
NEXTAUTH_URL="http://localhost:3000"
```

**Generar NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4️⃣ Configurar Base de Datos

```bash
# Generar cliente Prisma
npm run db:generate

# Crear tablas en la base de datos
npm run db:push

# Crear administrador inicial
node scripts/create-admin.js
```

### 5️⃣ Iniciar el Servidor

```bash
npm run dev
```

 **¡Listo!** Abre tu navegador en [http://localhost:3000](http://localhost:3000)

---

## Configuración

### Variables de Entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | URL de conexión a PostgreSQL con pooling | `postgresql://user:pass@host:6543/db?pgbouncer=true` |
| `DIRECT_URL` | URL de conexión directa a PostgreSQL | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | Clave secreta para sesiones | Generar con `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL base de la aplicación | `http://localhost:3000` |

### Base de Datos

#### Opción A: PostgreSQL Local

```bash
# Instalar PostgreSQL y crear base de datos
createdb bandfm

# Usar en .env:
DATABASE_URL="postgresql://postgres:password@localhost:5432/bandfm?schema=public"
DIRECT_URL="postgresql://postgres:password@localhost:5432/bandfm?schema=public"
```

#### Opción B: Supabase (Recomendado)

1. Crea una cuenta en [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Ve a Settings > Database
4. Copia las connection strings
5. Úsalas en tu archivo `.env`

---

## Uso

### Acceso al Sistema

#### Portal Público
- **URL**: `http://localhost:3000`
- **Acceso**: Libre para todos los usuarios

#### Panel Administrativo
- **URL**: `http://localhost:3000/login`
- **Credenciales del Administrador Master**:
  - Email: `bandfm@bandfmfronteira.com.br`
  - Contraseña: `RadioLivramento#2025`

⚠️ **IMPORTANTE**: Guarde estas credenciales en un lugar seguro

#### Portal de Empresas
- **URL**: `http://localhost:3000/login-empresa`
- **Acceso**: Credenciales proporcionadas por el administrador

### Funcionalidades del Admin

<details>
<summary><b> Gestionar Noticias</b></summary>

1. Accede al panel de administración
2. Haz clic en **"Noticias"** en el menú lateral
3. Para crear una noticia:
   - Clic en "Nueva Noticia"
   - Completa título, descripción, imagen y fuente
   - Guarda los cambios
4. Para editar/eliminar: usa los botones en cada noticia

</details>

<details>
<summary><b> Configurar Programación</b></summary>

1. Ve a **"Programación"** en el panel admin
2. Clic en "Nuevo Programa"
3. Completa:
   - Nombre del programa
   - Nombre del presentador
   - Días de la semana
   - Horarios
4. Guarda y el programa aparecerá en el sitio público

</details>

<details>
<summary><b> Administrar Empresas</b></summary>

1. Ve a **"Empresas"** en el panel
2. Clic en "Nueva Empresa"
3. Completa los datos:
   - Nombre, email, contraseña
   - Categoría, descripción
   - Logo/foto (opcional)
   - Teléfono (opcional)
4. La empresa podrá acceder para gestionar sus productos

</details>

<details>
<summary><b> Subir Podcasts</b></summary>

1. Ve a **"Podcasts"** en el menú
2. Clic en "Nuevo Podcast"
3. Sube:
   - Archivo de audio (MP3)
   - Imagen de portada
   - Título y descripción
   - Duración
4. Los oyentes podrán escucharlo en línea

</details>

---

## Estructura del Proyecto

```
AppBandFM/
├── 📂 src/
│   ├── 📂 app/                      # App Router de Next.js
│   │   ├── 📂 api/                  # API Routes (Backend)
│   │   │   ├── 📂 admins/           # CRUD de administradores
│   │   │   ├── 📂 auth/             # Autenticación
│   │   │   ├── 📂 banners/          # Gestión de banners
│   │   │   ├── 📂 empresas/         # CRUD de empresas
│   │   │   ├── 📂 galeria/          # Gestión de galería
│   │   │   ├── 📂 noticias/         # CRUD de noticias
│   │   │   ├── 📂 podcasts/         # CRUD de podcasts
│   │   │   ├── 📂 productos/        # CRUD de productos
│   │   │   ├── 📂 programacion/     # CRUD de programación
│   │   │   ├── 📂 promociones/      # CRUD de promociones
│   │   │   └── 📂 upload/           # Subida de archivos
│   │   ├── 📂 admin/                # Panel administrativo
│   │   ├── 📂 empresa/              # Portal de empresas
│   │   ├── 📂 login/                # Login admin
│   │   ├── 📂 noticias/             # Vista de noticias
│   │   ├── 📂 podcasts/             # Vista de podcasts
│   │   └── page.tsx                 # Página principal
│   │
│   ├── 📂 components/               # Componentes React reutilizables
│   │   ├── AdminLayout.tsx          # Layout del admin
│   │   ├── BannerCarousel.tsx       # Carrusel de banners
│   │   ├── EnqueteMusica.tsx        # Encuesta musical
│   │   ├── PodcastPlayer.tsx        # Reproductor de podcasts
│   │   ├── RadioPlayer.tsx          # Reproductor de radio
│   │   └── SiteNavbar.tsx           # Barra de navegación
│   │
│   ├── 📂 controllers/              # Lógica de negocio (MVC)
│   │   ├── adminController.ts       # Controlador de admins
│   │   ├── bannerController.ts      # Controlador de banners
│   │   ├── empresaController.ts     # Controlador de empresas
│   │   ├── noticiaController.ts     # Controlador de noticias
│   │   └── ...                      # Más controladores
│   │
│   ├── 📂 lib/                      # Utilidades y configuraciones
│   │   ├── api.ts                   # Cliente API
│   │   ├── auth.ts                  # Utilidades de auth
│   │   └── db.ts                    # Cliente Prisma
│   │
│   └── 📂 types/                    # Definiciones TypeScript
│       └── index.ts                 # Tipos globales
│
├── 📂 prisma/
│   ├── schema.prisma                # Esquema de la base de datos
│   └── dev.db                       # BD de desarrollo
│
├── 📂 public/                       # Archivos estáticos
│   ├── logo-bandfm.png              # Logo de la radio
│   └── 📂 uploads/                  # Archivos subidos
│       ├── 📂 audio/                # Archivos de audio
│       ├── 📂 images/               # Imágenes
│       └── 📂 videos/               # Videos
│
├── 📂 scripts/                      # Scripts de utilidad
│   └── create-admin.js              # Crear admin inicial
│
├── .env                             # Variables de entorno (no incluir en Git)
├── .gitignore                       # Archivos ignorados por Git
├── next.config.js                   # Configuración de Next.js
├── package.json                     # Dependencias del proyecto
├── tailwind.config.js               # Configuración de Tailwind
├── tsconfig.json                    # Configuración de TypeScript
└── README.md                        # Este archivo
```

---

## Base de Datos

### Modelos Principales

El proyecto utiliza **Prisma ORM** con **PostgreSQL**. La base de datos incluye los siguientes modelos:

| Modelo | Descripción | Campos Principales |
|--------|-------------|-------------------|
| **Admin** | Usuarios administradores | email, password, nome, isMaster |
| **Empresa** | Empresas asociadas | nome, email, senha, categoria |
| **Producto** | Productos de empresas | nome, descripcion, preco, empresaId |
| **Noticia** | Noticias de la radio | titulo, imagem, descripcion, fonte |
| **Promocao** | Promociones activas | titulo, descripcion, imagem |
| **ProgramacaoRadio** | Programación | diasSemana, horarios, nomePrograma |
| **Podcast** | Episodios de podcast | titulo, audioUrl, imagem, duracao |
| **Banner** | Banners publicitarios | titulo, imagem, link, ordem |
| **GaleriaItem** | Fotos y videos | tipo, url, legenda |
| **EnqueteMusicaVoto** | Votos de encuestas | genero, ipAddress |

### Visualizar la Base de Datos

Prisma incluye una interfaz gráfica para explorar y editar datos:

```bash
npm run db:studio
```

Esto abrirá Prisma Studio en `http://localhost:5555`

### Migraciones y Sincronización

```bash
# Generar cliente después de cambios en schema.prisma
npm run db:generate

# Sincronizar cambios con la base de datos
npm run db:push

# Reset completo ( borra todos los datos)
npx prisma db push --force-reset
```

---

##  Scripts Disponibles

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# El servidor estará en http://localhost:3000
# Hot reload automático activado
```

### Producción

```bash
# Construir para producción
npm run build

# Iniciar servidor de producción
npm start

# La aplicación se optimiza para mejor rendimiento
```

### Base de Datos

```bash
# Generar cliente Prisma
npm run db:generate

# Sincronizar esquema con BD
npm run db:push

# Abrir Prisma Studio
npm run db:studio
```

### Utilidades

```bash
# Ejecutar linter
npm run lint

# Crear administrador inicial
node scripts/create-admin.js

# Verificar conexión a BD
node scripts/test-db-connection.js
```

---

## Solución de Problemas

### El servidor no inicia

```bash
# Verifica que el puerto 3000 esté libre
npx kill-port 3000

# Reinicia el servidor
npm run dev
```

### Error de conexión a base de datos

1. Verifica que el archivo `.env` existe y tiene las URLs correctas
2. Verifica que PostgreSQL está corriendo
3. Prueba la conexión: `node scripts/test-db-connection.js`

### Error "Module not found"

```bash
# Reinstala dependencias
rm -rf node_modules package-lock.json
npm install
```

### Problemas con Prisma

```bash
# Regenera el cliente de Prisma
npx prisma generate

# Resetea la base de datos (⚠️ borra datos)
npx prisma db push --force-reset
```

---

## Licencia

Este proyecto es privado y propietario. Todos los derechos reservados.

---

## Agradecimientos


### Tecnologías Open Source utilizadas:

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- Y muchas más...

---

<div align="center">

### Band FM - Tu radio online con la mejor programación

**[Volver arriba](#band-fm---sistema-web-de-radio)**

Desarrollado para Band FM 96.1 Livramento

</div>
