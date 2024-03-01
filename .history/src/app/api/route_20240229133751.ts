import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export async function POST(req: Request){
    try {
        upload.single('pdf')()
        const body =await req.json();
        const { filename, pdf }:{filename:string , pdf:any} = body

        //check file name already exist or not
        const existingFileName = await prisma.pdfTabel.findUnique({
            where: { filename: filename}
        });
        if(existingFileName){
            return NextResponse.json({success: false, message: "File Name already exists"},{status: 409})
        }
        const pdfUpload = await prisma.pdfTabel.create({
            data: {
                filename,
                pdf
            }
        })
        return NextResponse.json({success: true, body});
    } catch (error) {
        return NextResponse.json({success: false, error: error})
    }
}   