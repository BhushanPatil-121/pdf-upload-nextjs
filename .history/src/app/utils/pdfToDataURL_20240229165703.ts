import { useState } from 'react';
import { pdfToDataURL } from '../utils/pdfUtils';

const PdfUploader = () => {
  const [dataURL, setDataURL] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const dataURL = await pdfToDataURL(file);
      setDataURL(dataURL);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {dataURL && (
        <object data={dataURL} type="application/pdf" width="100%" height="600px">
          <p>PDF cannot be displayed.</p>
        </object>
      )}
    </div>
  );
};

export default PdfUploader;
