import React from 'react';

interface PDFViewerProps {
  base64Data: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ base64Data }) => {
  const openPDFInNewTab = () => {
    const pdfUrl = `data:application/pdf;base64,${base64Data}`;
    window.open(pdfUrl);
  };

  return (
    <div>
      {/* Using <iframe> to embed PDF */}
      <iframe src={`data:application/pdf;base64,${base64Data}`} width="100%" height="600px" title="PDF Viewer"></iframe>

      {/* Option to open PDF in a new tab */}
      <button onClick={openPDFInNewTab}>Open PDF in New Tab</button>
    </div>
  );
};

export default PDFViewer;
