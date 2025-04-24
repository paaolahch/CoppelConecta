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
- Seguimiento a cursos y beneficios recomendados para clientes.

---

## Tecnologías Utilizadas

- **React Native (Expo SDK)**
- **Firebase Auth & Firestore**
- **React Navigation**
- **Formik + Yup** para formularios y validaciones
- **Google Maps + Google Places API**
- **Axios** para consumo de API (chatbot)
- **Jetpack Compose (solo cliente Android nativo) para el chatbot**
- **FAISS + FastAPI** en backend (no incluido en este repo)

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) 16+
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Cuenta en [Expo](https://expo.dev)
- Firebase configurado (usa tu propia cuenta para desarrollo)

Instalar Expo CLI si no lo tienes:
```bash
npm install -g expo-cli
