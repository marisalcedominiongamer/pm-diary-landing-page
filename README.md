# PM Diary — Landing Page

Landing page oficial de PM Diary. HTML puro, sin dependencias, deploy automático en Vercel.

---

## 🚀 Cómo subir cambios (flujo normal)

Cada vez que edites algo en local, estos 3 comandos publican el cambio:

```bash
git add .
git commit -m "describe qué cambiaste"
git push
```

Vercel detecta el push y redeploya solo en ~30 segundos.

---

## 📁 Estructura del proyecto

```
pm-diary-landing/
├── index.html        ← landing principal
├── README.md         ← esta guía
└── images/           ← coloca aquí tus imágenes (crear la carpeta)
```

---

## 🔧 Setup inicial (solo se hace una vez)

### 1. Crear repo en GitHub
- github.com → New repository
- Nombre: `pm-diary-landing`
- Sin README (ya tienes este)

### 2. Subir por primera vez

```bash
git init
git add .
git commit -m "Landing inicial PM Diary"
git remote add origin https://github.com/TU_USUARIO/pm-diary-landing.git
git push -u origin main
```

### 3. Conectar Vercel
- vercel.com → Add New → Project
- Importar `pm-diary-landing`
- Framework: **Other**
- Deploy → listo

---

## ⚠️ Regla de oro

**Nunca edites código directamente en GitHub desde el navegador** para cambios grandes.
Edita siempre en local → prueba en el navegador → luego haz push.

---

## 📌 Repos separados (importante)

| Repo | Propósito |
|---|---|
| `pm-diary-landing` | Solo esta landing |
| `pm-diary-app` | El SaaS completo |

Mantenerlos separados evita que un error en el SaaS afecte la landing en producción.