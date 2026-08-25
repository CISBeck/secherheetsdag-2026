# Sécherheetsdag 2026 – gratis Website

## Enthalten
- `index.html` – komplette responsive Website
- `style.css` – Design passend zum Flyer
- `app.js` – Umeldungslogik
- `config.js` – hei kënnt de Google-Apps-Script-Link eran
- `apps-script.gs` – gratis Backend fir Umeldungen an eng Google Sheet ze späicheren
- `flyer.png` – Flyer als Bild

## Gratis Setup
1. Eng Google Sheet erstellen: `Sécherheetsdag 2026 - Umeldungen`.
2. An der Sheet: **Extensions → Apps Script**.
3. Den Inhalt vun `apps-script.gs` afügen.
4. **Deploy → New deployment → Web app**.
5. "Execute as" = **Me**.
6. "Who has access" = **Anyone**.
7. D'Web-App-URL kopéieren.
8. An `config.js` bei `REGISTRATION_ENDPOINT` afügen.
9. D'Dateien gratis iwwer GitHub Pages oder Cloudflare Pages publizéieren.
10. De Link vun der publizéierter Website an e QR-Code setzen.

D'Websäit selwer kascht näischt. Google Sheet + Apps Script sinn och gratis fir dëse Gebrauch.
