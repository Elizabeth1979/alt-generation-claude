"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { ArrowLeft } from "lucide-react";

interface Step {
  question: string;
  options: {
    text: string;
    action: () => void;
  }[];
}

const AltTextHelper = () => {
  const [step, setStep] = useState(1);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<number[]>([]);

  const goBack = () => {
    if (history.length > 0) {
      const newHistory = [...history];
      const previousStep = newHistory.pop();
      setHistory(newHistory);
      setStep(previousStep || 1);
      setResult("");
    }
  };

  const moveToStep = (nextStep: number) => {
    setHistory([...history, step]);
    setStep(nextStep);
  };

  const setFinalResult = (resultText: string) => {
    setResult(resultText);
    setHistory([...history, step]);
    setStep(7);
  };

  const resetFlow = () => {
    setStep(1);
    setResult("");
    setHistory([]);
  };

  const steps: Record<number, Step> = {
    1: {
      question: "Does the image contain text?",
      options: [
        { text: "Yes", action: () => moveToStep(2) },
        { text: "No", action: () => moveToStep(4) },
      ],
    },
    2: {
      question: "Is the text also present nearby?",
      options: [
        { text: "Yes", action: () => setFinalResult('Use empty alt=""') },
        { text: "No", action: () => moveToStep(3) },
      ],
    },
    3: {
      question: "What's the purpose of the text?",
      options: [
        { text: "Visual effects only", action: () => setFinalResult('Use empty alt=""') },
        {
          text: "Functions as an icon",
          action: () =>
            setFinalResult('Alt text should describe the function (e.g., "Search button")'),
        },
        {
          text: "Contains unique information",
          action: () => setFinalResult("Include the text in the alt attribute"),
        },
      ],
    },
    4: {
      question: "Is the image used in a link or button?",
      options: [
        {
          text: "Yes",
          action: () => setFinalResult("Alt text should describe the action or destination"),
        },
        { text: "No", action: () => moveToStep(5) },
      ],
    },
    5: {
      question: "Does the image add meaning to the page?",
      options: [
        { text: "Yes", action: () => moveToStep(6) },
        { text: "No", action: () => setFinalResult('Use empty alt=""') },
      ],
    },
    6: {
      question: "What type of image is it?",
      options: [
        {
          text: "Simple image or photo",
          action: () => setFinalResult("Use a brief description that conveys the meaning"),
        },
        {
          text: "Complex graph or chart",
          action: () =>
            setFinalResult(
              "Provide brief alt text and include detailed information elsewhere on the page"
            ),
        },
        {
          text: "Shows content that's already in nearby text",
          action: () => setFinalResult('Use empty alt=""'),
        },
      ],
    },
  };

  const renderContent = () => {
    if (step === 7) {
      return (
        <div className="space-y-4">
          <Alert>
            <AlertDescription>{result}</AlertDescription>
          </Alert>
          <Button onClick={resetFlow} className="w-full">
            Start Over
          </Button>
        </div>
      );
    }

    const currentStep = steps[step];
    if (!currentStep) return null;

    return (
      <div className="space-y-4">
        <h3 className="font-medium">{currentStep.question}</h3>
        <div className="space-y-2">
          {currentStep.options.map((option, index) => (
            <Button
              key={index}
              onClick={option.action}
              className="w-full"
              variant={index === 0 ? "default" : "secondary"}
            >
              {option.text}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center">
        {history.length > 0 && step !== 7 && (
          <Button variant="ghost" size="icon" onClick={goBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
};

export default AltTextHelper;
