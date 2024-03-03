import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
export default function pdfListSkeleton() {
    const a = new Array(10).fill("not empty");
    return (
            {
                a && a.map((index: any) => (
                    <Box sx={{ width: 300 }} key={index}>
                        <Skeleton animation="wave" />
                    </Box>
                ))
            }
    )
}