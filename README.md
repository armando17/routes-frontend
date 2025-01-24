## Descripción

Proyecto frontend prueba técnica:<br>
Next.js, Next Auth, Tailwind


## Configuración

Configurar el archivo .env (.env-sample)
```bash
# Definir la url del API REST Backend del proyecto
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api

#valor por defecto
NEXTAUTH_SECRET=no.utilizar.en.producción

# Definit la url del proyecto Frontend
NEXTAUTH_URL=http://localhost:3000/
```

```bash
# Instalar las dependecias
$ npm install
```

## Levantar el Proyecto FrontEnd

```bash
# watch mode (http://localhost:3000/)
$ npm run start:dev
```
## Login Acceso Proyecto FrontEnd

http://localhost:3000/login

usuario: *armank.17@gmail.com*<br>
contraseña: *123456*