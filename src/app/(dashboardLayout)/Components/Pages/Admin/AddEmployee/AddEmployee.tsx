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
import Step3 from "./Step-3";
import Step4 from "./Step-4";
import Step5 from "./Step-5";
import Step6 from "./Step-6";
import Step7 from "./Step-7";
import {
  useAddTemporaryEmployee,
  useGetTemporaryEmployee,
} from "@/hooks/admin.hooks";
import Loading from "@/app/(commonLayout)/Components/UI/Loading/Loading";

const steps = [1, 2, 3, 4, 5, 6, 7] as const;

const FINAL_FORM_STEP = 6;

const AddEmployee = () => {
  const { mutateAsync: handleUseAddTemporaryEmployee, isPending } =
    useAddTemporaryEmployee();
  const {
    data: employeeData,
    isLoading: temporaryEmployeeLoading,
    refetch,
  } = useGetTemporaryEmployee();

  const [currentStep, setCurrentStep] = useState(1);

  const temporaryEmployeeData = employeeData?.data;

  const backendStep = temporaryEmployeeData?.step ?? 1;

  const maxAllowedStep = backendStep >= FINAL_FORM_STEP ? 7 : backendStep;

  console.log("temporary", temporaryEmployeeData);

  if (temporaryEmployeeLoading) {
    return <Loading />;
  }

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
      {currentStep === 1 && (
        <Step1
          handleUseAddTemporaryEmployee={handleUseAddTemporaryEmployee}
          isPending={isPending}
          basicInfo={temporaryEmployeeData?.data?.basicInfo}
          onRefetch={async () => {
            await refetch();
            setCurrentStep(2);
          }}
        />
      )}
      {currentStep === 2 && (
        <Step2
          handleUseAddTemporaryEmployee={handleUseAddTemporaryEmployee}
          isPending={isPending}
          contactInformation={temporaryEmployeeData?.data?.contactInformation}
          onRefetch={async () => {
            await refetch();
            setCurrentStep(3);
          }}
        />
      )}
      {currentStep === 3 && (
        <Step3
          handleUseAddTemporaryEmployee={handleUseAddTemporaryEmployee}
          isPending={isPending}
          identificationDocuments={{
            ...temporaryEmployeeData?.data?.identificationDocuments,
            passportOrNationalIdUrl:
              temporaryEmployeeData?.data?.passportOrNationalIdUrl,
          }}
          onRefetch={async () => {
            await refetch();
            setCurrentStep(4);
          }}
        />
      )}
      {currentStep === 4 && (
        <Step4
          handleUseAddTemporaryEmployee={handleUseAddTemporaryEmployee}
          isPending={isPending}
          employeeDetails={temporaryEmployeeData?.data?.employeeDetails}
          onRefetch={async () => {
            await refetch();
            setCurrentStep(5);
          }}
        />
      )}
      {currentStep === 5 && (
        <Step5
          handleUseAddTemporaryEmployee={handleUseAddTemporaryEmployee}
          isPending={isPending}
          financialInformation={
            temporaryEmployeeData?.data?.financialInformation
          }
          onRefetch={async () => {
            await refetch();
            setCurrentStep(6);
          }}
        />
      )}
      {currentStep === 6 && (
        <Step6
          handleUseAddTemporaryEmployee={handleUseAddTemporaryEmployee}
          isPending={isPending}
          onRefetch={async () => {
            await refetch();
            setCurrentStep(7);
          }}
        />
      )}
      {currentStep === 7 && (
        <Step7
          previewData={temporaryEmployeeData?.data}
          creationDate={{
            createdAt: temporaryEmployeeData.createdAt,
            updatedAt: temporaryEmployeeData.updatedAt,
          }}
        />
      )}

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
          // disabled={currentStep >= steps.length}
          disabled={
            currentStep >= steps.length || currentStep >= maxAllowedStep
          }
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
