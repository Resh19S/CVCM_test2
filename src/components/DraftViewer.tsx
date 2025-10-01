import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { CheckCircle, FileText, Download, X, AlertTriangle, Scale } from "lucide-react";
import { ProfileHeader } from "./ProfileHeader";

interface UserInfo {
  email: string;
  name?: string;
  isSignup?: boolean;
}

interface DraftData {
  applicant_id: string;
  claimed_subcast: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  probability_assessment: string;
}

interface DraftViewerProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: UserInfo;
  draftData: DraftData;
}

export function DraftViewer({ isOpen, onClose, userInfo, draftData }: DraftViewerProps) {
  const handleDownloadDraft = () => {
    // Create a formatted draft document
    const draftContent = `
DOCUMENT VERIFICATION IMPROVEMENT DRAFT
=====================================

Application ID: ${draftData.applicant_id}
Claimed Subcaste: ${draftData.claimed_subcast.replace(/_/g, ' ')}
Assessment: ${draftData.probability_assessment}

CURRENT STRENGTHS:
${draftData.strengths.map((strength, index) => `${index + 1}. ${strength}`).join('\n')}

AREAS FOR IMPROVEMENT:
${draftData.weaknesses.map((weakness, index) => `${index + 1}. ${weakness}`).join('\n')}

RECOMMENDED ACTIONS:
${draftData.suggestions.map((suggestion, index) => `${index + 1}. ${suggestion}`).join('\n')}

---
Generated on: ${new Date().toLocaleDateString()}
Document Verification System
    `.trim();

    const blob = new Blob([draftContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `improvement-draft-${draftData.applicant_id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <FileText className="h-6 w-6 mr-3 text-blue-600" />
            Document Improvement Draft
          </DialogTitle>
          <DialogDescription>
            Detailed recommendations to strengthen your caste certificate application
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Application Info */}
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Application ID</p>
                  <p className="font-semibold text-slate-800">{draftData.applicant_id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Claimed Subcaste</p>
                  <p className="font-semibold text-slate-800">{draftData.claimed_subcast.replace(/_/g, ' ')}</p>
                </div>
              </div>
              <div className="mt-3">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                  {draftData.probability_assessment}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Strengths */}
          <Card className="border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center text-green-800">
                <CheckCircle className="h-5 w-5 mr-2" />
                Current Strengths
              </CardTitle>
              <CardDescription className="text-green-700">
                Positive aspects of your current application
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                {draftData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="border-red-200">
            <CardHeader className="bg-red-50">
              <CardTitle className="flex items-center text-red-800">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Areas for Improvement
              </CardTitle>
              <CardDescription className="text-red-700">
                Issues that may affect your application's success
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-2">
                {draftData.weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{weakness}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Plan */}
          <Card className="border-blue-200">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center text-blue-800">
                <Scale className="h-5 w-5 mr-2" />
                Recommended Action Plan
              </CardTitle>
              <CardDescription className="text-blue-700">
                Step-by-step improvements to strengthen your application
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <ol className="space-y-3">
                {draftData.suggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-slate-700">{suggestion}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button onClick={handleDownloadDraft} className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Download className="h-4 w-4 mr-2" />
              Download Draft Report
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1">
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}