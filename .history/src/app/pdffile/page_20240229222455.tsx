"use client"
import { useRouter } from 'next/router'
export default function Page({params: {pdf}}) {
    const router = useRouter()
    return <p>Post: {router.query.pdf}</p>

}
