import { Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      home: 'Home Kit',
      away: 'Away Kit',
      third: 'Third Kit',
      fourth: 'Fourth Kit',
    };
    return labels[type] || type;
  };

  return (
    <div className="jersey-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="aspect-square bg-secondary overflow-hidden">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-medium text-primary uppercase tracking-wider">
              {product.club}
            </span>
            <h3 className="font-semibold text-foreground line-clamp-1">
              {product.name}
            </h3>
          </div>
          <span className="inline-block px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
            {getTypeLabel(product.type)}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
