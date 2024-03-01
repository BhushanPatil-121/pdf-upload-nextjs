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
            console.log(pdfList.file.pdf);
            setFile(pdfList.pdf)
        }
        getPdfList()
    }, [fileame]);
    return (
        <p className="text-2xl">
            Showing the blog post for the
            slug <strong>{file}</strong>
        </p>
    )

}
