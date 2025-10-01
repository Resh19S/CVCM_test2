import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Scale, 
  Calendar,
  ExternalLink,
  RotateCcw,
  Download
} from "lucide-react";
import { ProfileHeader } from "./ProfileHeader";
import { useCallback, useMemo } from "react";

interface UserInfo {
  email: string;
  name?: string;
  isSignup?: boolean;
}

interface LegalPrecedent {
  case_title: string;
  court: string;
  date: string;
  document_url: string;
  relevance_score: number;
  key_similarities?: string[] | null;
  key_differences?: string[] | null;
  outcome: string;
}

interface LegalAnalysis {
  current_applicant_strengths: string[];
  current_applicant_weaknesses: string[];
  probability_assessment: string;
}

interface SubcastLegalAnalysis {
  applicant_id: string;
  claimed_subcast: string;
  supporting_precedents: LegalPrecedent[];
  contradicting_precedents: LegalPrecedent[];
  legal_analysis: LegalAnalysis;
  draft_suggestions: string[];
}

interface Results {
  subcast_legal_analysis: SubcastLegalAnalysis;
}

interface ResultsSectionProps {
  results: Results | null;
  onViewDraft: () => void;
  onStartNew: () => void;
  userInfo: UserInfo;
}

export function ResultsSection({ results, onViewDraft, onStartNew, userInfo }: ResultsSectionProps) {
  // Add loading check
  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading legal analysis...</p>
        </div>
      </div>
    );
  }

  const { subcast_legal_analysis } = results;

  const formatDate = useCallback((dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  }, []);

  const userName = useMemo(() => {
    return userInfo.name || userInfo.email.split('@')[0].replace(/[._]/g, ' ').toUpperCase();
  }, [userInfo]);

  const handleLogout = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader userInfo={userInfo} onLogout={handleLogout} />

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="text-center lg:text-left mb-4 lg:mb-0">
              <h1 className="text-3xl font-semibold text-slate-800 mb-2">Legal Analysis Results</h1>
              <p className="text-slate-600 text-lg">Caste certificate legal precedent analysis</p>
            </div>
            <div className="flex gap-3 justify-center lg:justify-end">
              <Button onClick={onStartNew} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg">
                <RotateCcw className="h-4 w-4 mr-2" />
                Analyze New Draft
              </Button>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <Card className="mb-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center space-x-6">
                <div className="bg-blue-100 text-blue-600 shadow-blue-200 rounded-full p-4 shadow-lg">
                  <Scale className="h-10 w-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                    Legal Precedent Analysis
                  </h2>
                  <div className="space-y-1">
                    <p className="text-slate-600">
                      <span className="font-medium">Application ID:</span> {subcast_legal_analysis.applicant_id}
                    </p>
                    <p className="text-slate-600">
                      <span className="font-medium">Detected Category:</span> {subcast_legal_analysis.claimed_subcast.replace(/_/g, ' ')}
                    </p>
                  </div>
                </div>
              </div>
              <Badge 
                variant="secondary"
                className="px-6 py-3 text-base font-medium bg-blue-100 text-blue-800 border-blue-200"
              >
                {subcast_legal_analysis.legal_analysis.probability_assessment}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Legal Analysis Summary */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <Scale className="h-6 w-6 mr-3" />
              Current Application Assessment
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Strengths
                </h4>
                <ul className="space-y-2">
                  {subcast_legal_analysis.legal_analysis.current_applicant_strengths.map((strength, index) => (
                    <li key={index} className="text-slate-700 flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center">
                  <XCircle className="h-5 w-5 mr-2" />
                  Areas of Concern
                </h4>
                <ul className="space-y-2">
                  {subcast_legal_analysis.legal_analysis.current_applicant_weaknesses.map((weakness, index) => (
                    <li key={index} className="text-slate-700 flex items-start">
                      <XCircle className="h-4 w-4 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Improvement Recommendations */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center text-xl">
              <AlertTriangle className="h-6 w-6 mr-3" />
              Recommendations to Strengthen Application
            </CardTitle>
            <CardDescription className="text-amber-100">
              Action items based on legal precedent analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {subcast_legal_analysis.draft_suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-slate-700 text-sm">{suggestion}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Supporting Precedents */}
        {subcast_legal_analysis.supporting_precedents.length > 0 && (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2" />
                Supporting Legal Precedents ({subcast_legal_analysis.supporting_precedents.length})
              </CardTitle>
              <CardDescription>
                Court cases that support similar applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subcast_legal_analysis.supporting_precedents.map((precedent, index) => (
                  <div key={index} className="border-2 border-green-200 rounded-lg p-4 bg-green-50 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-sm leading-tight flex-1 pr-2">{precedent.case_title}</h4>
                      <Badge variant="outline" className="text-xs bg-green-100 text-green-800 border-green-300 shrink-0">
                        Score: {precedent.relevance_score}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{precedent.court}</p>
                    
                    {precedent.key_similarities && (
                      <div className="mb-3 flex-grow">
                        <h5 className="text-xs font-medium text-green-700 mb-2">Key Similarities:</h5>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {precedent.key_similarities.map((similarity, simIndex) => (
                            <li key={simIndex} className="leading-relaxed">• {similarity}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-green-100">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1 shrink-0" />
                        {formatDate(precedent.date)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-green-700">
                          {precedent.outcome}
                        </span>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0 text-xs text-green-600 hover:text-green-800"
                          onClick={() => window.open(precedent.document_url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Case
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contradicting Precedents */}
        {subcast_legal_analysis.contradicting_precedents.length > 0 && (
          <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center">
                <XCircle className="h-6 w-6 mr-2" />
                Challenging Legal Precedents ({subcast_legal_analysis.contradicting_precedents.length})
              </CardTitle>
              <CardDescription>
                Court cases that highlight potential challenges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subcast_legal_analysis.contradicting_precedents.map((precedent, index) => (
                  <div key={index} className="border-2 border-red-200 rounded-lg p-4 bg-red-50 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-sm leading-tight flex-1 pr-2">{precedent.case_title}</h4>
                      <Badge variant="outline" className="text-xs bg-red-100 text-red-800 border-red-300 shrink-0">
                        Score: {precedent.relevance_score}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{precedent.court}</p>
                    
                    {precedent.key_differences && (
                      <div className="mb-3 flex-grow">
                        <h5 className="text-xs font-medium text-red-700 mb-2">Key Differences:</h5>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {precedent.key_differences.map((diff, diffIndex) => (
                            <li key={diffIndex} className="leading-relaxed">• {diff}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-red-100">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1 shrink-0" />
                        {formatDate(precedent.date)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-red-700">
                          {precedent.outcome}
                        </span>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="h-auto p-0 text-xs text-red-600 hover:text-red-800"
                          onClick={() => window.open(precedent.document_url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Case
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Summary Statistics */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{subcast_legal_analysis.supporting_precedents.length}</div>
                <div className="text-sm text-green-700">Supporting Cases</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{subcast_legal_analysis.contradicting_precedents.length}</div>
                <div className="text-sm text-red-700">Challenging Cases</div>
              </div>
              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-amber-600">{subcast_legal_analysis.draft_suggestions.length}</div>
                <div className="text-sm text-amber-700">Recommendations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <Alert className="bg-blue-50 border-blue-200">
              <AlertTriangle className="h-5 w-5 text-blue-600" />
              <AlertDescription className="text-blue-800 text-base">
                <strong>Important Notice:</strong> This analysis is for reference and guidance purposes only. 
                Final verification decisions rest with the appropriate government authorities. 
                Please follow the recommendations provided above to strengthen your application.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}