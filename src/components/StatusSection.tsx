import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { CheckCircle, Clock, FileText, Search, Scale, AlertCircle } from "lucide-react";
import { ProfileHeader } from "./ProfileHeader";

interface UserInfo {
  email: string;
  name?: string;
  isSignup?: boolean;
}

interface StatusSectionProps {
  onComplete: () => void;
  onBack: () => void;
  userInfo: UserInfo;
}

export function StatusSection({ onComplete, onBack, userInfo }: StatusSectionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Document Upload",
      description: "Files received and validated",
      icon: FileText,
      status: "completed"
    },
    {
      id: 2,
      title: "Document Analysis",
      description: "Extracting and verifying document content",
      icon: Search,
      status: currentStep >= 1 ? "completed" : "pending"
    },
    {
      id: 3,
      title: "Legal Precedent Check",
      description: "Searching relevant legal cases and precedents",
      icon: Scale,
      status: currentStep >= 2 ? "completed" : "pending"
    },
    {
      id: 4,
      title: "Final Verification",
      description: "Generating analysis report and recommendations",
      icon: CheckCircle,
      status: currentStep >= 3 ? "completed" : "pending"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return prev + 2;
      });
      
      // Update current step based on progress
      if (progress >= 25 && currentStep < 1) setCurrentStep(1);
      if (progress >= 50 && currentStep < 2) setCurrentStep(2);
      if (progress >= 75 && currentStep < 3) setCurrentStep(3);
    }, 100);

    return () => clearInterval(timer);
  }, [progress, currentStep, onComplete]);

  const getStepStatus = (step: typeof steps[0]) => {
    if (step.status === "completed") return "completed";
    if (step.id - 1 === currentStep) return "processing";
    return "pending";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <ProfileHeader userInfo={userInfo} onLogout={onBack} />
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-slate-800 mb-2">Processing Your Documents</h1>
            <p className="text-slate-600 text-lg">Your documents are being analyzed using advanced verification algorithms</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-xl">Verification Progress</CardTitle>
                <CardDescription className="text-blue-100">
                  Application ID: APP-2025-001
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-slate-700">Overall Progress</span>
                    <span className="text-base font-semibold text-blue-600">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3 bg-slate-200" />
                </div>

                <div className="space-y-6">
                  {steps.map((step) => {
                    const status = getStepStatus(step);
                    const IconComponent = step.icon;
                    
                    return (
                      <div key={step.id} className="flex items-start space-x-4 p-4 rounded-lg bg-slate-50 border border-slate-200">
                        <div className={`rounded-full p-3 shadow-sm ${
                          status === "completed" 
                            ? "bg-green-100 text-green-600 shadow-green-200" 
                            : status === "processing"
                            ? "bg-blue-100 text-blue-600 shadow-blue-200"
                            : "bg-slate-100 text-slate-400"
                        }`}>
                          {status === "processing" ? (
                            <Clock className="h-6 w-6 animate-spin" />
                          ) : (
                            <IconComponent className="h-6 w-6" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-slate-800">{step.title}</h3>
                            <Badge 
                              variant={
                                status === "completed" 
                                  ? "default" 
                                  : status === "processing"
                                  ? "secondary"
                                  : "outline"
                              }
                              className={
                                status === "completed"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : status === "processing"
                                  ? "bg-blue-100 text-blue-800 border-blue-200"
                                  : ""
                              }
                            >
                              {status === "completed" 
                                ? "Completed" 
                                : status === "processing"
                                ? "Processing"
                                : "Pending"
                              }
                            </Badge>
                          </div>
                          <p className="text-slate-600">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
                <CardTitle className="text-lg">Estimated Time</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-4xl font-semibold text-green-600 mb-2">
                    {Math.max(0, Math.ceil((100 - progress) / 10))}
                  </div>
                  <p className="text-slate-600 text-lg">seconds remaining</p>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">System processing at optimal speed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-lg">Current Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-purple-600" />
                  <span className="text-slate-700">Analyzing legal precedents</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-slate-700">Cross-referencing case database</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-indigo-600" />
                  <span className="text-slate-700">Generating recommendations</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}