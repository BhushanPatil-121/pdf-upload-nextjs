// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";
// import multer from 'multer';

// const upload = multer({ dest: 'uploads/' });

// export async function POST(req: Request){
//     try {
//         const body =await req.json();
//         console.log("SERVER REQUEST BODY " , body);
//         const { filename, pdf }:{filename:string , pdf:any} = body

//         //check file name already exist or not
//         const existingFileName = await prisma.pdfTabel.findUnique({
//             where: { filename: filename}
//         });
//         if(existingFileName){
//             return NextResponse.json({success: false, message: "File Name already exists"},{status: 409})
//         }
//         const pdfUpload = await prisma.pdfTabel.create({
//             data: {
//                 filename,
//                 pdf
//             }
//         })
        
//         return NextResponse.json({success: true, body},{status: 200});
//     } catch (error) {
//         console.log("SERVER CATCH ERROR ", error)
//         return NextResponse.json({success: false, error: error},{status: 400})
//     }
// }   




// pages/api/upload-pdf.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import multer from 'multer';

interface MulterFile {
  buffer: Buffer;
}

const upload = multer({ dest: 'uploads/' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    upload.single('pdf')(req, res, async function (err: any) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const pdfFile = req.file as MulterFile | undefined;
      if (!pdfFile) {
        return res.status(400).json({ error: 'No PDF file uploaded' });
      }

      const { buffer } = pdfFile;

      // Save PDF as byte array in database
      const pdfUpload = await prisma.pdfTabel.create({
        data: {
          filename:
          pdf: Buffer.from(buffer).toString('base64') // Convert buffer to base64 string
        }
      });

      res.status(200).json({ message: 'PDF uploaded successfully', pdfUpload });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
