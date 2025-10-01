"use client";

import { useState } from "react";
import { LoginSection } from "../components/LoginSection";
import { UploadSection } from "../components/UploadSection";
import { StatusSection } from "../components/StatusSection";
import { ResultsSection } from "../components/ResultsSection";

type AppState = "login" | "upload" | "processing" | "results";

interface UserInfo {
  email: string;
  password: string;
  name?: string;
  isSignup?: boolean;
}

// Mock results data based on the backend structure provided
const mockResults = {
  subcast_legal_analysis: {
    applicant_id: "APP-2025-001",
    claimed_subcast: "ST_KOLI_MAHADEV",
    supporting_precedents: [],
    contradicting_precedents: [
      {
        case_title: "Ramesh Koli vs Scrutiny Committee",
        court: "Bombay High Court",
        date: "2020-07-22",
        document_url: "https://drive.google.xy/view?usp=drive_link",
        relevance_score: 0.12,
        key_similarities: null,
        key_differences: [
          "No parental tribal certificate",
          "School records showed only 'Koli' without 'Mahadev'",
          "Birth outside designated areas"
        ],
        outcome: "REJECTED - Certificate invalidated"
      }
    ],
    legal_analysis: {
      current_applicant_strengths: [
        "Consistent documentation across records"
      ],
      current_applicant_weaknesses: [
        "Missing parental certificate (common rejection reason)",
        "School records not verified (critical requirement)",
        "Birth location outside designated areas"
      ],
      probability_assessment: "Low - contradictory precedent evidence"
    },
    draft_suggestions: [
      "Obtain parental tribal certificate documentation",
      "Verify school records show consistent caste entry",
      "Provide birth certificate from designated tribal area",
      "Document traditional occupation evidence (fishing/agriculture)",
      "Provide evidence of traditional Koli occupations in family"
    ]
  },
  processed_at: "2025-09-25T13:34:11.200541"
};

export default function Home() {
  const [currentState, setCurrentState] = useState<AppState>("login");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{ files: File[]; documentType: string } | null>(null);

  const handleLogin = (credentials: { email: string; password: string; name?: string; isSignup?: boolean }) => {
    // Simple validation for demo
    if (credentials.email && credentials.password) {
      setUserInfo({
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
        isSignup: credentials.isSignup
      });
      setCurrentState("upload");
    }
  };

  const handleUpload = (files: File[], documentType: string) => {
    setUploadedFiles({ files, documentType });
    setCurrentState("processing");
  };

  const handleProcessingComplete = () => {
    setCurrentState("results");
  };

  const handleViewDraft = () => {
    // View Draft functionality removed as requested
  };

  const handleStartNew = () => {
    setCurrentState("upload");
    setUploadedFiles(null);
  };

  const handleBackToLogin = () => {
    setCurrentState("login");
    setUserInfo(null);
    setUploadedFiles(null);
  };

  const handleBackToUpload = () => {
    setCurrentState("upload");
  };

  const renderCurrentSection = () => {
    switch (currentState) {
      case "login":
        return <LoginSection onLogin={handleLogin} />;
      
      case "upload":
        return (
          <UploadSection 
            onUpload={handleUpload} 
            onBack={handleBackToLogin}
            userInfo={userInfo!}
          />
        );
      
      case "processing":
        return (
          <StatusSection 
            onComplete={handleProcessingComplete}
            onBack={handleBackToUpload}
            userInfo={userInfo!}
          />
        );
      
      case "results":
        return (
          <ResultsSection 
            results={mockResults}
            onViewDraft={handleViewDraft}
            onStartNew={handleStartNew}
            userInfo={userInfo!}
          />
        );
      
      default:
        return <LoginSection onLogin={handleLogin} />;
    }
  };

  return renderCurrentSection();
}