"use client"
import styles from "./page.module.css";
import { useState } from 'react';
import FileUpload from 'react-material-file-upload';
export default function Home() {
  const [files, setFiles] = useState<File[]>([])
  return (
    <main className={styles.main}>
      <h1>Upload PDF</h1>
      <FileUpload value={files} onChange={setFiles} />npm i react-material-file-upload
    </main>
  );
}
