export default function Page({ params }:any) {
    return (
        <p className="text-2xl">
            Showing the blog post for the
            slug <strong>{params.pdf}</strong>
        </p>
    )

}
