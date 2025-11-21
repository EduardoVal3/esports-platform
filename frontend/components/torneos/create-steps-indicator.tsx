'use client';

import { Check } from 'lucide-react';

interface StepsIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

const STEP_LABELS = [
  'Info Básica',
  'Detalles',
  'Premios',
  'Anfitrión',
  'Gráficos',
  'Finalizar',
];

export function CreateStepsIndicator({ currentStep, totalSteps, onStepClick }: StepsIndicatorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-300">
          Etapa {currentStep} de {totalSteps}
        </h3>
        <span className="text-xs text-slate-500">
          {Math.round((currentStep / totalSteps) * 100)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <button
              key={stepNumber}
              onClick={() => onStepClick(stepNumber)}
              className={`relative py-2 px-2 rounded-lg transition-all text-xs font-medium ${
                isCurrent
                  ? 'bg-purple-600 text-white'
                  : isCompleted
                  ? 'bg-green-900/50 text-green-300 border border-green-700'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                {isCompleted && <Check className="w-3 h-3" />}
                <span className="truncate">{STEP_LABELS[index]}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
