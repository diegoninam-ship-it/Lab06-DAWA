<div align="center">

# 📱 Laboratorio 06 — Desarrollo de Aplicaciones Web Avanzado

### Introducción a Bases de Datos NoSQL — MongoDB + Mongoose + Express

![Node.js](https://img.shields.io/badge/Node.js-22.18.0-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
![Status](https://img.shields.io/badge/status-completado-brightgreen?style=for-the-badge)

*Tecsup · Diseño y Desarrollo de Software · 5 - C24 - Sección A-B*

</div>

---

## 📖 Tabla de contenidos

- [Descripción general](#-descripción-general)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Configuración](#-configuración)
- [Modelos](#-modelos)
- [Arquitectura en capas](#-arquitectura-en-capas)
- [CRUD web de Posts](#-crud-web-de-posts)
- [Diseño — Tema "Vanguard Social"](#-diseño--tema-vanguard-social)
- [Cómo ejecutar el proyecto](#-cómo-ejecutar-el-proyecto)
- [Stack técnico](#-stack-técnico)
- [Autor](#-autor)

---

## 📌 Descripción general

Aplicación web construida con **Express**, **EJS** y **MongoDB** (a través de **Mongoose** como ODM), siguiendo una arquitectura en capas: **rutas → controladores → servicios → repositorios → modelos**. Gestiona dos entidades — **Users** y **Posts** — con relación referenciada (`ref`), validaciones de esquema, y un CRUD completo de Posts renderizado del lado del servidor.

---

## 🗂 Estructura del proyecto

```
mongo-node/
├── app.js
├── package.json
├── .env                          # No se sube (URI de MongoDB, PORT)
│
└── src/
    ├── db/
    │   └── database.js            # Conexión a MongoDB con Mongoose
    │
    ├── models/
    │   ├── User.js
    │   └── Post.js
    │
    ├── repositories/
    │   ├── userRepository.js
    │   └── postRepository.js
    │
    ├── services/
    │   └── postService.js
    │
    ├── controllers/
    │   └── postController.js
    │
    ├── routes/
    │   ├── home.routes.js
    │   └── post.routes.js
    │
    ├── views/
    │   ├── home.ejs
    │   ├── posts.ejs
    │   ├── newPost.ejs
    │   └── editPost.ejs
    │
    └── public/
        └── styles.css              # Tema visual "Vanguard Social"
```

---

## ⚙️ Configuración

```bash
npm install
```

Crea un archivo `.env` en la raíz:

```dotenv
MONGO_URI=mongodb://localhost:27017/socialmedia
PORT=3001
```

```bash
npm run dev
```

---

## 🧬 Modelos

<details open>
<summary>👤 <b>User</b></summary>
<br>

| Campo | Tipo / Restricciones |
|---|---|
| `name` | String |
| `lastName` | String |
| `email` | String, único |
| `age` | Number, mínimo 18, requerido |
| `phoneNumber` | String |
| `password` | String, mínimo 8 caracteres, requerido |
| `createdAt` | Date, por defecto la fecha actual |

</details>

<details open>
<summary>📝 <b>Post</b></summary>
<br>

| Campo | Tipo / Restricciones |
|---|---|
| `title` | String, entre 5 y 30 caracteres, requerido |
| `content` | String, mínimo 10 caracteres, requerido |
| `user` | Referencia (`ObjectId`) a `User` |
| `hashtags` | Array de Strings |
| `imageUrl` | String |
| `createdAt` | Date, por defecto la fecha actual |
| `updatedAt` | Date, se actualiza automáticamente al editar |

</details>

---

## 🏗 Arquitectura en capas

| Capa | Responsabilidad |
|---|---|
| **Modelo** | Define el esquema y las validaciones (Mongoose) |
| **Repositorio** | Acceso directo a los datos (`find`, `create`, `update`, `delete`) |
| **Servicio** | Lógica de negocio (validar que el usuario exista antes de crear un post) |
| **Controlador** | Traduce peticiones HTTP a llamadas de servicio, renderiza vistas |
| **Rutas** | Mapea URLs y métodos HTTP a funciones del controlador |

---

## 📰 CRUD web de Posts

| Método | Ruta | Descripción |
|:---:|---|---|
| `GET` | `/posts` | Feed con todos los posts (`.populate("user")`) |
| `GET` | `/posts/new` | Formulario de creación |
| `POST` | `/posts` | Crea un nuevo post |
| `GET` | `/posts/:id/edit` | Formulario de edición |
| `POST` | `/posts/:id/update` | Actualiza un post (fija `updatedAt`) |
| `POST` | `/posts/:id/delete` | Elimina un post |

---

## 🎨 Diseño — Tema "Vanguard Social"

<details>
<summary>🖌️ <b>Tokens de diseño</b></summary>
<br>

| Variable | Valor | Uso |
|---|---|---|
| `--bg` | `#0B0C10` | Fondo general |
| `--surface` | `#16181D` | Cards, navbar, formularios |
| `--accent` / `--accent-2` | `#7C5CFF` / `#FF5CAA` | Degradado (logo, botones, avatar) |
| `--text` / `--text-muted` | `#F5F6FA` / `#8A8F98` | Texto principal / secundario |

**Tipografía:** *Sora* (títulos, marca) + *Inter* (cuerpo).

**Elementos distintivos:** avatar circular con borde en degradado, botón flotante (FAB) para nuevo post, cards con efecto glassmorphism sutil, chips de hashtags con acento violeta-magenta.

</details>

---

## ▶️ Cómo ejecutar el proyecto

```bash
git clone https://github.com/diegoninam-ship-it/Lab06-DAWA.git
cd Lab06-DAWA
npm install
# crear el .env como se indicó arriba
npm run dev
```

Visita `http://localhost:3001` (Home) y `http://localhost:3001/posts` (Feed).

---

## 🧰 Stack técnico

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat-square&logo=ejs&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white)

</div>

---

## 👤 Autor

**Diego** — Estudiante de Diseño y Desarrollo de Software, Tecsup
📍 Laboratorio 06 · Desarrollo de Aplicaciones Web Avanzado

<div align="center">

⭐ *Si este repo te sirvió de guía, no olvides dejar una estrella* ⭐

</div>