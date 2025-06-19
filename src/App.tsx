import React, { useState } from 'react';
import Instructions from './components/Instructions';
import StroopTest from './components/StroopTest';
import Results from './components/Results';
import { Trial, TestResults, TestPhase } from './types/stroop';

function App() {
  const [phase, setPhase] = useState<TestPhase>('instructions');
  const [testResults, setTestResults] = useState<TestResults | null>(null);

  const startTest = () => {
    setPhase('test');
  };

  const completeTest = (trials: Trial[]) => {
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
    setPhase('results');
  };

  const restartTest = () => {
    setPhase('instructions');
    setTestResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="container mx-auto">
        {phase === 'instructions' && (
          <Instructions onStart={startTest} />
        )}
        
        {phase === 'test' && (
          <StroopTest onComplete={completeTest} />
        )}
        
        {phase === 'results' && testResults && (
          <Results results={testResults} onRestart={restartTest} />
        )}
      </div>
    </div>
  );
}

export default App;