export default function Page({params: {pdf}:{pdf:string}}) {
    const router = useRouter()
    return <p>Post: {pdf}</p>

}
