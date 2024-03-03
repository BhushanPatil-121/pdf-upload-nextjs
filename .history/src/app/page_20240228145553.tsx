"use client"
import styles from "./page.module.css";
import { styled } from '@mui/material/styles';
import { useState } from 'react';

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
   const [files, setFiles] = useState<File[]>([])
  return (
    <main className={styles.main}>
      <h1>Upload PDF</h1>
      <CustomFileInput
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            placeholder: "Single File..."
          }}
          endButton={{
            buttonProps: {
              round: true,
              color: "primary",
              justIcon: true,
              fileButton: true
            },
            icon: <AttachFile />
          }}
        />
    </main>
  );
}
