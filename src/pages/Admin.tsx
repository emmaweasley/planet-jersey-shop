import { useState, useEffect } from 'react';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
} from '@/lib/api';
import { Button } from '@/components/ui/button';
import AdminProductForm from '@/components/AdminProductForm';
import { Pencil, Trash2, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      toast.error('Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      await createProduct(productData);
      toast.success('Product added successfully');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to add product');
      console.error('Error adding product:', err);
    }
  };

  const handleEditProduct = async (productData: Product) => {
    try {
      await updateProduct(productData.id, productData);
      toast.success('Product updated successfully');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to update product');
      console.error('Error updating product:', err);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      await deleteProduct(product.id);
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (err) {
      toast.error('Failed to delete product');
      console.error('Error deleting product:', err);
    }
    setDeleteConfirm(null);
  };

  const handleFormSubmit = (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) {
      handleEditProduct(productData as Product);
    } else {
      handleAddProduct(productData);
    }
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      home: 'Home',
      away: 'Away',
      third: 'Third',
      fourth: 'Fourth',
    };
    return labels[type] || type;
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl">Admin Dashboard</h1>
        <span className="text-muted-foreground">
          {products.length} Products
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">
            No products yet. Add your first product!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-2 font-medium text-muted-foreground">
                  Product
                </th>
                <th className="text-left py-4 px-2 font-medium text-muted-foreground hidden sm:table-cell">
                  Club
                </th>
                <th className="text-left py-4 px-2 font-medium text-muted-foreground hidden md:table-cell">
                  Type
                </th>
                <th className="text-left py-4 px-2 font-medium text-muted-foreground">
                  Price
                </th>
                <th className="text-right py-4 px-2 font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border/50 hover:bg-card/50 transition-colors"
                >
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-medium truncate max-w-[150px] sm:max-w-none">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-2 hidden sm:table-cell text-muted-foreground">
                    {product.club}
                  </td>
                  <td className="py-4 px-2 hidden md:table-cell">
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
                      {getTypeLabel(product.type)}
                    </span>
                  </td>
                  <td className="py-4 px-2 font-medium">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-2">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditForm(product)}
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteConfirm(product)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Floating Add Button */}
      <button
        onClick={openAddForm}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105 flex items-center justify-center"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Product Form Modal */}
      <AdminProductForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        editingProduct={editingProduct}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteConfirm}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteConfirm?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDeleteProduct(deleteConfirm)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
