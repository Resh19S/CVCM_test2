import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Upload, File, X } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { ProfileHeader } from "./ProfileHeader";

interface UserInfo {
  email: string;
  name?: string;
  isSignup?: boolean;
}

interface UploadSectionProps {
  onUpload: (files: File[]) => void;
  onBack: () => void;
  userInfo: UserInfo;
}

export function UploadSection({ onUpload, onBack, userInfo }: UploadSectionProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    // Only allow one .docx file
    const docxFiles = droppedFiles.filter(file => 
      file.name.toLowerCase().endsWith('.docx')
    );
    
    if (docxFiles.length === 0) {
      alert("Please upload a Word document (.docx) file only.");
      return;
    }

    setFiles([docxFiles[0]]); // Only take the first .docx file
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      // Check file types - only allow .docx files
      const docxFiles = selectedFiles.filter(file => 
        file.name.toLowerCase().endsWith('.docx')
      );

      if (docxFiles.length === 0) {
        alert("Only Word documents (.docx) are allowed.");
        return;
      }

      setFiles([docxFiles[0]]); // Only take the first .docx file
    }
  };

  const removeFile = () => {
    setFiles([]);
  };

  const handleSubmit = () => {
    if (files.length > 0) {
      onUpload(files);
    }
  };

  const isSubmitDisabled = files.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <ProfileHeader userInfo={userInfo} onLogout={onBack} />
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold text-slate-800 mb-2">Upload Draft Document</h1>
            <p className="text-slate-600 text-lg">Upload your caste certificate draft for legal analysis</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-1">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-xl">Upload Draft Document</CardTitle>
              <CardDescription className="text-indigo-100">
                Upload your Word document draft for automatic caste detection and legal analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
                  dragActive
                    ? "border-blue-400 bg-blue-50 scale-105"
                    : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className={`h-16 w-16 mx-auto mb-4 transition-colors ${
                  dragActive ? "text-blue-500" : "text-slate-400"
                }`} />
                <h3 className="text-lg font-medium text-slate-700 mb-2">
                  {dragActive ? "Drop your draft here" : "Upload your draft document"}
                </h3>
                <p className="text-slate-500 mb-4">
                  Drag and drop your Word document here, or click to select
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Only .docx files supported
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {files.length > 0 && (
                <div className="mt-6 space-y-3">
                  <Label className="text-slate-700 font-medium">Selected Draft Document</Label>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center min-w-0 flex-1">
                      <File className="h-5 w-5 text-slate-500 mr-3 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-700 truncate">{files[0].name}</p>
                        <p className="text-xs text-slate-500">
                          {(files[0].size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={removeFile}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              <Alert className="bg-blue-50 border-blue-200 mt-6">
                <AlertDescription className="text-blue-800">
                  <strong>How it works:</strong><br />
                  1. Upload your draft caste certificate application document (.docx)<br />
                  2. Our system will automatically detect the caste/category from your document<br />
                  3. Get legal analysis with supporting and contradicting precedents<br />
                  4. Receive specific recommendations to strengthen your application
                </AlertDescription>
              </Alert>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className="w-full mt-6 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload Draft & Analyze
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}