import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(con:any,){
    try {
        let fileName=con.params.pdf;
        console.log();
        
        const fileList = await prisma.pdfTable.findUnique({
            where: {
                fileName: fileName
            }
        });
        return NextResponse.json({success: true, fileList , status:"200"}, {status: 200});
    } catch (error) {
        return NextResponse.json({success: false , status:"409"}, {status: 409});
    }
}