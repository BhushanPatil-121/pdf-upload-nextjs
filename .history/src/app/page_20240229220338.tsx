"use client"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import styles from "./page.module.css";
import { pdfToBlob } from "./utils/pdfToBlob";
import prisma from '@/lib/prisma';
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

interface PdfList {
  id: number;
  fileName: string;
  pdf: string;
  uploadedAt: Date;
}
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>("")
  const [defaultFileName, setDefaultFileName] = useState<string>("")
  const [file, setFile] = useState<string | ArrayBuffer | null>("")
  const [pdfList, setPdfList] = useState(["id", "","",""])

  useEffect(() => {
    const getPdfList = async () => {
      let pdfList:any = await fetch("/api" , {
        method: "GET",
      })
      pdfList =await pdfList.json();
      // console.log(pdfList.fileList);
      
      setPdfList(pdfList.fileList)
    }
    getPdfList()
  }, [])


  const clearField = () => {
    setFileName("")
    setDefaultFileName("")
    setFile("")
  }
  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('fileName', fileName);
    formData.append('file', file as unknown as string);

    try {
      let body = await fetch("/api", {
        method: "POST",
        body: formData,
      });
      const result = await body.json();

      if (result.status === "200") {
        setLoading(false)
        alert('PDF uploaded successfully')
        clearField();
      } else if (result.status === "409") {
        setLoading(false)
        alert('File Name Already Exists')
        clearField();
      } else {
        setLoading(false)
        alert('Fail To Upload PDF')
        clearField();
      }
    } catch (error) {
      alert('ERROR! Failed to upload PDF')
      console.error('Error uploading PDF:', error);
      clearField();
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setDefaultFileName(file.name)
      const dataBlob = await pdfToBlob(file);
      const f = new File([dataBlob], file.name, { type: dataBlob.type })
      const fr = new FileReader();
      fr.readAsDataURL(f)
      fr.onload = () => {
        const re = fr.result;
        setFile(re)
      }
    }
  };
  return (
    <main className={styles.main}>
      <div className={styles.pdfListContainer}>
        <div className={styles.listHeadingDiv}>
          <h1>PDF list</h1>
        </div>
        <div className={styles.pdfListDiv}>
          {
           pdfList.length>0 ?  pdfList.map((item) => (
              <h2 className={styles.listTitle} key={item.id}>{item.fileName}</h2>
            )):<h2 className={styles.listTitle} >Empty List</h2>
          }
        </div>
      </div>
      <div className={styles.mainContainer}>
        <h1 className={styles.mainHeading}>Upload Your PDF File</h1>
        <form className={styles.mainForm}>
          <div className={styles.mainFormContainer}>
            <div className={styles.mainFormSubContainer1}>
              <InsertDriveFileIcon />
              <Box sx={{ width: '100%' }}>
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
              <Box sx={{ width: '60%' }}>
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
                startIcon={<AddCircleOutlineIcon />}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                color={file ? "error" : "success"}
              >file
                <VisuallyHiddenInput
                  onChange={handleFileChange}
                  type="file" accept="application/pdf" />
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
    </main>
  );
}
