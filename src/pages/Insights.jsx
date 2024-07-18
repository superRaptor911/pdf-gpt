import { useState } from 'react';
import { analyzePersonaTextWithGPT, extractTagsFromTextWithGPT, extractTextFromPdf, mergeDataWithGPT } from '../api/api';

const Insights = () => {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const handleFileChange = async (event) => {
    const newFiles = Array.from(event.target.files);
    setLoading(true);

    
    const jobs = newFiles.map((file) => processFile(file) );
    await Promise.allSettled(jobs)

    setLoading(false);
  };

  const handleAddMoreFiles = () => {
    if (!loading) {
      document.getElementById('fileInput').click();
    }
  };

  const processFile = async (file) => {
    const text = await extractTextFromPdf(file);
    console.log(text);
    const analysisResult = await analyzePersonaTextWithGPT(text);
    const analysisResult2 = await extractTagsFromTextWithGPT(text);
    setTexts(prev => [...prev, [analysisResult, analysisResult2]]);
  };

  const toggleExpand = (index) => {
    setExpandedIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  const generateReport = async () => {
    const reportText = texts.map(t => t[1]).join("\n");
    setLoading(true);
    document.getElementById("reportt").innerText = await mergeDataWithGPT(reportText);
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <ul className="mt-4 w-full space-y-4">
        {texts.map((ts, index) => (
          <li
            key={index}
            className="p-4 border rounded bg-white shadow-md text-gray-700"
          >
            <div className="truncate overflow-hidden" dangerouslySetInnerHTML={{
                __html: ts[0]
            }}
                style={{
                    height: expandedIndexes.includes(index) ? "max-content" : "200px"
                }}
            >
            </div>
            <button
              onClick={() => toggleExpand(index)}
              className=" hover:underline mt-2"
            >
              {expandedIndexes.includes(index) ? 'Show Less' : 'Show More'}
            </button>
          </li>
        ))}
      </ul>
      <input
        type="file"
        id="fileInput"
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={loading}
      />
      <button
        className={`mt-4 px-4 py-2 rounded ${loading ? 'bg-gray-500' : 'bg-blue-500 text-white'}`}
        onClick={handleAddMoreFiles}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Add Files'}
      </button>

      <div className='mt-4'/>
      {!loading && <button
        className={`mt-4 px-4 py-2 rounded ${loading ? 'bg-gray-500' : 'bg-green-500 text-white'}`}
        onClick={generateReport}
        disabled={loading}
      >
  Generate Insights
      </button>}

      <div className='mt-4 bg-grey-500 p-3' id="reportt"/>
    </div>
  );
};

export default Insights;
