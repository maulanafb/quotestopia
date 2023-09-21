'use client'
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from "@components/Profile"
const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        if (session?.user.id) fetchPosts();
    }, [])
    const handleEdit = (post) => {
        router.push(`/update-quotes?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const hasCofirmed = confirm('Are you sure you want to delete quotes?');
        if (hasCofirmed) {
            try {
                await fetch(`/api/quotes/${post._id.toString()}`, {
                    method: 'DELETE',
                });
                const filteredQuotes = posts.filter((p) => p._id !== post._id)
                setPosts(filteredQuotes)
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (
        <Profile
            name="Profil"
            username="Kamu"
            desc="Selamat datang di Profil quotes kamu , disini semua quotes kamu di tampilkan"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete} />
    )
}

export default MyProfile
