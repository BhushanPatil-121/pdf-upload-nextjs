"use client"
import { useRouter } from 'next/router'
export default function Page({params: {slug}}) {
    const router = useRouter()
    return <p>Post: {router.query.pdf}</p>

}
