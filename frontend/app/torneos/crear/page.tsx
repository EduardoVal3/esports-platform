'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTournamentForm } from '@/hooks/use-tournament-form';
import { CreateStepsIndicator } from '@/components/torneos/create-steps-indicator';
import { Stage1BasicInfo } from '@/components/torneos/create-stages/stage-1-basic-info';
import { Stage2Details } from '@/components/torneos/create-stages/stage-2-details';
import { Stage3Prizes } from '@/components/torneos/create-stages/stage-3-prizes';
import { Stage4Host } from '@/components/torneos/create-stages/stage-4-host';
import { Stage5Graphics } from '@/components/torneos/create-stages/stage-5-graphics';
import { Stage6Finalize } from '@/components/torneos/create-stages/stage-6-finalize';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';

export default function CreateTournamentPage() {
  const {
    formData,
    currentStage,
    updateField,
    goToStage,
    nextStage,
    prevStage,
    reset,
  } = useTournamentForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Torneo creado:', formData);
    alert('¡Torneo creado exitosamente! Estado: Próximamente');
    reset();
    setIsSubmitting(false);
  };

  const canProceedToNext =
    currentStage === 1
      ? formData.title && formData.description && formData.registrationStart && formData.registrationEnd && formData.tournamentStart
      : currentStage === 2
      ? formData.gameId && formData.platform && formData.gameMode && formData.region && formData.format
      : currentStage === 3
      ? formData.totalPrizePool > 0
      : currentStage === 4
      ? formData.hostContact
      : currentStage === 5
      ? true
      : true;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Crear Nuevo Torneo</h1>
        <p className="text-slate-400">Completa los siguientes pasos para crear tu torneo</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar con Steps */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 border-slate-700 p-6 sticky top-8">
            <CreateStepsIndicator
              currentStep={currentStage}
              totalSteps={6}
              onStepClick={goToStage}
            />
          </Card>
        </div>

        {/* Contenido Principal */}
        <div className="lg:col-span-3 space-y-6">
          {/* Etapa Actual */}
          <div>
            {currentStage === 1 && <Stage1BasicInfo data={formData} onUpdate={updateField} />}
            {currentStage === 2 && <Stage2Details data={formData} onUpdate={updateField} />}
            {currentStage === 3 && <Stage3Prizes data={formData} onUpdate={updateField} />}
            {currentStage === 4 && <Stage4Host data={formData} onUpdate={updateField} />}
            {currentStage === 5 && <Stage5Graphics data={formData} onUpdate={updateField} />}
            {currentStage === 6 && <Stage6Finalize data={formData} onUpdate={updateField} />}
          </div>

          {/* Botones de Navegación */}
          <Card className="bg-slate-800/50 border-slate-700 p-6 flex gap-3 justify-between sticky bottom-0">
            <Button
              onClick={prevStage}
              disabled={currentStage === 1}
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </Button>

            {currentStage < 6 ? (
              <Button
                onClick={nextStage}
                disabled={!canProceedToNext}
                className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Siguiente
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Publicando...' : 'Publicar Torneo'}
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
