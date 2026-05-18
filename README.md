# PM Diary — Landing Page

> Landing page administrable para [PM Diary](https://pm-diaryv1.vercel.app/login.html), un SaaS hub para Project Managers. Construida con HTML puro, sin frameworks, sin costos.

🔗 **Live:** [pm-diary-landing-page.vercel.app](https://pm-diary-landing-page.vercel.app)
🚀 **SaaS App:** [pm-diaryv1.vercel.app](https://pm-diaryv1.vercel.app/login.html)

---

## ¿Qué es esto?

Landing page de captura de leads para una beta privada de PM Diary. El objetivo técnico fue construir una landing **100% administrable sin tocar código**, con sistema de temas dinámicos, captura de leads a Google Sheets y autenticación OAuth — todo en planes gratuitos.

---

## Stack técnico (100% free / hobby)

| Capa | Herramienta | Plan |
|------|-------------|------|
| Hosting | [Vercel](https://vercel.com) | Hobby (free) |
| Repositorio | [GitHub](https://github.com) | Free |
| CMS visual | [Pages CMS](https://pagescms.org) | Free |
| Base de datos de leads | [Google Sheets](https://sheets.google.com) | Free |
| Auth admin | GitHub OAuth via Vercel Functions | Hobby |
| Fuentes | Google Fonts | Free |

**Sin base de datos de pago. Sin Supabase. Sin Firebase. Sin Planetscale.**

---

## Arquitectura

```
pm-diary-landing-page/
├── index.html              ← Landing principal
├── content-loader.js       ← Lee JSON y vuelca en el DOM
├── .pages.yml              ← Config del CMS visual
├── api/
│   ├── auth.js             ← OAuth inicio (Vercel Function)
│   ├── callback.js         ← OAuth callback (Vercel Function)
│   └── submit.js           ← Envío de leads → Google Sheets
└── content/
    ├── site.json           ← Meta, tema por defecto
    ├── hero.json
    ├── pillars.json
    ├── beta.json
    ├── theme-bloom.json     ← Tema rosa
    ├── theme-forest.json    ← Tema verde
    ├── theme-aurora.json    ← Tema violeta
    └── theme-glacier.json   ← Tema azul
```

---

## Features técnicos destacados

### 🎨 Sistema de temas dinámicos
4 temas de color completamente administrables desde el CMS. Cada tema vive en un archivo JSON separado con sus variables CSS. Al activar un tema, se inyectan como CSS custom properties en el `<html>` y se persiste en `localStorage`.

```javascript
// Carga los 4 temas en paralelo
const responses = await Promise.all(
  themeIds.map(id => fetch(`/content/theme-${id}.json`).then(r => r.json()))
);
```

### 📋 CMS sin backend propio
El contenido (textos, colores, imágenes) se edita desde [Pages CMS](https://pagescms.org) que hace commits directamente al repositorio de GitHub. Vercel detecta el push y redespliega automáticamente. **Cero infraestructura propia de CMS.**

### 📊 Leads a Google Sheets sin base de datos
Los formularios de captura envían a una Vercel Function que usa la API de Google Sheets vía Service Account. Los datos llegan directamente a una hoja de cálculo.

```
Usuario llena form → Vercel Function → Google Sheets API → Hoja "Sheet1"
```

### 🔐 OAuth admin con GitHub
El acceso al panel CMS está protegido por OAuth de GitHub implementado con dos Vercel Functions (`/api/auth` y `/api/callback`). Sin servicios de auth de terceros de pago.

---

## Deploy propio

```bash
# 1. Clonar
git clone https://github.com/marisalcedominiongamer/pm-diary-landing-page

# 2. Variables de entorno en Vercel
OAUTH_CLIENT_ID=...
OAUTH_CLIENT_SECRET=...
GOOGLE_SHEET_ID=...
GOOGLE_SERVICE_ACCOUNT_JSON=...

# 3. Deploy automático al hacer push a main
```

---

## Lighthouse scores

| Métrica | Desktop | Mobile |
|---------|---------|--------|
| Performance | 100 | 90 |
| Accessibility | 83 | 83 |
| Best Practices | 81 | 81 |
| SEO | 100 | 100 |

---

## Aprendizajes

- Es posible construir un producto administrable completo sin pagar por infraestructura
- Las Vercel Functions son suficientes para OAuth y webhooks simples en etapa hobby
- Google Sheets como base de datos de leads es 100% viable para prototipos y betas
- Pages CMS + GitHub = CMS headless sin servidor propio
- HTML puro sin frameworks puede lograr Lighthouse 100 en Performance desktop

---

## Sobre el proyecto

Construido por **Mariana Salcedo** — Project Manager en agencia de marketing digital, building SaaS con IA como hobby con miras a transicionar como AI Engineer Builder.

Este proyecto es parte de un portafolio de prototipos construidos completamente en planes gratuitos, demostrando que el stack importa menos que la capacidad de resolver problemas.