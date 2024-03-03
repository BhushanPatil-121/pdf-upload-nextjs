import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
export default function pdfListSkeleton() {
    const array = new Array<string>(10).fill("not empty");
  return (
    {
        array.map((item, index) => (
            <Box key={index}>
                <Skeleton variant="rectangular" width="100%" height="100px" />
            </Box>
        ))
    }
  )
}
