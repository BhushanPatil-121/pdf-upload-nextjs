import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Typography } from '@mui/material';
export default function PdfListSkeleton() {
    const a = new Array(10).fill(1);
    return (
        <div>
            {
                a.map((index: any) => (
                    <Box style={{
                        margin:"-15px"
                    }} sx={{ width: 310 }} key={index}>
                        <Box sx={{ width: 310 }}>
                        <Typography component="div" variant={'h3'} sx={{ width: 200 }}>
                            <Skeleton/>
                        </Typography>
                        </Box>
                        <Box>
                        <Skeleton variant="rectangular" width="50px" />
                        </Box>
                    </Box>
                ))
            }
        </div>
    )
}
