"use client"
import { useRouter } from 'next/router'
export default function page() {
    const router = useR()
    return <p>Post: {router.query.slug}</p>

}
