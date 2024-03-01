export async function GET(con: Cont){
    try {
        const fileList = await prisma.pdfTable.findMany();
        return NextResponse.json({success: true, fileList , status:"200"}, {status: 200});
    } catch (error) {
        return NextResponse.json({success: false , status:"409"}, {status: 409});
    }
}