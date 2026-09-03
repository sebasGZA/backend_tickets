<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Backend tickets
Proyecto creado con el framework de nestjs para la gestion de tickets, usuarios, clientes  implementando arquitectura hexagonal para separar la logica de negocio de los agentes externos como el orm de base de datos y framework, se usa postgresql con la ayuda de docker para levantar una base de datos local

## 📦 Requerimientos

Instalaciones necesarias:

- Node.js (>= 18)
- NestJS
- Pnpm
- Nest.js
- Git
- Docker

## 🔧 Instalación

clonar repositorio:

```bash
git clone https://github.com/sebasGZA/backend_tickets.git
cd backend_tickets
pnpm install
```

## ⚙️ Variables de entorno

Crear un archivo .env y agrega las variables de entorno basadas .env.template

## 🐳 Docker 
Instalar docker https://docs.docker.com/engine/install
### Crear contenedor de base de datos
```bash
docker compose up -d
```

## ▶️ Correr el proyecto
```bash
pnpm run migration:run
pnpm run seed
pnpm run start:dev
```

## Swagger
http://localhost:3000/docs

## Explicación de la arquitectura:

Se implementó arquitectura hexagonal que esta basado en la inversión de dependencias y con el patrón de puerto/adaptadores para la separar por capas y la lógica de negoció de agentes externos

## Estructura de carpetas del backend

Gracias al framework de NestJS se maneja una estructura modular y se separa cada modulo por 3 carpetas principales como domain, application e infrastructure
