# Trainingsbuch – Installation & Updates

Eigenständige App: läuft im Browser oder installiert auf Android, auch offline. Keine Abhängigkeit von Claude.
Die Daten liegen auf dem Handy. Mit einem Konto (Benutzername + Passwort) werden sie optional über deinen eigenen kostenlosen Supabase-Server gesichert und zwischen Geräten abgeglichen.

## 1. App online stellen (GitHub Pages, kostenlos, ca. 10 Minuten)

1. Auf <https://github.com> ein kostenloses Konto anlegen (falls noch nicht vorhanden) und unter **Settings → Password and authentication** die **Zwei-Faktor-Anmeldung** einschalten. Wer dein GitHub-Konto kontrolliert, kontrolliert die App.
2. Oben rechts **+ → New repository**. Name: `trainingsbuch`, **Public**, dann **Create repository**.
3. Auf der leeren Repo-Seite auf **uploading an existing file** klicken und **alle Dateien aus diesem Ordner** hineinziehen
   – inklusive des Ordners **`fonts`** (einfach den ganzen Ordnerinhalt auf einmal ins Browserfenster ziehen). **Commit changes**.
   Das Repository ist öffentlich: Der Code ist sichtbar, deine Trainingsdaten nicht – die liegen nur auf dem Handy bzw. in deinem Konto.
4. **Settings → Pages**: unter „Build and deployment“ *Source: Deploy from a branch*, Branch **main**, Ordner **/ (root)**, **Save**.
5. Nach 1–2 Minuten ist die App erreichbar unter
   `https://DEIN-GITHUB-NAME.github.io/trainingsbuch/`

## 2. Auf dem Android-Handy installieren

1. Die Adresse in **Chrome** öffnen.
2. **⋮ → App installieren** (bei manchen Versionen „Zum Startbildschirm hinzufügen“).
3. Fertig: eigenes Icon, startet im Vollbild, funktioniert offline.

## 3. Konto & Sync einrichten (optional, kostenlos, ca. 10 Minuten)

1. Auf <https://supabase.com> ein kostenloses Konto anlegen (auch hier Zwei-Faktor-Anmeldung einschalten) und **New project** erstellen (Region z. B. Frankfurt, ein Datenbank-Passwort vergeben und dir merken).
2. Im Projekt links **SQL Editor → New query**, den kompletten Inhalt von `supabase.sql` einfügen, **Run**. Es sollte „Success“ erscheinen.
3. **Project Settings → API (bzw. API Keys)**: die **Project URL** und den **publishable key** (oder bei älteren Projekten den **anon public** key) kopieren.
4. Beides entweder
   - in der App unter **Daten & Konto → Server-Einstellungen** eintragen (gilt nur für dieses Gerät), oder
   - in `config.js` eintragen und die Datei auf GitHub ersetzen (gilt dann für alle Geräte).
5. In der App unter **Daten & Konto** einen Benutzernamen und ein Passwort (mind. 8 Zeichen) wählen und **Neues Konto** tippen. Auf weiteren Geräten **Anmelden**.

Gut zu wissen:
- Wähle für das App-Konto ein Passwort, das du sonst nirgends verwendest. Auf dem Server wird es nur als bcrypt-Hash gespeichert. Die Tabellen sind von außen gesperrt; Zugriff gibt es nur über die Login- und Sync-Funktionen.
- Kostenlose Supabase-Projekte werden nach etwa einer Woche **ohne Nutzung pausiert**. Dann im Supabase-Dashboard auf „Restore“ klicken. Deine Daten auf dem Handy sind davon nicht betroffen; der Sync läuft danach einfach weiter.
- Unabhängig vom Konto kannst du unter **Daten & Konto** jederzeit eine **Backup-Datei** speichern.

## Sicherheit

- Die App braucht keine Berechtigungen (Kamera, Standort, Kontakte …) und läuft in der abgeschirmten Umgebung von Chrome.
- Alles, inklusive Schriften, wird von deiner eigenen Adresse geladen; es gehen keine Anfragen an Google oder andere Dritte.
- Eine Sicherheitsregel (Content-Security-Policy in `index.html`) erlaubt Verbindungen nur zur App selbst und zu `*.supabase.co`. Selbst manipulierter Code könnte deine Daten nirgendwo anders hinschicken.

## 4. Updates

- Neue Dateien auf GitHub hochladen (gleiche Namen, alte werden ersetzt), **Commit**.
- Wichtig: In `sw.js` die Zeile `const VERSION = '…'` erhöhen. Dann merkt die installierte App das Update und zeigt **„Neue Version verfügbar – Neu laden“**.
- Deine Daten bleiben bei Updates erhalten.
- Wenn du GitHub in den claude.ai-Einstellungen verbindest, kann Claude neue Versionen direkt in dein Repository schreiben – dann entfällt das Hochladen.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Grundgerüst, Gestaltung, Sicherheitsregel |
| `app.js` | die ganze App-Logik (Übungsdatenbank, Planer, Auswertung, Sync) |
| `fonts/` | Schriften (Barlow, SIL Open Font License) |
| `sw.js` | Offline-Betrieb und Updates |
| `manifest.webmanifest`, `icon-*.png` | Installation als App |
| `config.js` | optional: Adresse deines Sync-Servers für alle Geräte |
| `supabase.sql` | einmalig im Supabase SQL Editor ausführen |
