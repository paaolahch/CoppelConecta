
# Coppel Conecta – App de Referencias de Negocios

**Coppel Conecta** es una aplicación móvil desarrollada con **React Native + Expo** como parte de un proyecto modular. Permite a los **cobradores de Coppel** referir negocios, registrar emprendedores, darles seguimiento, y asistirlos con un chatbot inteligente. Esta app busca empoderar a personas emprendedoras para que impulsen sus negocios.

---

## Funcionalidades Clave

- Registro de nuevos negocios con ubicación GPS y datos del propietario.
- Registro de usuarios (cobradores) por número de empleado.
- Inicio de sesión y autenticación con Firebase Auth.
- Autocompletado de direcciones con Google Places.
- Visualización de rutas optimizadas en mapa con `react-native-maps`.
- Chatbot con inteligencia artificial (NLP + FAISS + FastAPI).
- Generación de *speech* personalizado para cobradores con IA (Node.js + Python).
- Recomendación de cursos según el tipo de negocio.
- Seguimiento a cursos y beneficios recomendados para clientes.
- Sistema de gamificación y puntos para cobradores.

---

## Tecnologías Utilizadas

- **React Native (Expo SDK)**
- **Firebase Auth & Firestore**
- **React Navigation**
- **Formik + Yup** para formularios y validaciones
- **Google Maps + Google Places API**
- **Axios** para consumo de API (chatbot y backend)
- **Jetpack Compose (solo cliente Android nativo) para el chatbot**
- **Backend en Node.js + Express**
- **FAISS + FastAPI + NVIDIA Riva** (servicio Python para generación de voz y recomendaciones)
- **Docker** (para servicios IA locales)
- **NVIDIA Merlin / Riva** para síntesis de voz

---

## Backend – Endpoints Destacados

- `POST /api/cobradores/login`: Autenticación JWT
- `GET /api/ia/speech?cobradorId=123&tipoNegocio=abarrotes`: Genera *speech* personalizado
- `POST /api/ia/recommend-courses`: Devuelve cursos sugeridos según el tipo de negocio
- `GET /api/tracking/historial`: Monitoreo de visitas y seguimiento de negocios

---

## Variables de entorno

Crea un archivo `.env` en el root del proyecto:

```env
FIREBASE_API_KEY=tu_clave
FIREBASE_AUTH_DOMAIN=...
GOOGLE_PLACES_API_KEY=...
CHATBOT_API_URL=https://tu-api-fastapi.com/query
BACKEND_API_URL=http://localhost:3000/api
```

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) 18+
- [Python](https://www.python.org/downloads/) 3.8+
- [Docker](https://www.docker.com/) 20.10+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- NVIDIA Drivers 515+ (para correr Riva)
- Firebase configurado 

Instalar Expo CLI si no lo tienes:

```bash
npm install -g expo-cli
```
