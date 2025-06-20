import { ExternalLink } from 'lucide-react';
import { TestResults } from '../types/stroop';

interface ResultsProps {
  results: TestResults;
  onRestart: () => void;
  isSaving?: boolean;
  saveError?: string | null;
  participantId?: string | null;
}

export default function Results({ participantId }: ResultsProps) {
  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Test abgeschlossen</h2>
        <p className="text-lg text-gray-600 mb-6">
          Vielen Dank! Ihre Daten wurden erfolgreich anonymisiert gespeichert.
        </p>
      </div>

      {/* Umfrage-Link */}
      {participantId && (
        <div className="bg-blue-50 border border-blue-200 p-8 rounded-xl text-center">
          <h3 className="text-xl font-semibold text-blue-900 mb-4">
            Letzter Schritt: Debriefing & Umfrage
          </h3>
          <p className="text-blue-700 mb-6">
            Um die Studie abzuschließen, finden Sie hier das Debriefing und eine kurze Umfrage. 
            Das Debriefing erklärt Ihnen den Hintergrund des Tests, und Ihre Antworten in der Umfrage 
            sind wichtig für unsere Forschung.
          </p>
          <a
            href={`https://docs.google.com/forms/d/e/1FAIpQLScER2f2RUG9PVEPtVAyMWlCVcgIsYi2mOlqLXg0BJsityskTw/viewform?usp=pp_url&entry.1088371818=${participantId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 text-lg"
          >
            <ExternalLink className="h-6 w-6 mr-3" />
            Zum Debriefing & zur Umfrage
          </a>
        </div>
      )}
    </div>
  );
}