import React, { useEffect, useState } from 'react';
import BottomNav from '@/components/shared/BootomNav'; 
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
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
import { Pencil, Plus, Trash2 } from 'lucide-react';



const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", image: "", price:"" });
  const [editId, setEditId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/adminProducts");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Gabim gjatë ngarkimit të produkteve:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http://localhost:5000/api/adminProducts/update/${editId}`
      : `http://localhost:5000/api/adminProducts/create`;

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

      setForm({ name: "", image: "", price:"" });
      setEditId(null);
      setDialogOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Gabim gjatë ruajtjes:", error.message);
    }
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, image: product.image, price: product.price || ""});
    setEditId(product.id);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("A je i sigurt që dëshiron ta fshish?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:5000/api/adminProducts/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gabim gjatë fshirjes.");
       fetchProducts();
    } catch (error) {
      console.error("Gabim gjatë fshirjes:", error.message);
    }
  };

  return (
   <>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gray-300 mt-8 ">Create Products <Plus className='ml-2'/></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editId ? "Update Product" : "Create Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
         <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="col-span-3"
              required
            />
          </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
             Image Url
            </Label>
            <Input
              id="image"
              value={form.image}
              onChange={(e) => setForm({...form, image: e.target.value})}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
             Price
            </Label>
            <Input
              id="price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({...form, price: e.target.value})}
              className="col-span-3"
            />
          </div>
        
        <DialogFooter>
          <Button type="submit">{editId ? "Update" : "Add"}</Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>


  <Table className=" bg-fuchsia-400 mt-8">
    <TableCaption>A list of products.</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Image</TableHead>
        <TableHead>Price</TableHead>
        <TableHead className="text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {products.map((product) => (
        <TableRow key={product.id}>
          <TableCell>{product.name}</TableCell>
          <TableCell>
            <img src={product.image} alt={product.name} className="w-14 h-14 object-cover rounded" />
            </TableCell>
      
          <TableCell>{product.price ? `${product.price} €` : "0 €"}</TableCell>

          <TableCell className="text-center">
            <div className='flex justify-center gap-2'>
              <Button variant="ghost" onClick={() => handleEdit(product)}>
                <Pencil className='w-5 h-5'/>
              </Button>

              <Button variant="ghost" onClick={() => handleDelete(product.id)}>
                <Trash2 className='w-5 h-5 text-red-500' />
              </Button>

            </div>
          </TableCell>

        </TableRow>
      ))}
    </TableBody>
  </Table>
  <BottomNav/>
</>
  )
}

export default AdminProducts;
