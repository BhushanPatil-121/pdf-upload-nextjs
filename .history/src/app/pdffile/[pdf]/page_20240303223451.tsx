"use client"
import { useEffect, useState } from "react";



export default function Page({ params }: any) {
    let fileName = params.pdf;
    
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

    
    return (
        // <div  
        // style={{
        //     height:"100vh",
        //     width:"100vw",
        //     display: "flex",
        //     justifyContent: "centre",
        //     alignItems: "center",
        // }}
        //  >
            <iframe src={`${file}`} className="responsive-iframe" title="PDF Viewer"></iframe>
        /* </div> */
        )

}
