export interface Trial {
  id: number;
  word: string;
  color: string;
  isCongruent: boolean;
  startTime: number;
  endTime?: number;
  reactionTime?: number;
  userResponse?: string;
  isCorrect?: boolean;
}

export interface TestResults {
  totalTrials: number;
  correctResponses: number;
  accuracy: number;
  averageReactionTime: number;
  congruentAverageRT: number;
  incongruentAverageRT: number;
  stroopEffect: number;
  trials: Trial[];
}

export type TestPhase = 'instructions' | 'test' | 'results';