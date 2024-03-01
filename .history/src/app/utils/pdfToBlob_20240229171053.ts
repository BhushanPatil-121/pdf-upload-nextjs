function readFileAsBlob(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
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