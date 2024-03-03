"use client"
import PdfListSkeleton from '@/components/pdfListSkeleton';
import { pdfToBlob } from "@/utils/pdfToBlob";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./page.module.css";

//import from material ui
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


//pdf list type declared
interface PdfList {
  id: number;
  fileName: string;
  pdf: string;
  uploadedAt: Date;
}

//function render on  ui
export default function Home() {

  const [requestData, setRequestData] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [listIsEmpty, setListIsEmpty] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [fileName, setFileName] = useState<string>("")
  const [defaultFileName, setDefaultFileName] = useState<string>("")
  const [file, setFile] = useState<string | ArrayBuffer | null>("")
  const [pdfList, setPdfList] = useState<PdfList[]>([])
  const [fileSize, setFileSize] = useState("")
  const [searchList, setSearchList] = useState<PdfList[]>([])

  //after every iterate clear all field and set with default
  const clearField = () => {
    setFileName("")
    setDefaultFileName("")
    setFile("")
    setHasFile(false)
  }

  //useEffect to fetch all pdf name 
  useEffect(() => {
    const getPdfList = async () => {
      let pdfList: any = await fetch("/api", {
        cache: "no-store"
      })
      pdfList = await pdfList.json();
      setPdfList(pdfList.fileList)
      setSearchList(pdfList.fileList)
      if (pdfList.fileList.length === 0) {
        setListIsEmpty(true)
      }
    }
    getPdfList()
  }, [requestData])


  // search pdf by it's name
  const searchPdf = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    let filteredArray: any = pdfList.filter((item) => item.fileName?.toLowerCase().includes(value.toLowerCase()));
    setSearchList(filteredArray)
    if (filteredArray.length <= 0) {
      setListIsEmpty(true)
    } else {
      setListIsEmpty(false)
    }
  }


  // append form data and send to backend
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

      //if result is success
      if (result.status === "200") {
        setRequestData(new Date());
        toast.success("PDF uploaded successfully");
      }
      //if result fail due to file name unique in database
      else if (result.status === "409") {
        toast.warning('File Name Already Exists')
      }
      // if result fails due to input field is missing
      else if (result.status === "401") {
        toast.warning('Please Select Different File')
      }
      else {
        toast.error('Fail To Upload PDF')
      }
    }
    // catch all error
    catch (error) {
      toast.error('ERROR! Failed to upload PDF')
    }
    // called function to clear input field
    finally {
      clearField();
      // to show changes in pdf list ( useEffect depends on loading state)
      setLoading(false);
    }
  }

  const calculateFileSize = (size: number) => {
    let fileSizeInBytes = size * 0.000001;
    let fileSize = fileSizeInBytes.toFixed(2);
    console.log(fileSize);
    setFileSize(fileSize)
    return fileSize;
  }

  // select file input and convert into blob data
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
    if (file) {
      setHasFile(true)
      // storing file blob data
      const dataBlob = await pdfToBlob(file);
      let size = calculateFileSize(dataBlob.size)

      //converting blob data into dataURL
      const f = new File([dataBlob], file.name, { type: dataBlob.type })
      const fr = new FileReader();
      fr.readAsDataURL(f)
      fr.onload = () => {
        const re = fr.result;
        setFile(re)
      }
      setDefaultFileName(`1 File Selected With ${size} MB`)
      // able to select same file  
      e.target.value = "";
    }
  };

  // delete pdf (remove pdf from db)
  const handleDelete = async (f: string) => {
    //toast promise alert
    let body = await toast.promise(
      fetch(`/api/${f}`, {
        method: "DELETE",
      }),
      {
        pending: 'Removing PDF',
        success: 'PDF Removed Successfully 👌',
        error: 'Failed To Remove PDF 🤯'
      }
    );
    const result = await body.json();
    if (result.status === "200") {
      let deletedPdfList =
        setSearchList(searchList.filter(x => x.fileName !== f))

    }
    // to show changes in pdf list ( useEffect trigger)
    setRequestData(new Date());
    setLoading(false);
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
                  style={{
                    backgroundColor:"transparent" !important ,
                  }}
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
        <Paper
          style={{
            backgroundColor: "transparent"
          }}
          component="form"
          sx={{ p: '2px 4px', m: '5px', display: 'flex', alignItems: 'center' }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Your PDF"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={searchPdf}
          />
        </Paper>
        <div className={styles.pdfListDiv}>
          {
            searchList.length === 0 ? !listIsEmpty ? <PdfListSkeleton /> : <h2>PDF Not Found</h2> :

              searchList.map((item, index) => (
                <div key={index} style={{
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
              ))
          }
        </div>
      </div>
    </main>
  );
}