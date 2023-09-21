'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"


import Profile from "@components/Profile"
const UserProfile = ({ params }) => {
    const searchParams = useSearchParams()
    const userName = searchParams.get('name');
    const [userPosts, setUserPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`);
            const data = await response.json();
            setUserPosts(data);
        }
        if (params?.id) fetchPosts();
    }, [params.id])

    return (
        <Profile
            name="Profil"
            username={userName}
            desc={`Selamat datang di, ${userName} Profil pribadi ${userName}`}
            data={userPosts}
        />
    )
}

export default UserProfile
