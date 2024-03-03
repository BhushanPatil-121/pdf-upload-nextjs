import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
export default function PdfListSkeleton() {
    const a = new Array(10).fill(1);
    return (
           <div>
             {
                 a.map(( index:any) => (
                    <Box sx={{ width: 350,px}} key={index}>
                        <Skeleton animation="wave" />
                    </Box>
                ))
            }
           </div>
    )
}