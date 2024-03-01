import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const body =await req.json();
        const { fileName } = body

        //check file name already exist or not
        const existingFileName = awa

        return NextResponse.json({success: true, body});
    } catch (error) {
        return NextResponse.json({success: false, error: error})
    }
}   