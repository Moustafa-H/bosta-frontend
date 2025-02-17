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

const FormSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ['confirmPassword'],
})

export default function Signup() {
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const router = useRouter()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            setSubmitting(true)
            const response = await fetch('https://fakestoreapi.com/users', {
                method: "POST",
                body: JSON.stringify({
                    email: data.email,
                    username: data.username,
                    password: data.password,
                })
            })
            if (response.ok) {
                router.replace('/login')
            } else {
                setSubmitError("There was an error, please try again later")
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
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type='email' placeholder="Enter your email..." required {...field} />
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

            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            
            { submitError.length > 0 ? <div className="text-red-500">{submitError}</div> : null }
            
            {submitting ?
                <Button className='w-16' disabled><BeatLoader color="white" size={10} /></Button>
            :
                <Button type="submit" className='w-16'>Signup</Button>
            }
        </form>
        </Form>
    )
}
