import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
// import multer from 'multer';
// const fs = require('fs');

// const upload = multer({ dest: 'uploads/' });

export async function POST(req: Request){
    
    try {
        const body =await req.formData();
        console.log("SERVER REQUEST BODY " , body[0]);
        // const { name, value }:{name:string , value:any} = body

        // //check file name already exist or not
        // const existingFileName = await prisma.pdfTabel.findUnique({
        //     where: { filename: body.name}
        // });
        // if(existingFileName){
        //     return NextResponse.json({success: false, message: "File Name already exists"},{status: 409})
        // }
        // const pdfUpload = await prisma.pdfTabel.create({
        //     data: {
        //         filename,
        //         pdf
        //     }
        // })
        
        return NextResponse.json({success: true, body},{status: 200});
    } catch (error) {
        console.log("SERVER CATCH ERROR ", error)
        return NextResponse.json({success: false, error: error},{status: 400})
    }
}   