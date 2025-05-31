import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pencil, Trash } from 'lucide-react';



export const WaiterTable = () => {
  const [waiters, setWaiters] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", password: ""});
  const [editId, setEditId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

    const fetchWaiters = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/adminMenagament");
            const data = await res.json();
            setWaiters(data);
        } catch (error) {
            console.log("Gabim:", error.message);
        }
    };

    useEffect(() => {
        fetchWaiters();
    

     // Dëgjo eventin kur shtohet kamarieri
  const handleRefresh = () => fetchWaiters();
  window.addEventListener("waiterAdded", handleRefresh);

  // Pastro event listener-in kur komponenti ç'instalohet
  return () => window.removeEventListener("waiterAdded", handleRefresh);
}, []);

const handleSubmit = async (e) => {
    e.preventDefault();
    const method =  "PUT";
    const url = 
       `http://localhost:5000/api/adminMenagament/update/${editId}`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Gabim gjatë ruajtjes.");
      }

      setForm({ name: "", email: "", password:"" });
      setEditId(null);
      setDialogOpen(false);
      fetchWaiters();
    } catch (error) {
      console.error("Gabim gjatë ruajtjes:", error.message);
    }
  };


    const handleEdit = (waiter) => {
        setForm({ name: waiter.name, email: waiter.email, password: waiter.password});
        setEditId(waiter.id);
        setDialogOpen(true);
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm("A je i sigurte qe deshiron ta fshish?");
        if(!confirm) return;

        try {
            const res = await fetch(`http://localhost:5000/api/adminMenagament/delete/${id}`, {
                method: "DELETE",
            });

            if(!res.ok) throw new Error("Gabim gjate fshirjes.");
            fetchWaiters();
        } catch (error) {
            console.log("Gabim gjate fshirjes:", error.message);
        }
    };


  return (
    <>
   <Table>
  <TableCaption>A list of your waiters staff.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Password</TableHead>
      <TableHead>Actions</TableHead>
     
    </TableRow>
  </TableHeader>
  <TableBody>
    {waiters.map((waiter) => (
       <TableRow key={waiter.id}>
        <TableCell>{waiter.name}</TableCell>
        <TableCell>{waiter.email}</TableCell>
        <TableCell>{waiter.password}</TableCell>
        <TableCell className="flex gap-2">
            <Button variant="ghost" onClick={() => handleEdit(waiter)}>
                <Pencil className='w-5 h-5'/>
            </Button>
            <Button variant="ghost" onClick={() => handleDelete(waiter.id)}>
                <Trash className='w-5 h-5 text-red-500'/>
            </Button>
        </TableCell>
         </TableRow>
    ))}
     </TableBody>
     </Table>



     <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
           <DialogContent className="sm:max-w-[425px]">
             <DialogHeader>
               <DialogTitle>{editId}Edit profile</DialogTitle>
             </DialogHeader>
             <form onSubmit={handleSubmit} className='space-y-4'>
             <div className="grid gap-4 py-4">
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="name" className="text-right">
                   Name
                 </Label>
                 <Input
                   id="name"
                   value={form.name}
                   onChange={(e) => setForm({ ...form, name: e.target.value })}
                   className="col-span-3"
                 />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="email" className="text-right">
                   Email
                 </Label>
                 <Input
                   id="email"
                   value={form.email}
                   onChange={(e) => setForm({ ...form, email: e.target.value })}
                   className="col-span-3"
                 />
               </div>
               <div className="grid grid-cols-4 items-center gap-4">
                 <Label htmlFor="password" className="text-right">
                   Password
                 </Label>
                 <Input
                   id="password"
                   value={form.password}
                   onChange={(e) => setForm({ ...form, password: e.target.value })}
                   className="col-span-3"
                 />
               </div>
             </div>
             <DialogFooter>
               <Button type="submit">Save changes</Button>
             </DialogFooter>
             </form>
           </DialogContent>
         </Dialog>

         </>
)
}

export default WaiterTable;
