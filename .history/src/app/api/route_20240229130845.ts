import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const body = req.json
    } catch (error) {
        
    }
    return NextResponse.json({success:true})
}