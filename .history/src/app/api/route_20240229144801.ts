import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export async function POST(req: Request, res: Response){
    try {
        upload.single('pdf'),(req, res, async function (err) {
            if (err) {
              return res.status(400).json({ error: err.message });
            }
      
            const pdfBuffer = req.file.buffer;
      
            // Save PDF as byte array in database
            const pdfUpload = await prisma.pdfTable.create({
              data: {
                pdf: Buffer.from(pdfBuffer).toString('base64') // Convert buffer to base64 string
              }
            });
      
            res.status(200).json({ message: 'PDF uploaded successfully', pdfUpload });
          });
        const body =await req.json();
        console.log("SERVER REQUEST BODY " , body);
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
        
        return NextResponse.json({success: true, body},{status: 200});
    } catch (error) {
        console.log("SERVER CATCH ERROR ", error)
        return NextResponse.json({success: false, error: error},{status: 400})
    }
}   