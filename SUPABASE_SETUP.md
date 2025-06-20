# Supabase Setup für Stroop Test

## Voraussetzungen

1. Ein Supabase Account (kostenlos unter https://supabase.com)
2. Ein neues Supabase Projekt

## Setup Schritte

### 1. Supabase Projekt erstellen

1. Gehen Sie zu https://supabase.com und melden Sie sich an
2. Klicken Sie auf "New Project"
3. Wählen Sie eine Organisation aus
4. Geben Sie einen Projektnamen ein (z.B. "stroop-test")
5. Erstellen Sie ein sicheres Datenbankpasswort
6. Wählen Sie eine Region aus (am besten eine in Europa für DSGVO-Konformität)
7. Klicken Sie auf "Create new project"

### 2. Datenbank Setup

1. Öffnen Sie Ihr Supabase Projekt Dashboard
2. Gehen Sie zum "SQL Editor" Tab
3. Kopieren Sie den Inhalt aus `database/setup.sql`
4. Fügen Sie ihn in den SQL Editor ein und führen Sie ihn aus
5. Die Tabelle `stroop_results` wird erstellt

### 3. API Schlüssel erhalten

1. Gehen Sie zu "Settings" > "API" in Ihrem Supabase Dashboard
2. Kopieren Sie die "Project URL" und den "anon public" API Key

### 4. Umgebungsvariablen konfigurieren

1. Kopieren Sie `.env.example` zu `.env`:
   ```bash
   cp .env.example .env
   ```

2. Bearbeiten Sie die `.env` Datei und ersetzen Sie die Platzhalter:
   ```
   VITE_SUPABASE_URL=https://ihr-projekt-id.supabase.co
   VITE_SUPABASE_ANON_KEY=ihr-anon-key
   ```

### 5. Anwendung starten

```bash
npm run dev
```

## Datenschutz & Sicherheit

⚠️ **Wichtiger Hinweis**: Die aktuelle Konfiguration verwendet eine öffentliche Policy, die allen Benutzern das Lesen und Schreiben erlaubt. Dies ist für Forschungszwecke und Demos geeignet.

Für Produktionsumgebungen sollten Sie:

1. Authentifizierung implementieren
2. Restriktivere RLS-Policies verwenden
3. Die Daten regelmäßig sichern
4. DSGVO-Konformität sicherstellen

## Datenstruktur

Die `stroop_results` Tabelle speichert:
- Teilnehmer ID (automatisch generiert)
- Testdatum und -zeit
- Zusammenfassung der Testergebnisse
- Alle individuellen Trials als JSON
- Berechnete Metriken (Genauigkeit, Reaktionszeiten, Stroop-Effekt)

## Fehlerbehebung

### "Missing Supabase environment variables"
- Stellen Sie sicher, dass die `.env` Datei korrekt konfiguriert ist
- Überprüfen Sie, dass die Umgebungsvariablen mit `VITE_` beginnen

### "Failed to save results"
- Überprüfen Sie Ihre Internetverbindung
- Stellen Sie sicher, dass die RLS-Policy korrekt konfiguriert ist
- Überprüfen Sie die Browser-Konsole für detaillierte Fehlermeldungen

### Performance-Probleme
- Überprüfen Sie die Supabase Dashboard für die aktuelle Nutzung
- Kostenlose Projekte haben Limits für API-Aufrufe und Speicher
