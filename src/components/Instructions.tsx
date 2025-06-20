import { useState } from 'react';
import WelcomeScreen from './WelcomeScreen';
import TestInstructions from './TestInstructions';

interface InstructionsProps {
  onStart: () => void;
}

export default function Instructions({ onStart }: InstructionsProps) {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'instructions'>('welcome');

  const handleContinue = () => {
    setCurrentScreen('instructions');
  };

  const handleBack = () => {
    setCurrentScreen('welcome');
  };

  if (currentScreen === 'welcome') {
    return <WelcomeScreen onContinue={handleContinue} />;
  }

  return <TestInstructions onStart={onStart} onBack={handleBack} />;
}