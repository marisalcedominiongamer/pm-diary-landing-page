// PM Diary — Guardar leads en Google Sheets
// Vercel Function: /api/submit

export default async function handler(req, res) {
    // Solo acepta POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    // CORS — permite llamadas desde tu landing
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    try {
        const { nombre, email, nivel_pm, tipo_acceso } = req.body;

        // Validación básica
        if (!email) {
            return res.status(400).json({ error: 'Email requerido' });
        }

        // Credenciales del Service Account desde variable de entorno
        const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
        const SHEET_ID = process.env.GOOGLE_SHEET_ID;

        // Generar JWT para autenticarse con Google
        const token = await getGoogleToken(credentials);

        // Preparar la fila a insertar
        const fecha = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });
        const fila = [fecha, nombre || '', email, nivel_pm || '', tipo_acceso || 'formulario'];

        // Insertar en Google Sheets via API
        const sheetsRes = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:E:append?valueInputOption=USER_ENTERED`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    values: [fila],
                }),
            }
        );

        if (!sheetsRes.ok) {
            const err = await sheetsRes.text();
            console.error('Sheets API error:', err);
            return res.status(500).json({ error: 'Error al guardar en Sheets' });
        }

        return res.status(200).json({ success: true });

    } catch (err) {
        console.error('Submit error:', err);
        return res.status(500).json({ error: 'Error interno: ' + err.message });
    }
}

// ── Genera el Bearer token de Google via JWT ──────────────────
async function getGoogleToken(credentials) {
    const now = Math.floor(Date.now() / 1000);

    const header = { alg: 'RS256', typ: 'JWT' };
    const payload = {
        iss: credentials.client_email,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
    };

    const encode = (obj) =>
        btoa(JSON.stringify(obj)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    const headerB64 = encode(header);
    const payloadB64 = encode(payload);
    const signingInput = `${headerB64}.${payloadB64}`;

    // Importar la clave privada RSA
    const pemKey = credentials.private_key;
    const keyData = pemKey
        .replace(/-----BEGIN PRIVATE KEY-----/, '')
        .replace(/-----END PRIVATE KEY-----/, '')
        .replace(/\n/g, '');

    const binaryKey = Uint8Array.from(atob(keyData), c => c.charCodeAt(0));

    const cryptoKey = await crypto.subtle.importKey(
        'pkcs8',
        binaryKey,
        { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
        false,
        ['sign']
    );

    const encoder = new TextEncoder();
    const signature = await crypto.subtle.sign(
        'RSASSA-PKCS1-v1_5',
        cryptoKey,
        encoder.encode(signingInput)
    );

    const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
        .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

    const jwt = `${signingInput}.${signatureB64}`;

    // Intercambiar JWT por access token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
        throw new Error('No se pudo obtener token de Google: ' + JSON.stringify(tokenData));
    }

    return tokenData.access_token;
}