import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

export async function POST(req: Request) {
    try {
        upload.single('pdf')(req, null, async function (err) {
            if (err) {
                return NextResponse.json({ success: false, error: err.message }, { status: 400 });
            }

            const body = req.body;
            const { filename } = body;
            const pdfBuffer = req.file.buffer;

            // Check if the filename already exists
            const existingFile = await prisma.pdfTable.findUnique({
                where: { filename: filename }
            });
            if (existingFile) {
                return NextResponse.json({ success: false, message: "Filename already exists" }, { status: 409 });
            }

            // Save PDF to the database
            const pdfUpload = await prisma.pdfTable.create({
                data: {
                    filename,
                    pdf: pdfBuffer // Assuming pdf field in pdfTable is of type 'Bytes'
                }
            });

            return NextResponse.json({ success: true, data: pdfUpload });
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
