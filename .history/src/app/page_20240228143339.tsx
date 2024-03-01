"use client"
import styles from "./page.module.css";
import { useState } from 'react';
export default function Home() {
   const [files, setFiles] = useState<File[]>([])
  return (
    <main className={styles.main}>
      <h1>Upload PDF</h1>
    </main>
  );
}
