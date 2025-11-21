'use client';

import { useState, useCallback } from 'react';
import { TournamentFormData } from '@/types';

const initialFormData: TournamentFormData = {
  title: '',
  description: '',
  registrationStart: '',
  registrationEnd: '',
  tournamentStart: '',
  gameId: '',
  platform: '',
  gameMode: '',
  region: '',
  tournamentType: 'Eliminación simple',
  bestOf: 1,
  format: '',
  isClosed: false,
  rulesType: 'basic',
  customRules: '',
  allowPC: true,
  requireStream: false,
  requireWebcam: false,
  inputType: 'Todos',
  maxParticipants: 16,
  entryFee: 0,
  totalPrizePool: 0,
  hostCommissionPercentage: 10,
  firstPlacePercentage: 60,
  secondPlacePercentage: 40,
  hostContact: '',
  twitchUrl: '',
  discordUrl: '',
  youtubeUrl: '',
  facebookUrl: '',
  xUrl: '',
  discordServer: '',
  isReady: false,
};

export function useTournamentForm() {
  const [formData, setFormData] = useState<TournamentFormData>(initialFormData);
  const [currentStage, setCurrentStage] = useState(1);

  const updateField = useCallback((field: keyof TournamentFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const updateMultipleFields = useCallback((updates: Partial<TournamentFormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const goToStage = useCallback((stage: number) => {
    setCurrentStage(stage);
  }, []);

  const nextStage = useCallback(() => {
    if (currentStage < 6) {
      setCurrentStage((prev) => prev + 1);
    }
  }, [currentStage]);

  const prevStage = useCallback(() => {
    if (currentStage > 1) {
      setCurrentStage((prev) => prev - 1);
    }
  }, [currentStage]);

  const reset = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStage(1);
  }, []);

  return {
    formData,
    currentStage,
    updateField,
    updateMultipleFields,
    goToStage,
    nextStage,
    prevStage,
    reset,
  };
}
