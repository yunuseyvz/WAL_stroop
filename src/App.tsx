import { useState } from 'react';
import Instructions from './components/Instructions';
import StroopTest from './components/StroopTest';
import Results from './components/Results';
import Footer from './components/Footer';
import { Trial, TestResults, TestPhase } from './types/stroop';
import { DatabaseService } from './lib/database';

function App() {
  const [phase, setPhase] = useState<TestPhase>('instructions');
  const [testResults, setTestResults] = useState<TestResults | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [participantId, setParticipantId] = useState<string | null>(null);

  const startTest = () => {
    setPhase('test');
  };

  const completeTest = async (trials: Trial[]) => {
    // Calculate results
    const completedTrials = trials.filter(t => t.reactionTime !== undefined);
    const correctTrials = completedTrials.filter(t => t.isCorrect);
    const congruentTrials = completedTrials.filter(t => t.isCongruent);
    const incongruentTrials = completedTrials.filter(t => !t.isCongruent);
    
    const correctCongruentTrials = congruentTrials.filter(t => t.isCorrect);
    const correctIncongruentTrials = incongruentTrials.filter(t => t.isCorrect);

    const congruentAverageRT = correctCongruentTrials.length > 0 
      ? correctCongruentTrials.reduce((sum, t) => sum + (t.reactionTime || 0), 0) / correctCongruentTrials.length
      : 0;

    const incongruentAverageRT = correctIncongruentTrials.length > 0
      ? correctIncongruentTrials.reduce((sum, t) => sum + (t.reactionTime || 0), 0) / correctIncongruentTrials.length
      : 0;

    const results: TestResults = {
      totalTrials: completedTrials.length,
      correctResponses: correctTrials.length,
      accuracy: correctTrials.length / completedTrials.length,
      averageReactionTime: correctTrials.reduce((sum, t) => sum + (t.reactionTime || 0), 0) / correctTrials.length,
      congruentAverageRT,
      incongruentAverageRT,
      stroopEffect: incongruentAverageRT - congruentAverageRT,
      trials: completedTrials
    };

    setTestResults(results);
    
    // Save results to database
    setIsSaving(true);
    setSaveError(null);
    
    try {
      const saveResult = await DatabaseService.saveTestResults(results);
      if (!saveResult.success) {
        setSaveError(saveResult.error || 'Fehler beim Speichern der Ergebnisse');
        console.error('Failed to save results:', saveResult.error);
      } else {
        console.log('Results saved successfully with ID:', saveResult.id);
        // Speichere die Teilnehmer-ID für den Umfrage-Link
        if (saveResult.participantId) {
          setParticipantId(saveResult.participantId);
        }
      }
    } catch (error) {
      setSaveError('Unerwarteter Fehler beim Speichern');
      console.error('Unexpected error saving results:', error);
    } finally {
      setIsSaving(false);
    }
    
    setPhase('results');
  };

  const restartTest = () => {
    setPhase('instructions');
    setTestResults(null);
    setSaveError(null);
    setParticipantId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <div className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          {phase === 'instructions' && (
            <Instructions onStart={startTest} />
          )}
          
          {phase === 'test' && (
            <StroopTest onComplete={completeTest} />
          )}
          
          {phase === 'results' && testResults && (
            <Results 
              results={testResults} 
              onRestart={restartTest} 
              isSaving={isSaving}
              saveError={saveError}
              participantId={participantId}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;