"use client"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from "./page.module.css";
import { pdfToBlob } from "@/utils/pdfToBlob";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PdfListSkeleton from '@/components/pdfListSkeleton';

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
  const [hasFile, setHasFile] = useState(false);
  const [fileName, setFileName] = useState<string>("")
  const [defaultFileName, setDefaultFileName] = useState<string>("")
  const [file, setFile] = useState<string | ArrayBuffer | null>("")
  const [pdfList, setPdfList] = useState<PdfList[]>([])

  const notify = () => toast("Wow so easy!");
  useEffect(() => {
    const getPdfList = async () => {
      let pdfList: any = await fetch("/api", {
        method: "GET",
      })
      pdfList = await pdfList.json();
      // console.log(pdfList.fileList);

      setPdfList(pdfList.fileList)
    }
    getPdfList()
  }, [loading])


  const clearField = () => {
    setFileName("")
    setDefaultFileName("")
    setFile("")
    setHasFile(false)
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
        toast.success("PDF uploaded successfully");
      } else if (result.status === "409") {
        toast.warning('File Name Already Exists')
      } else if (result.status === "401") {
        toast.warning('Please Select Different File')
      }
      else {
        toast.error('Fail To Upload PDF')
      }
    } catch (error) {
      toast.error('ERROR! Failed to upload PDF')
    } finally {
      clearField();
      setLoading(false);
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setDefaultFileName(file.name)
      setHasFile(true)
      const dataBlob = await pdfToBlob(file);
      const f = new File([dataBlob], file.name, { type: dataBlob.type })
      const fr = new FileReader();
      fr.readAsDataURL(f)
      fr.onload = () => {
        const re = fr.result;
        setFile(re)
      }
      e.target.value = "";
    }
  };

  const handleDelete = async (f: string) => {
    console.log(f);

    let body = await  toast.promise(
      fetch(`/api/${f}`, {
        method: "DELETE",
      }),
      {
        pending: 'P',
        success: 'Promise resolved 👌',
        error: 'Promise rejected 🤯'
      }
  );
    
    // fetch(`/api/${f}`, {
    //   method: "DELETE",
    // });
    const result = await body.json();
    if (result.status === "200") {
      // toast.success("PDF Deleted Successfully");
      setPdfList(pdfList.filter(x => x.fileName !== f))
    }
  }

  return (
    <main className={styles.main}>
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
                  onChange={(e) => { setFileName(e.target.value.trim()) }}
                  variant="standard" />
              </Box>
            </div>
            <div className={styles.mainFormSubContainer2}>
              <Box sx={{ width: '56%' }}>
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
                  // onClick= {(e:  MouseEvent) => {
                  //   (e.target as HTMLInputElement).value = null;
                  // }}
                  type="file" accept="application/pdf" />
              </Button>
            </div>
          </div>
          <LoadingButton
            onClick={handleClick}
            endIcon={<SendIcon />}
            loading={loading}
            disabled={!hasFile || fileName.length == 0}
            loadingPosition="end"
            variant="contained">
            {
              loading ? "Uploading..." : "Upload"
            }
          </LoadingButton>
        </form>
      </div>
      <div className={styles.pdfListContainer}>
        <div className={styles.listHeadingDiv}>
          <h1>PDF list</h1>
        </div>
        <div className={styles.pdfListDiv}>
          {
            pdfList.length > 0 ? pdfList.map((item) => (
              <div key={item.id} style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid lightgrey"
              }}>
                <div>
                  <h4 className={styles.listTitle} >
                    {item.fileName}
                  </h4>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: "10px",
                }}>
                  <Link href={`/pdffile/${item.fileName}`} target="_blank">
                    <Button style={{
                      margin: "5px",
                    }} size="small" variant="contained" id="#contained-buttons">
                      Open
                    </Button>
                  </Link>
                  <button style={{
                    cursor: "pointer",
                    color: "white",
                    backgroundColor: "red",
                    border: "none",
                    borderRadius: "3px",
                    padding: "2px",
                    boxShadow: "2px 2px 2px grey"
                  }}
                    onClick={() => handleDelete(item.fileName)}
                  ><DeleteIcon />
                  </button>


                </div>
              </div>
            )) :
              <PdfListSkeleton/>
          }
        </div>
      </div>
    </main>
  );
}
