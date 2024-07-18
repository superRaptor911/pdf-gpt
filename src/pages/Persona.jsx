import { useState } from 'react';
// import { getDocument } from 'pdfjs-dist';

import '../App.css';


import { analyzePersonaTextWithGPT, extractTextFromPdf } from '../api/api';





const Persona = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  

  

  const handleFileUpload = async () => {
    if (file) {
      setLoading(true);
      setAnalysis('');
      const text = await extractTextFromPdf(file);
      const analysisResult = await analyzePersonaTextWithGPT(text);
      setAnalysis(analysisResult);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
      <div className="bg-white shadow-md rounded-lg p-8  w-full">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">PDF Analyzer</h1>
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf"
          className="mb-4 p-2 border rounded w-full"
        />
        <button
          onClick={handleFileUpload}
          disabled={loading}
          className={`w-full px-4 py-2 mb-4 text-white rounded ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600 transition'}`}
        >
          {loading ? 'Analyzing...' : 'Upload and Analyze'}
        </button>
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {analysis && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">Analysis Result</h2>
            <div
              id="section-to-print"
              className="persona bg-gray-100 p-4 rounded"
              dangerouslySetInnerHTML={{ __html: analysis }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Persona;


