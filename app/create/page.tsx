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
import { useEffect, useState } from "react"
import BeatLoader from "react-spinners/BeatLoader"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const FormSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: 'Price must be positive',
    }),
  category: z.string().min(1, 'Category is required'),
  image: z.string(),
})

export default function CreateProduct() {
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')
    const [success, setSuccess] = useState(false)
    const [categories, setCategories] = useState<string[]>([])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            category: "",
            image: "",
        },
    })

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products/categories')
                setCategories(await response.json())
            } catch (error) {
                setSubmitError('Error fetching categories')
            }
        }
        fetchCategories()
    }, [])

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
            setSubmitting(true)
            const response = await fetch('https://fakestoreapi.com/products', {
                method: "POST",
                body: JSON.stringify(data)
            })
            if (response.ok) {
                setSuccess(true)
            } else {
                setSubmitError("There was an error, please try again later")
            }
        } catch (error: any) {
            setSubmitError(error)
        } finally {
            setSubmitting(false)
        }
    }

    if (success)
        return <p className='text-green-700 text-2xl'>Your Product was Successfully Created!</p>
    else
        return (
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder='Product title...' required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Product description...' required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input type='number' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} {...field}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category, index) => (
                                        <SelectItem key={index} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input placeholder='Product image link...' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                { submitError.length > 0 ? <div className="text-red-500">{submitError}</div> : null }
                
                {submitting ?
                    <Button className='w-16' disabled><BeatLoader color="white" size={10} /></Button>
                :
                    <Button type="submit" className='w-16'>Create</Button>
                }
            </form>
            </Form>
        )
}
