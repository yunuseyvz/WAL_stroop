/* eslint-disable @typescript-eslint/no-unused-vars */
import { Download, BarChart3, Clock, Target, Zap } from 'lucide-react';
import { TestResults } from '../types/stroop';

interface ResultsProps {
  results: TestResults;
  onRestart: () => void;
  isSaving?: boolean;
  saveError?: string | null;
}

export default function Results({ results, onRestart }: ResultsProps) {
  const exportData = () => {
    const csvContent = [
      ['Trial', 'Word', 'Color', 'Congruent', 'Response', 'Correct', 'Reaction Time (ms)'],
      ...results.trials.map(trial => [
        trial.id,
        trial.word,
        trial.color,
        trial.isCongruent ? 'Yes' : 'No',
        trial.userResponse || 'No Response',
        trial.isCorrect ? 'Yes' : 'No',
        trial.reactionTime || 0
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stroop_test_results_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPerformanceLevel = () => {
    if (results.accuracy >= 0.9 && results.stroopEffect < 100) return { level: 'Ausgezeichnet', color: 'text-green-600', bg: 'bg-green-50' };
    if (results.accuracy >= 0.8 && results.stroopEffect < 200) return { level: 'Gut', color: 'text-blue-600', bg: 'bg-blue-50' };
    if (results.accuracy >= 0.7) return { level: 'Durchschnittlich', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Verbesserungsfähig', color: 'text-red-600', bg: 'bg-red-50' };
  };

  const performance = getPerformanceLevel();

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      {/* Save Status */}
      
      
     


      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Testergebnisse</h2>
        <div className={`inline-flex items-center px-4 py-2 rounded-full ${performance.bg}`}>
          <Target className={`h-5 w-5 mr-2 ${performance.color}`} />
          <span className={`font-semibold ${performance.color}`}>
            {performance.level}
          </span>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-xl text-center">
          <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-blue-900">
            {(results.accuracy * 100).toFixed(1)}%
          </div>
          <div className="text-blue-700">Genauigkeit</div>
        </div>

        <div className="bg-green-50 p-6 rounded-xl text-center">
          <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-green-900">
            {results.averageReactionTime.toFixed(0)}ms
          </div>
          <div className="text-green-700">Ø Reaktionszeit</div>
        </div>

        <div className="bg-purple-50 p-6 rounded-xl text-center">
          <Zap className="h-8 w-8 text-purple-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-purple-900">
            {results.stroopEffect.toFixed(0)}ms
          </div>
          <div className="text-purple-700">Stroop-Effekt</div>
        </div>

        <div className="bg-orange-50 p-6 rounded-xl text-center">
          <Target className="h-8 w-8 text-orange-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-orange-900">
            {results.correctResponses}/{results.totalTrials}
          </div>
          <div className="text-orange-700">Richtige Antworten</div>
        </div>
      </div>

      {/* Detailed analysis */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailanalyse</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Kongruente Trials (Ø):</span>
              <span className="font-semibold">{results.congruentAverageRT.toFixed(0)}ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Inkongruente Trials (Ø):</span>
              <span className="font-semibold">{results.incongruentAverageRT.toFixed(0)}ms</span>
            </div>
            <div className="flex justify-between border-t pt-3">
              <span className="text-gray-600">Interferenz-Effekt:</span>
              <span className="font-semibold text-red-600">+{results.stroopEffect.toFixed(0)}ms</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Interpretation</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Stroop-Effekt:</strong> Misst die kognitive Interferenz. 
              Niedrigere Werte zeigen bessere Aufmerksamkeitskontrolle.
            </p>
            <p>
              <strong>Reaktionszeit:</strong> Durchschnittliche Zeit für alle Antworten. 
              Normale Werte liegen zwischen 500-1000ms.
            </p>
            <p>
              <strong>Genauigkeit:</strong> Prozentsatz korrekter Antworten. 
              Werte über 80% gelten als gut.
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons 
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={exportData}
          className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors duration-200"
        >
          <Download className="h-5 w-5 mr-2" />
          Daten exportieren (CSV)
        </button>
        
        <button
          onClick={onRestart}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200"
        >
          Test wiederholen
        </button>
      </div>
      */}
      <div className="text-center mt-6 text-sm text-gray-500">
        <p>Die Daten wurden gespeichert. Danke für Ihre Teilnahme!</p>
      </div>
    </div>
  );
}