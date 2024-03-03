import fs from 'fs';
import path from 'path';

export const pdfToDataURL = async (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result?.toString();
      if (base64Data) {
        resolve(`data:application/pdf;base64,${base64Data.split(',')[1]}`);
      } else {
        reject(new Error('Failed to read PDF file.'));
      }
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });
};
