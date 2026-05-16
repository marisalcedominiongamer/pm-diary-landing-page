// PM Diary — GitHub OAuth callback para Decap CMS
// Vercel Function: /api/callback

export default async function handler(req, res) {
    const { code } = req.query;
    const client_id = process.env.OAUTH_CLIENT_ID;
    const client_secret = process.env.OAUTH_CLIENT_SECRET;

    if (!code) return res.status(400).send('Código no recibido');
    if (!client_id || !client_secret) return res.status(500).send('Variables OAuth no configuradas');

    try {
        const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ client_id, client_secret, code }),
        });

        const tokenData = await tokenRes.json();
        if (tokenData.error) return res.status(400).send(tokenData.error_description);

        const token = tokenData.access_token;
        const message = JSON.stringify({ token, provider: 'github' });

        const html = `<!DOCTYPE html><html><head><title>PM Diary Admin</title></head><body>
<script>
(function() {
  var msg = ${JSON.stringify(message)};
  function receiveMessage(e) {
    window.opener.postMessage('authorization:github:success:' + msg, e.origin);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
<p style="font-family:sans-serif;text-align:center;margin-top:60px;color:#888;">Autenticando... esta ventana se cerrará sola.</p>
</body></html>`;

        res.setHeader('Content-Type', 'text/html');
        res.send(html);
    } catch (err) {
        res.status(500).send('Error interno: ' + err.message);
    }
}