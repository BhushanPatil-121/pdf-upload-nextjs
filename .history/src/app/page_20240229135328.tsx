"use client"
import styles from "./page.module.css";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { Alert, Box, Stack, TextField } from "@mui/material";
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
  const [fileName, setFileName] = useState<string>("")
  const [defaultFileName, setDefaultFileName] = useState<string>("")
  const [file, setFile] = useState<string>("")
  const handleClick= async (e: any) => {
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
    // console.log(fileName, file);
    const result =awi fetch( "http://localhost:3000/api", formData,{
      Headers:{}
    } );  
  }
  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        <h1 className={styles.mainHeading}>Upload Your PDF File</h1>
        <form className={styles.mainForm}>
          <div className={styles.mainFormContainer}>
            <div className={styles.mainFormSubContainer1}>
              <InsertDriveFileIcon />
              <Box sx={{width:'100%'}}>
              <TextField 
                id="standard-basic"
                fullWidth
                placeholder="Enter Your File Name"
                value={fileName}
                autoFocus
                onChange={(e) => { setFileName(e.target.value) }}
                variant="standard" />
              </Box>
            </div>
            <div className={styles.mainFormSubContainer2}>
              <Box  sx={{width:'60%'}}>
              <TextField
                id="standard-multiline-static"
                multiline
                fullWidth
                rows={1}
                disabled
                variant="standard"
                value={defaultFileName}
              />
              </Box>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                color={file ? "success" : "error"}
                onChange={(e: any) => {
                  setFile(e.target.files[0]);
                  setDefaultFileName(e.target.files[0].name);
                }}>Select file
                <VisuallyHiddenInput type="file" accept="application/pdf" />
              </Button>
            </div>
          </div>
          <LoadingButton
            onClick={handleClick}
            endIcon={<SendIcon />}
            loading={loading}
            disabled={fileName.length < 1}
            loadingPosition="end"
            variant="contained">
            {
              loading ? "Uploading..." : "Upload"
            }
          </LoadingButton>
        </form>
      </div>
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
