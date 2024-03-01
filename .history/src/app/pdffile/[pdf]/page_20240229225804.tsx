"use client"
import { useEffect } from "react";

export default function Page({ searchParams }: any) {
    let fileName = searchParams.pdf;
    const [file, setfile] = useState("")
    useEffect(() => {
        const getPdfList = async () => {
            let pdfList: any = await fetch(`/api/${fileName}`, {
                method: "GET",
            })
            pdfList = await pdfList.json();
            console.log(pdfList);
            setFile(pdf)
        }
        getPdfList()
    }, [fileName]);
    return (
        <p className="text-2xl">
            Showing the blog post for the
            slug <strong>{params.pdf}</strong>
        </p>
    )

}
