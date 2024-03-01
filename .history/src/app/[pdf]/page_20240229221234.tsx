import React from 'react'

export default function page({searchParams}) {
    const router = useRouter()
    return <p>Post: {router.query.slug}</p>
    
  return (
    <div>page</div>
  )
}
