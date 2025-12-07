import { useState, useEffect } from 'react';
import { Product } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AdminProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'> | Product) => void;
  editingProduct?: Product | null;
}

const AdminProductForm = ({
  isOpen,
  onClose,
  onSubmit,
  editingProduct,
}: AdminProductFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    club: '',
    type: 'home' as 'home' | 'away' | 'third' | 'fourth',
    price: '',
    image: '',
    description: '',
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        club: editingProduct.club,
        type: editingProduct.type,
        price: editingProduct.price.toString(),
        image: editingProduct.image,
        description: editingProduct.description || '',
      });
    } else {
      setFormData({
        name: '',
        club: '',
        type: 'home',
        price: '',
        image: '',
        description: '',
      });
    }
  }, [editingProduct, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...(editingProduct ? { id: editingProduct.id } : {}),
      name: formData.name,
      club: formData.club,
      type: formData.type,
      price: parseFloat(formData.price),
      image: formData.image,
      description: formData.description,
    };

    onSubmit(productData as Product);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Liverpool Home Jersey 24/25"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="club">Club Name</Label>
            <Input
              id="club"
              value={formData.club}
              onChange={(e) => setFormData({ ...formData, club: e.target.value })}
              placeholder="Liverpool"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Kit Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: 'home' | 'away' | 'third' | 'fourth') =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select kit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home Kit</SelectItem>
                <SelectItem value="away">Away Kit</SelectItem>
                <SelectItem value="third">Third Kit</SelectItem>
                <SelectItem value="fourth">Fourth Kit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="89.99"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/jersey.jpg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Official club jersey for the 24/25 season"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingProduct ? 'Update' : 'Add'} Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminProductForm;
