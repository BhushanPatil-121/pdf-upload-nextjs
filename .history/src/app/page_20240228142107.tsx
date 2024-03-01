"use client"
import styles from "./page.module.css";
import { useState } from 'react';
import FileUpload from 'react-material-file-upload';
export default function Home() {
  const [files, setFiles] = useState<File[]>([]);
  return <FileUpload value={files} onChange={setFiles} />;
  return (
    <main className={styles.main}>
      <h1>Upload PDF</h1>
    </main>
  );
}
