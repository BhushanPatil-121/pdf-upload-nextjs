import { useRouter } from 'next/router'
export default function page() {
    const router = useRouter()
    return <p>Post: {router.query.slug}</p>

}
