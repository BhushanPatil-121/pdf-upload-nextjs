"use client"
import styles from "./page.module.css";
import { useState } from 'react';
export default function Home() {
  const [files, setFiles] = useState<File[]>([])
  return (
    <main className={styles.main}>
      <h1>Upload PDF</h1>
      <MyApp/>
    </main>
  );
}
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadDropzone } from "react-uploader";

// Initialize once (at the start of your app).
const uploader = Uploader({
  apiKey: "free" // Get production API keys from Bytescale
});

// Configuration options: https://www.bytescale.com/docs/upload-widget/frameworks/react#customize
const options = { multi: true };

const MyApp = () => (
  <UploadDropzone uploader={uploader}
                  options={options}
                  onUpdate={files => alert(files.map(x => x.fileUrl).join("\n"))}
                  width="600px"
                  height="375px" />
);