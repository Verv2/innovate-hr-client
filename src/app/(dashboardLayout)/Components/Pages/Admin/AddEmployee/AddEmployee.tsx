"use client";
import { Button } from "@/components/ui/button";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTrigger,
} from "@/components/ui/stepper";
import { useState } from "react";
import Step1 from "./Step-1";
import Step2 from "./Step-2";

const steps = [1, 2, 3, 4, 5, 6, 7];

const AddEmployee = () => {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="mx-auto space-y-8 text-center">
      <div className="m-auto max-w-2xl">
        <Stepper value={currentStep} onValueChange={setCurrentStep}>
          {steps.map((step) => (
            <StepperItem key={step} step={step} className="not-last:flex-1">
              <StepperTrigger asChild>
                <StepperIndicator />
              </StepperTrigger>
              {step < steps.length && <StepperSeparator />}
            </StepperItem>
          ))}
        </Stepper>
      </div>
      {/* form component */}
      {currentStep === 1 && <Step1 />}
      {currentStep === 2 && <Step2 />}

      <div className="flex justify-center space-x-4">
        <Button
          variant="outline"
          className="w-32"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 1}
        >
          Prev step
        </Button>
        <Button
          variant="outline"
          className="w-32"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep > steps.length}
        >
          Next step
        </Button>
      </div>
      <p
        className="text-muted-foreground mt-2 text-xs"
        role="region"
        aria-live="polite"
      >
        Controlled stepper with checkmarks {currentStep}
      </p>
    </div>
  );
};

export default AddEmployee;
