'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import BeatLoader from "react-spinners/BeatLoader"
import { setCookie } from 'nookies'
import { useUserStore } from '@/stores/useUserStore'

export interface UserType {
    id: number
    email: string
    username: string
    password: string
}

const FormSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export default function Login() {
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const router = useRouter()
    const { setUsername } = useUserStore()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            setSubmitting(true)
            const response = await fetch('https://fakestoreapi.com/users')
            const users: UserType[] = await response.json()
            const foundUser = users.find((user) => user.username === data.username)
            if (foundUser) {
                if (foundUser.password === data.password) {
                    setCookie(null, 'token', data.username, {
                        maxAge: 60 * 60 * 24 * 7, // 7 days
                        path: '/',
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'strict',
                    })
                    
                    setUsername(data.username)
                    
                    // router.replace('/')
                    window.location.href = '/'
                } else {
                    setSubmitError("Wrong password")
                }
            } else {
                setSubmitError("User with this username doesn't exist")
            }
        } catch (error: any) {
            setSubmitError(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="Enter your username..." required {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input type="password" placeholder="******" required {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            
            { submitError.length > 0 ? <div className="text-red-500">{submitError}</div> : null }
            
            {submitting ?
                <Button className='w-16' disabled><BeatLoader color="white" size={10} /></Button>
            :
                <Button type="submit" className='w-16'>Login</Button>
            }
        </form>
        </Form>
    )
}
