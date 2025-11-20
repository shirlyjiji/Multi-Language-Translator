import React, { useState } from "react";
import axios from "axios";
import '../Upload.css';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [languages, setLanguages] = useState(["es", "de", "hi"]);
  const [results, setResults] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    languages.forEach((lang) => formData.append("languages", lang));

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/translate-file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResults(response.data.results);
    } catch (err) {
      console.error(err);
      alert("Translation failed. Check backend.");
    } finally {
      setIsUploading(false);
    }
  };

  const toggleLanguage = (lang) => {
    setLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    );
  };

  const languageOptions = [
    { code: "es", name: "Spanish", flag: "🇪🇸" },
    { code: "de", name: "German", flag: "🇩🇪" },
    { code: "hi", name: "Hindi", flag: "🇮🇳" },
  ];

  return (
    <div className="upload-container">
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="main-title">
            AI Multi-Language
            <span className="gradient-text"> Translation Studio</span>
          </h1>
          <p className="subtitle">Transform your content across multiple languages with AI-powered precision</p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="upload-card">
              {/* Upload Section */}
              <div className="upload-section">
                <div className="upload-area">
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    accept=".txt,.pdf,.docx"
                    className="file-input"
                  />
                  <label htmlFor="file-upload" className="upload-label">
                    <div className="upload-icon">
                      <i className="fas fa-cloud-upload-alt"></i>
                    </div>
                    <h4>Upload Your Document</h4>
                    <p>Supported formats: TXT, PDF, DOCX</p>
                    {fileName && (
                      <div className="file-selected">
                        <i className="fas fa-file"></i>
                        {fileName}
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Language Selection */}
              <div className="language-section">
                <h3 className="title-select">
                  <i className="fas fa-globe-americas"></i>
                  Select Target Languages
                </h3>
                <div className="language-grid">
                  {languageOptions.map((lang) => (
                    <div
                      key={lang.code}
                      className={`language-card ${languages.includes(lang.code) ? 'selected' : ''}`}
                      onClick={() => toggleLanguage(lang.code)}
                    >
                      <div className="language-flag">{lang.flag}</div>
                      <div className="language-info">
                        <div className="language-name">{lang.name}</div>
                        <div className="language-code">{lang.code.toUpperCase()}</div>
                      </div>
                      <div className="checkmark">
                        <i className="fas fa-check"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="action-section text-center">
                <button
                  onClick={handleUpload}
                  disabled={isUploading || !file}
                  className={`translate-btn ${isUploading ? 'loading' : ''}`}
                >
                  {isUploading ? (
                    <>
                      <div className="spinner"></div>
                      Translating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-magic"></i>
                      Translate Document
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Results Section */}
            {results.length > 0 && (
              <div className="results-section">
                <h3 className="title-select">
                  <i className="fas fa-download"></i>
                  Download Translations
                </h3>
                <div className="results-grid">
                  {results.map((res, index) => (
                    <div
                      key={index}
                      className="result-card"
                    >
                      <div className="result-header">
                        <div className="language-badge">
                          <span className="flag">
                            {languageOptions.find(l => l.code === res.language)?.flag || '🌐'}
                          </span>
                          {res.language.toUpperCase()}
                        </div>
                        <div className="model-tag">
                          <i className="fas fa-robot"></i>
                          {res.model}
                        </div>
                      </div>
                      
                      <div className="download-links">
                        <a href={res.files.pdf} target="_blank" rel="noreferrer" className="download-btn pdf">
                          <i className="fas fa-file-pdf"></i>
                          PDF
                        </a>
                        <a href={res.files.docx} target="_blank" rel="noreferrer" className="download-btn docx">
                          <i className="fas fa-file-word"></i>
                          DOCX
                        </a>
                        <a href={res.files.epub} target="_blank" rel="noreferrer" className="download-btn epub">
                          <i className="fas fa-book"></i>
                          EPUB
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}