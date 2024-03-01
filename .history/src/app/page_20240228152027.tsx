"use client"
import styles from "./page.module.css";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { TextField } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
export default function Home() {
   const [files, setFiles] = useState<File[]>([])
  return (
    <main className={styles.main}>
      <h1>Upload PDF File</h1>
      <form>
      <div>
      <InsertDriveFileIcon />
      <TextField id="standard-basic" label="File Name" variant="standard" />
      </div>
      </form>
    </main>
  );
}
