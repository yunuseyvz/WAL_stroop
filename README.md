# WAL Stroop Test

Eine moderne, webbasierte Implementierung des klassischen Stroop-Tests für das Modul **Wissenschaftliches Arbeiten und Lehren** an der Ludwig-Maximilians-Universität München.

## Zweck der Studie

Dieser Stroop-Test wird ausschließlich für eine Forschungsstudie im Rahmen des Moduls "Wissenschaftliches Arbeiten und Lehren" (WAL) an der LMU München verwendet. Die Studie untersucht den Zusammenhang zwischen Aufmerksamkeitsspanne und dem Konsum von Short-Form Content (TikTok, Instagram Reels usw.).

## Installation

1. Clone:
```bash
git clone <repository-url>
cd WAL_stroop
```

2. Install Dependencies:
```bash
npm install
```

3. Run:
```bash
npm run dev
```

## Datenbank-Integration

Die Anwendung speichert alle Testergebnisse automatisch in einer externen Datenbank. 

### Gespeicherte Daten

- Teilnehmer-ID (automatisch generiert)
- Testdatum und -zeit
- Gesamtanzahl der Trials
- Anzahl korrekter Antworten
- Genauigkeit (%)
- Durchschnittliche Reaktionszeit
- Stroop-Effekt (Differenz zwischen inkongruenten und kongruenten Trials)

## Datenschutz und akademische Nutzung

- Alle Daten werden anonymisiert erhoben
- Die Daten werden ausschließlich für akademische Forschungszwecke verwendet
- Teilnahme ist freiwillig und kann jederzeit beendet werden

## Lizenz

MIT License - siehe [LICENSE](./LICENSE) für Details.