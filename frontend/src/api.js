import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 120000, // 2 min timeout for AI processing
});

export async function uploadResumePDF(file) {
  const formData = new FormData();
  formData.append("resume", file);
  const { data } = await API.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function analyzeResume(resumeText, role, companyType) {
  const { data } = await API.post("/analyze-resume", {
    resumeText,
    role,
    companyType,
  });
  return data;
}

export async function getHistory() {
  const { data } = await API.get("/history");
  return data;
}

export async function getAnalysisById(id) {
  const { data } = await API.get(`/history/${id}`);
  return data;
}

export async function deleteAnalysis(id) {
  const { data } = await API.delete(`/history/${id}`);
  return data;
}
