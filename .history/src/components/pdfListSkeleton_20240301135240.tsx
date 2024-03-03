import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
export default function pdfListSkeleton() {
    const a = new Array<string>(10).fill("not empty");
    return (
            {
                a.map((index: number) => (
                    <Box sx={{ width: 300 }} key={index}>
                        <Skeleton animation="wave" />
                    </Box>
                ))
            }
    )
}
