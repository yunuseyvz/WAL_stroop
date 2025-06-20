import { supabase } from './supabase';
import { TestResults, Trial } from '../types/stroop';

export interface DatabaseTestResult {
  id?: string;
  participant_id?: string;
  test_date: string;
  total_trials: number;
  correct_responses: number;
  accuracy: number;
  average_reaction_time: number;
  congruent_average_rt: number;
  incongruent_average_rt: number;
  stroop_effect: number;
  trials: Trial[];
  created_at?: string;
}

export class DatabaseService {
  static async saveTestResults(results: TestResults, participantId?: string): Promise<{ success: boolean; error?: string; id?: string }> {
    try {
      const testResult: DatabaseTestResult = {
        participant_id: participantId || this.generateParticipantId(),
        test_date: new Date().toISOString(),
        total_trials: results.totalTrials,
        correct_responses: results.correctResponses,
        accuracy: results.accuracy,
        average_reaction_time: results.averageReactionTime,
        congruent_average_rt: results.congruentAverageRT,
        incongruent_average_rt: results.incongruentAverageRT,
        stroop_effect: results.stroopEffect,
        trials: results.trials
      };

      const { data, error } = await supabase
        .from('stroop_results')
        .insert([testResult])
        .select()
        .single();

      if (error) {
        console.error('Error saving test results:', error);
        return { success: false, error: error.message };
      }

      return { success: true, id: data.id };
    } catch (error) {
      console.error('Unexpected error saving test results:', error);
      return { success: false, error: 'Unerwarteter Fehler beim Speichern' };
    }
  }

  static async getTestResults(participantId?: string): Promise<{ success: boolean; data?: DatabaseTestResult[]; error?: string }> {
    try {
      let query = supabase
        .from('stroop_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (participantId) {
        query = query.eq('participant_id', participantId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching test results:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Unexpected error fetching test results:', error);
      return { success: false, error: 'Unerwarteter Fehler beim Laden der Daten' };
    }
  }

  private static generateParticipantId(): string {
    return `participant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
