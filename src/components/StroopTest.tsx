import { useState, useEffect, useCallback } from 'react';
import { Trial } from '../types/stroop';

interface StroopTestProps {
  onComplete: (trials: Trial[]) => void;
}

const COLORS = ['ROT', 'BLAU', 'GRÜN', 'GELB'];
const NUM_TRIALS = 20; 

const COLOR_CLASSES = {
  'ROT': 'text-red-500',
  'BLAU': 'text-blue-500',
  'GRÜN': 'text-green-500',
  'GELB': 'text-yellow-500'
};

const COLOR_BUTTONS = {
  'ROT': 'bg-red-500 hover:bg-red-600',
  'BLAU': 'bg-blue-500 hover:bg-blue-600',
  'GRÜN': 'bg-green-500 hover:bg-green-600',
  'GELB': 'bg-yellow-500 hover:bg-yellow-600'
};

export default function StroopTest({ onComplete }: StroopTestProps) {
  const [trials, setTrials] = useState<Trial[]>([]);
  const [currentTrialIndex, setCurrentTrialIndex] = useState(0);
  const [currentTrial, setCurrentTrial] = useState<Trial | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackCorrect, setFeedbackCorrect] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isCountingDown, setIsCountingDown] = useState(false);

  // Generate trials
  useEffect(() => {
    const generateTrials = (): Trial[] => {
      const trialList: Trial[] = [];
      let id = 1;

      // Generate congruent and incongruent trials
      COLORS.forEach(word => {
        COLORS.forEach(color => {
          trialList.push({
            id: id++,
            word,
            color,
            isCongruent: word === color,
            startTime: 0
          });
        });
      });

      // Shuffle trials
      for (let i = trialList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [trialList[i], trialList[j]] = [trialList[j], trialList[i]];
      }

      if (NUM_TRIALS > trialList.length) {
        const repetitions = Math.ceil(NUM_TRIALS / trialList.length);
        const expandedTrials: Trial[] = [];
        let currentId = 1;
        
        for (let rep = 0; rep < repetitions; rep++) {
          const shuffledCopy = [...trialList];
          for (let i = shuffledCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCopy[i], shuffledCopy[j]] = [shuffledCopy[j], shuffledCopy[i]];
          }
          
          shuffledCopy.forEach(trial => {
            expandedTrials.push({
              ...trial,
              id: currentId++
            });
          });
        }
        
        return expandedTrials.slice(0, NUM_TRIALS);
      }

      return trialList.slice(0, NUM_TRIALS); 
    };

    const generatedTrials = generateTrials();
    setTrials(generatedTrials);
    
    setTimeout(() => {
      setIsCountingDown(true);
      setCountdown(3);
    }, 500);
  }, []);

  useEffect(() => {
    if (isCountingDown && countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        setIsCountingDown(false);
        setCountdown(null);
        setIsReady(true);
      }
    }
  }, [countdown, isCountingDown]);

  // Start trial
  useEffect(() => {
    if (isReady && trials.length > 0 && currentTrialIndex < trials.length) {
      const trial = { ...trials[currentTrialIndex], startTime: Date.now() };
      setCurrentTrial(trial);
    }
  }, [isReady, currentTrialIndex, trials]);

  const handleResponse = useCallback((response: string) => {
    if (!currentTrial) return;

    const endTime = Date.now();
    const reactionTime = endTime - currentTrial.startTime;
    const isCorrect = response === currentTrial.color;

    const completedTrial: Trial = {
      ...currentTrial,
      endTime,
      reactionTime,
      userResponse: response,
      isCorrect
    };

    // Update trials array
    const updatedTrials = [...trials];
    updatedTrials[currentTrialIndex] = completedTrial;
    setTrials(updatedTrials);

    // Show feedback
    setFeedbackCorrect(isCorrect);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      
      if (currentTrialIndex + 1 >= trials.length) {
        // Test complete
        onComplete(updatedTrials);
      } else {
        // Next trial
        setCurrentTrialIndex(prev => prev + 1);
      }
    }, 800);
  }, [currentTrial, trials, currentTrialIndex, onComplete]);

  if (isCountingDown && countdown !== null) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg text-center">
        <div className="mb-8">
          <div className="text-8xl font-bold text-blue-600 mb-4 animate-pulse">
            {countdown > 0 ? countdown : "LOS!"}
          </div>
          <p className="text-lg text-gray-600">
            {countdown > 0 ? "Test beginnt in..." : "Der Test beginnt jetzt!"}
          </p>
          <p className="text-sm text-gray-500 mt-2">Machen Sie sich bereit</p>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-blue-600 mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
          <p className="text-lg text-gray-600">Bereite Test vor...</p>
        </div>
      </div>
    );
  }

  if (showFeedback) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg text-center">
        <div className={`text-6xl font-bold mb-4 ${feedbackCorrect ? 'text-green-500' : 'text-red-500'}`}>
          {feedbackCorrect ? '✓' : '✗'}
        </div>
        <p className={`text-lg ${feedbackCorrect ? 'text-green-600' : 'text-red-600'}`}>
          {feedbackCorrect ? 'Richtig!' : 'Falsch'}
        </p>
      </div>
    );
  }

  if (!currentTrial) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-lg text-center">
        <p>Lade nächste Aufgabe...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Fortschritt</span>
          <span>{currentTrialIndex + 1} / {trials.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentTrialIndex + 1) / trials.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current trial */}
      <div className="text-center mb-12">
        <div className="mb-8">
          <div 
            className={`text-8xl font-bold mb-6 ${COLOR_CLASSES[currentTrial.color as keyof typeof COLOR_CLASSES]}`}
          >
            {currentTrial.word}
          </div>
          <p className="text-lg text-gray-600">
            Klicken Sie auf die <strong>Farbe</strong> des Wortes
          </p>
        </div>

        {/* Color buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {COLORS.map(color => (
            <button
              key={color}
              onClick={() => handleResponse(color)}
              className={`${COLOR_BUTTONS[color as keyof typeof COLOR_BUTTONS]} text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Instructions reminder */}
      <div className="text-center text-sm text-gray-500">
        <p>Ignorieren Sie das Wort - klicken Sie nur auf die Farbe!</p>
      </div>
    </div>
  );
}