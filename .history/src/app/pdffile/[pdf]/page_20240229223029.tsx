export default function Page({ params: { pdf }:any }) {
    return (
        <p className="text-2xl">
            Showing the blog post for the
            slug <strong>{pdf}</strong>
        </p>
    )

}
