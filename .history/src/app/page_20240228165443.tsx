"use client"
import styles from "./page.module.css";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { TextField } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

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
  function handleClick() {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  }
  const [files, setFiles] = useState<File[]>([])
  return (
    <main className={styles.main}>
      <h1>Upload PDF File</h1>
      <form style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        borderRadius: "10px",
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          border: '1px solid grey',
          borderRadius: '5px',
          padding: '10px',
          gap: '10px',
          margin: '10px',
        }}>
          <InsertDriveFileIcon />
          <TextField id="standard-basic" label="File Name" value={files} variant="standard" />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          // startIcon={<CloudUploadIcon />}
          onChange={ (e):Event=> {
            let file = (<HTMLInputElement>e.target).files[0];
            setFiles(e.target.files[0].name);
            
          }}
        >
          Select file
          <VisuallyHiddenInput type="file" />
        </Button>
        </div>
        <LoadingButton
          onClick={handleClick}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          <span>Upload</span>
        </LoadingButton>
      </form>
    </main>
  );
}
