export async function GET(req , con){
    try {
        let fileName=Number(con.params.id);
        const fileList = await prisma.pdfTable.findMany();
        return NextResponse.json({success: true, fileList , status:"200"}, {status: 200});
    } catch (error) {
        return NextResponse.json({success: false , status:"409"}, {status: 409});
    }
}