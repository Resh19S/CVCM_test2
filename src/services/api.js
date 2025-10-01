const API_BASE_URL = 'http://127.0.0.1:8002';

export const apiService = {
  async getLegalAnalysis(applicantData, claimedSubcast) {
    const requestData = {
      applicant_profile: {
        application_id: `APP-${Date.now()}`,
        applicant: {
          first_name: applicantData.firstName || "Test",
          last_name: applicantData.lastName || "User", 
          birth_place: applicantData.birthPlace || "Thane district",
          family_occupation: applicantData.occupation || "Traditional fishing",
          father_name: applicantData.fatherName || "Test Father"
        },
        documents: applicantData.documents || [
          { doc_id: "1", summary: "Birth certificate from Thane showing Koli caste" },
          { doc_id: "2", summary: "School records" }
        ]
      },
      validation_report: {
        application_id: `APP-${Date.now()}`,
        checks: [],
        overall_status: "passed"
      },
      claimed_subcast: claimedSubcast
    };

    const response = await fetch(`${API_BASE_URL}/subcast/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  }
};