import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Typography } from '@mui/material';
export default function PdfListSkeleton() {
    const a = new Array(20).fill(1);
    return (
        <div>
            {
                a.map((item , index: any) => (
                    <Box style={{
                        margin: "-15px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "space-between",
                    }} sx={{ width: 310 }} key={index}>
                        <Box sx={{ width: 180 }}>
                            <Typography component="div" variant={'h3'} sx={{ width: 180 }}>
                                <Skeleton />
                            </Typography>
                        </Box>
                        <Box style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            gap:"10px"
                        }} sx={{ width: 100 }}>
                            <Typography component="div" variant={'h3'} sx={{ width: 50 }}>
                                <Skeleton />
                            </Typography>
                            <Typography component="div" variant={'h3'} sx={{ width: 30 }}>
                                <Skeleton />
                            </Typography>
                        </Box>
                    </Box>
                ))
            }
        </div>
    )
}
