import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


//get fileName list to display on UI 
export async function GET(){
    try {
        const fileList = await 
    } catch (error) {
        
    }
}

//store filename and fileData in base64 url
export async function POST(req: Request){
    
    try {
        const body=await req.formData();
        const fileName : any= body.get('fileName')+"";
        const file:any = body.get('file')+"";
        // const { name, value }:{name:string , value:any} = body

        //check file name already exist or not
        const existingFileName = await prisma.pdfTable.findUnique({
            where: { fileName: fileName}
        });
        if(existingFileName){
            return NextResponse.json({success: false, message: "File Name already exists",status: "409"},{status: 409})
        }
        const pdfUpload = await prisma.pdfTable.create({
            data: {
                fileName: fileName,
                pdf: file,
            }
        })
        
        return NextResponse.json({success: true, pdfUpload, status: "200"},{status: 200});
    } catch (error) {
        console.log("SERVER CATCH ERROR ", error)
        return NextResponse.json({success: false, error: error , status: "400"},{status: 400})
    }
}   