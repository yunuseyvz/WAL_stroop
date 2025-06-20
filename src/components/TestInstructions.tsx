import { Play, AlertCircle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface TestInstructionsProps {
  onStart: () => void;
  onBack: () => void;
}

export default function TestInstructions({ onStart, onBack }: TestInstructionsProps) {
  const [consentGiven, setConsentGiven] = useState(false);
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Aufmerksamkeitstest (Stroop-Test)
        </h2>
        <p className="text-lg text-gray-600">
          Ein kurzer Test zur Messung Ihrer Aufmerksamkeit und Reaktionszeit
        </p>
      </div>
      
      <div className="space-y-6 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-blue-400 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Anweisungen:
              </h3>
              <ul className="text-blue-800 space-y-2">
                <li>• Sie sehen Farbwörter, die in verschiedenen Farben dargestellt werden</li>
                <li>• <strong>Ignorieren Sie das Wort</strong> und klicken Sie auf die Farbe, in der das Wort geschrieben ist</li>
                <li>• Antworten Sie so schnell und genau wie möglich</li>
                <li>• Der Test dauert etwa 2-3 Minuten</li>
                <li>• Stellen Sie sicher, dass Sie sich in einer ruhigen Umgebung befinden</li>
                <li>• Im Anschluss folgt das Debriefing und eine kurze Umfrage.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-6 rounded-xl">
            <h4 className="font-semibold text-green-900 mb-3">Beispiel - Richtig:</h4>
            <div className="bg-white p-4 rounded-lg border-2 border-green-200 text-center">
              <div className="text-3xl font-bold text-red-500 mb-3">BLAU</div>
              <p className="text-sm text-green-700">
                Das Wort ist in <span className="font-semibold text-red-500">ROT</span> geschrieben
                <br />→ Klicken Sie auf <strong>ROT</strong>
              </p>
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-xl">
            <h4 className="font-semibold text-red-900 mb-3">Beispiel - Falsch:</h4>
            <div className="bg-white p-4 rounded-lg border-2 border-red-200 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-3">GRÜN</div>
              <p className="text-sm text-red-700">
                Das Wort ist in <span className="font-semibold text-blue-500">BLAU</span> geschrieben
                <br />→ <strong>Nicht</strong> auf GRÜN klicken!
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Data consent section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="consent"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="consent" className="text-sm text-gray-700 cursor-pointer">
            Ich bestätige, dass ich mit der Teilnahme an diesem Test und der 
            anonymisierten Verarbeitung meiner Daten zu Forschungszwecken einverstanden bin. 
            Alle Daten werden ausschließlich für wissenschaftliche Zwecke verwendet und 
            können nicht zu meiner Person zurückverfolgt werden.
          </label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <button
          onClick={() => {
            window.scrollTo({ top: 0 });
            onBack();
          }}
          className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-colors duration-200 sm:justify-start"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Zurück
        </button>
        
        <div className="text-center flex-1 sm:flex-none">
          <button
            onClick={onStart}
            disabled={!consentGiven}
            className={`inline-flex items-center justify-center px-8 py-4 font-semibold rounded-xl transition-colors duration-200 shadow-lg transform w-full sm:w-auto ${
              consentGiven
                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl hover:-translate-y-0.5'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Play className="h-5 w-5 mr-2" />
            Test starten
          </button>
          <p className="text-sm text-gray-500 mt-3">
            {consentGiven 
              ? 'Bereit? Dann können wir beginnen!' 
              : 'Einverständniserklärung bestätigen.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
