import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
 
const formSchema = z.object({
  name: z.string().min(2, "Name is too short").max(50),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
  role: z.literal("waiter")

})


export default  function WaiterForm() {
  const form = useForm({
     resolver: zodResolver(formSchema),
     defaultValues: {
      name: "",
      email:"",
      password:"",
      role: "waiter",
     },
  })

  const onSubmit = async (values) => {
      try {
        const res = await fetch("http://localhost:5000/api/adminMenagament/create", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(values),
        });

        if(!res.ok){
           throw new Error("Gabim gjate ruajtjes");
      } 
      
      const newWaiter = await res.json();
      console.log("U shtua: ", newWaiter);

      form.reset(); //me i pastru fushat 

      if(typeof window !== "undefined") {
        const event = new Event("waiterAdded");
        window.dispatchEvent(event);
      }
    } catch (error) {
        console.log("Gabim:", error.message);
      }
  }
  return(
  <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">

<FormField 
  control={form.control}
  name="name"
  render={({ field }) => (
    <FormItem>
      <FormLabel className="ml-7 mt-8">Name</FormLabel>
      <FormControl>
        <Input className="w-55 ml-7 p-5" placeholder="Name" {...field} />
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
      <FormLabel className="ml-7">Email</FormLabel>
      <FormControl>
        <Input className="w-55 ml-7 p-5" placeholder="shadcn@gmail.com" {...field} />
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
      <FormLabel className="ml-7">Password</FormLabel>
      <FormControl>
        <Input className="w-55 ml-7 p-5" placeholder="Password" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<Button className="m-5" type="submit">Shto Kamrierin</Button>
</form>
</Form>
)
}