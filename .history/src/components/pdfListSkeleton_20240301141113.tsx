import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Typography } from '@mui/material';
export default function PdfListSkeleton() {
    const a = new Array(10).fill(1);
    return (
           <div>
             {
                 a.map(( index:any) => (
                    <Box sx={{ width: 310 ,}} key={index}>
                        <Typography animation="wave" variant={'h3'}/>
                    </Box>
                ))
            }
           </div>
    )
}
