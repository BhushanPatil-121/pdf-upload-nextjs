"use client"
import { useEffect, useState } from "react";



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
            // console.log(pdfList.file.pdf);
            setFile(pdfList.file.pdf)
        }
        getPdfList()
        const pdfUrl = `${file}`;
        window.open(pdfUrl);
    }, []);

    const openPDFInNewTab = () => {
    };
    return (
        <div style={{
            height:"90v"
        }}>
            <iframe src={`${file}`} width="100%" height="600px" title="PDF Viewer"></iframe>
        </div>
        )

}
