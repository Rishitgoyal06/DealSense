"use client";

import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface TourStep {
  target: string;
  title: string;
  description: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface TourProps {
  steps: TourStep[];
  isOpen: boolean;
  onClose: () => void;
}

export default function Tour({ steps, isOpen, onClose }: TourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !steps[currentStep]) return;

    const updateTargetPosition = () => {
      const target = document.querySelector(steps[currentStep].target);
      if (target) {
        setTargetRect(target.getBoundingClientRect());
      }
    };

    updateTargetPosition();
    window.addEventListener('resize', updateTargetPosition);
    window.addEventListener('scroll', updateTargetPosition);

    return () => {
      window.removeEventListener('resize', updateTargetPosition);
      window.removeEventListener('scroll', updateTargetPosition);
    };
  }, [isOpen, currentStep, steps]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getTooltipPosition = () => {
    if (!targetRect) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const placement = steps[currentStep].placement || 'bottom';
    const offset = 20;

    switch (placement) {
      case 'top':
        return {
          top: targetRect.top - offset,
          left: targetRect.left + targetRect.width / 2,
          transform: 'translate(-50%, -100%)',
        };
      case 'bottom':
        return {
          top: targetRect.bottom + offset,
          left: targetRect.left + targetRect.width / 2,
          transform: 'translate(-50%, 0)',
        };
      case 'left':
        return {
          top: targetRect.top + targetRect.height / 2,
          left: targetRect.left - offset,
          transform: 'translate(-100%, -50%)',
        };
      case 'right':
        return {
          top: targetRect.top + targetRect.height / 2,
          left: targetRect.right + offset,
          transform: 'translate(0, -50%)',
        };
      default:
        return {
          top: targetRect.bottom + offset,
          left: targetRect.left + targetRect.width / 2,
          transform: 'translate(-50%, 0)',
        };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" ref={overlayRef}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Highlight */}
      {targetRect && (
        <div
          className="absolute border-4 border-primary rounded-lg pointer-events-none"
          style={{
            top: targetRect.top - 4,
            left: targetRect.left - 4,
            width: targetRect.width + 8,
            height: targetRect.height + 8,
          }}
        />
      )}

      {/* Tooltip */}
      <div
        className="absolute z-10 max-w-sm"
        style={getTooltipPosition()}
      >
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-base-content">
                {steps[currentStep].title}
              </h3>
              <button
                onClick={onClose}
                className="btn btn-ghost btn-xs"
              >
                <X size={16} />
              </button>
            </div>
            
            <p className="text-base-content/70 mb-4">
              {steps[currentStep].description}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-sm text-base-content/60">
                {currentStep + 1} of {steps.length}
              </span>
              
              <div className="flex gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={prevStep}
                    className="btn btn-ghost btn-sm"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>
                )}
                
                <button
                  onClick={nextStep}
                  className="btn btn-sm text-white"
                  style={{ backgroundColor: "#166534" }}
                >
                  {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < steps.length - 1 && <ChevronRight size={16} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}