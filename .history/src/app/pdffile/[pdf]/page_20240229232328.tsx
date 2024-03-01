"use client"
import { useEffect, useState } from "react";


interface PDFViewerProps {
    base64Data: string;
}
export default function Page({ params }: any) {
    let fileName = params.pdf;
    console.log(params);

    const [file, setFile] = useState("")
    useEffect(() => {
        const getPdfList = async () => {
            let pdfList: any = await fetch(`/api/${fileName}`, {
                method: "GET",
            })
            pdfList = await pdfList.json();
            console.log(pdfList.file.pdf);
            setFile(pdfList.file.pdf)
        }
        getPdfList()
        const pdfUrl = `${file}`;
        window.open(pdfUrl);
    }, []);

    const openPDFInNewTab = () => {
    };
    return (
        <p>
            Showing the blog post for the
            {/* slug <strong>{file}</strong> */}
        </p>
        <iframe src={`data:application/pdf;base64,${base64Data}`} width="100%" height="600px" title="PDF Viewer"></iframe>
    )

}
