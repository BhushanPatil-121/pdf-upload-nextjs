"use client"
import { useEffect } from "react";

export default function Page({ params }:any) {
    let fileAnme = searchParams.id;
    useEffect(() => {
        const getPdfList = async () => {
          let pdfList:any = await fetch(`/api/${params.pdf}` , {
            method: "GET",
          })
          pdfList =await pdfList.json();
          console.log(pdfList);
          
        }
        getPdfList()
      }, [params.pdf]);
    return (
        <p className="text-2xl">
            Showing the blog post for the
            slug <strong>{params.pdf}</strong>
        </p>
    )

}
