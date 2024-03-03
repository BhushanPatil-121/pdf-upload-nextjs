"use client"
import { useEffect } from "react";

export default function Page({ params }:any) {
    useEffect(() => {
        const getPdfList = async () => {
          let pdfList:any = await fetch("/api/${params.pdf}` , {
            method: "GET",
          })
          pdfList =await pdfList.json();
          // console.log(pdfList.fileList);
          
        }
        getPdfList()
      }, [])
    return (
        <p className="text-2xl">
            Showing the blog post for the
            slug <strong>{params.pdf}</strong>
        </p>
    )

}
