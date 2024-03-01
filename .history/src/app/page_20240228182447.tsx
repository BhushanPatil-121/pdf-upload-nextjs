"use client"
import styles from "./page.module.css";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { Alert, Stack, TextField } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { CloudDownload } from "@mui/icons-material";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploding] = useState(false);
  const [fileName, setFileName] = useState("")
  const [file, setFile] = useState("")
  function handleClick(e: any) {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
    setTimeout(() => {
      setUploding(true)
      setFileName("")
      setFile("")
    }, 3000);
    setTimeout(() => setUploding(false), 6000);
    e.preventDefault();
    let formData = new FormData();
    formData.append('filename', fileName);
    formData.append('file', file);
    console.log(fileName, file);
  }
  return (
    <main className={styles.main}>

      <></>
      {
        uploading &&
        <Stack sx={{ width: '50%' }} spacing={2}>
          <Alert variant="filled" severity="success">
            File Upload Successfully
          </Alert>
        </Stack>
      }
    </main>
  );
}
