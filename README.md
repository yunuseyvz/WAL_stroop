# WAL Stroop Test

Eine moderne, webbasierte Implementierung des klassischen Stroop-Tests für Forschungszwecke.

## Features

- 🧠 Klassischer Stroop-Test mit kongruenten und inkongruenten Trials
- 📊 Automatische Berechnung von Reaktionszeiten und Stroop-Effekt
- 💾 Automatische Speicherung der Ergebnisse in Supabase-Datenbank
- 📱 Responsive Design für Desktop und Mobile
- 🎨 Moderne Benutzeroberfläche mit Tailwind CSS
- 📈 Detaillierte Ergebnisanalyse mit Exportfunktion

## Technologie-Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Datenbank**: Supabase (PostgreSQL)
- **Icons**: Lucide React

## Installation

1. Repository klonen:
```bash
git clone <repository-url>
cd WAL_stroop
```

2. Abhängigkeiten installieren:
```bash
npm install
```

3. Supabase einrichten (siehe [SUPABASE_SETUP.md](./SUPABASE_SETUP.md))

4. Entwicklungsserver starten:
```bash
npm run dev
```

## Datenbank-Integration

Die Anwendung speichert automatisch alle Testergebnisse in einer Supabase-Datenbank. Für das vollständige Setup siehe [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

### Gespeicherte Daten

- Teilnehmer-ID (automatisch generiert)
- Testdatum und -zeit
- Gesamtanzahl der Trials
- Anzahl korrekter Antworten
- Genauigkeit (%)
- Durchschnittliche Reaktionszeit
- Stroop-Effekt (Differenz zwischen inkongruenten und kongruenten Trials)
- Alle individuellen Trial-Daten

## Verwendung

1. **Anweisungen lesen**: Der Test beginnt mit einer Erklärung
2. **Test durchführen**: 16 randomisierte Trials mit verschiedenen Farb-Wort-Kombinationen
3. **Ergebnisse ansehen**: Automatische Auswertung mit detaillierten Metriken
4. **Daten exportieren**: CSV-Export für weitere Analysen

## Entwicklung

```bash
# Entwicklungsserver starten
npm run dev

# Build für Produktion
npm run build

# Linting
npm run lint
```

## Lizenz

MIT License - siehe [LICENSE](./LICENSE) für Details.