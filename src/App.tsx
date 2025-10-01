import { useState } from "react";
import { LoginSection } from "./components/LoginSection";
import { UploadSection } from "./components/UploadSection";
import { StatusSection } from "./components/StatusSection";
import { ResultsSection } from "./components/ResultsSection";

type AppState = "login" | "upload" | "processing" | "results";

interface UserInfo {
  email: string;
  password: string;
  name?: string;
  isSignup?: boolean;
}

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>("login");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);
  const [apiResults, setApiResults] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleUpload = async (files: File[]) => {
    setUploadedFiles(files);
    setCurrentState("processing");
    setLoading(true);
    
    try {
      // Call the new draft upload endpoint
      const formData = new FormData();
      formData.append('file', files[0]); // Only one file expected

      const response = await fetch('http://127.0.0.1:8002/draft/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Upload failed');
      }

      const results = await response.json();
      setApiResults(results);
    } catch (error) {
      console.error('API Error:', error);
      alert(`Error: ${error.message}`);
      // Return to upload on error
      setCurrentState("upload");
    } finally {
      setLoading(false);
    }
  };

  const handleProcessingComplete = () => {
    setCurrentState("results");
  };

  const handleViewDraft = () => {
    // Draft viewing functionality removed as requested
  };

  const handleStartNew = () => {
    setCurrentState("upload");
    setUploadedFiles(null);
    setApiResults(null);
  };

  const handleBackToLogin = () => {
    setCurrentState("login");
    setUserInfo(null);
    setUploadedFiles(null);
    setApiResults(null);
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
            loading={loading}
          />
        );
      
      case "results":
        return (
          <ResultsSection 
            results={apiResults} // Use real API results
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