import { Play, AlertCircle } from 'lucide-react';

interface InstructionsProps {
  onStart: () => void;
}

export default function Instructions({ onStart }: InstructionsProps) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Aufmerksamkeitstest (Stroop-Test)
        </h1>
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

      <div className="text-center">
        <button
          onClick={onStart}
          className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <Play className="h-5 w-5 mr-2" />
          Test starten
        </button>
        <p className="text-sm text-gray-500 mt-3">
          Stellen Sie sicher, dass Sie sich in einer ruhigen Umgebung befinden
        </p>
      </div>
    </div>
  );
}