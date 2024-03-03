//function for converting file into blob 
export const pdfToBlob =  (file: File): Promise<Blob> => {
    //return promise
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      // once file load successfully create blob object
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) {
          const blob = new Blob([reader.result], { type: file.type });
          resolve(blob);
        } else {
          reject(new Error('Unable to read file'));
        }
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }