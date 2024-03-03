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

    const responsiveIframe = {
        position: absolute,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 100%;
        height: 100%;
        border: none;
    }

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
            <iframe src={`${file}`} className={responsiveIframe} title="PDF Viewer"></iframe>
        /* </div> */
        )

}
