import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const body = req.json();
        return NextResponse.json({success: true, body});
    } catch (error) {
        return NextResponse.json({success: false, error: error})
    }
}   