import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Documentation = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Shop
      </Link>

      <h1 className="font-display text-5xl mb-8">
        <span className="text-primary">PLANET</span> JERSEY
        <span className="text-muted-foreground text-2xl block mt-2">Documentation</span>
      </h1>

      <div className="space-y-8 text-foreground">
        {/* Overview */}
        <section className="bg-card rounded-lg p-6">
          <h2 className="font-display text-2xl text-primary mb-4">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            Planet Jersey is a football jersey e-commerce platform built with React, Vite, and 
            TypeScript. It connects to a MySQL backend via REST API for product management.
          </p>
        </section>

        {/* Getting Started */}
        <section className="bg-card rounded-lg p-6">
          <h2 className="font-display text-2xl text-primary mb-4">Getting Started</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">1. Start the Backend</h3>
              <p>Make sure your MySQL backend is running at <code className="bg-muted px-2 py-1 rounded">http://localhost:3000</code></p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">2. Start the Frontend</h3>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>npm install{'\n'}npm run dev</code>
              </pre>
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="bg-card rounded-lg p-6">
          <h2 className="font-display text-2xl text-primary mb-4">Required API Endpoints</h2>
          <p className="text-muted-foreground mb-4">
            Your backend should implement these endpoints:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground">Method</th>
                  <th className="text-left py-2 text-foreground">Endpoint</th>
                  <th className="text-left py-2 text-foreground">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-2"><code className="text-green-400">GET</code></td>
                  <td className="py-2"><code>/products</code></td>
                  <td className="py-2">List all products</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2"><code className="text-green-400">GET</code></td>
                  <td className="py-2"><code>/products/:id</code></td>
                  <td className="py-2">Get single product</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2"><code className="text-blue-400">POST</code></td>
                  <td className="py-2"><code>/products</code></td>
                  <td className="py-2">Create product</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2"><code className="text-yellow-400">PUT</code></td>
                  <td className="py-2"><code>/products/:id</code></td>
                  <td className="py-2">Update product</td>
                </tr>
                <tr>
                  <td className="py-2"><code className="text-red-400">DELETE</code></td>
                  <td className="py-2"><code>/products/:id</code></td>
                  <td className="py-2">Delete product</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Product Schema */}
        <section className="bg-card rounded-lg p-6">
          <h2 className="font-display text-2xl text-primary mb-4">Product Schema</h2>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`{
  "id": number,
  "name": string,      // e.g., "Liverpool Home Jersey 24/25"
  "club": string,      // e.g., "Liverpool"
  "type": string,      // "home" | "away" | "third" | "fourth"
  "price": number,     // e.g., 89.99
  "image": string,     // URL to jersey image
  "description": string // Optional description
}`}</code>
          </pre>
        </section>

        {/* Features Guide */}
        <section className="bg-card rounded-lg p-6">
          <h2 className="font-display text-2xl text-primary mb-4">Features Guide</h2>
          <div className="space-y-6 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground mb-2">🏠 Shop Page</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Browse all available jerseys</li>
                <li>Filter by kit type (Home, Away, Third, Fourth)</li>
                <li>Add products to cart with one click</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">🛒 Cart Page</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>View all items in your cart</li>
                <li>Adjust quantities or remove items</li>
                <li>See order total and proceed to checkout</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">⚙️ Admin Page</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>View all products in a table format</li>
                <li>Click the floating <span className="text-primary">+</span> button to add a new product</li>
                <li>Click the pencil icon to edit a product</li>
                <li>Click the trash icon to delete a product</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cart Storage */}
        <section className="bg-card rounded-lg p-6">
          <h2 className="font-display text-2xl text-primary mb-4">Cart Storage</h2>
          <p className="text-muted-foreground">
            The shopping cart is stored in the browser's localStorage under the key{' '}
            <code className="bg-muted px-2 py-1 rounded">planet-jersey-cart</code>. 
            Cart data persists across page refreshes and browser sessions.
          </p>
        </section>

        {/* Backend Configuration */}
        <section className="bg-card rounded-lg p-6">
          <h2 className="font-display text-2xl text-primary mb-4">Backend Configuration</h2>
          <p className="text-muted-foreground mb-4">
            To change the backend URL, edit the <code className="bg-muted px-2 py-1 rounded">src/lib/api.ts</code> file:
          </p>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code>{`const API_BASE_URL = 'http://localhost:3000';`}</code>
          </pre>
        </section>

        {/* Tips */}
        <section className="bg-card rounded-lg p-6">
          <h2 className="font-display text-2xl text-primary mb-4">Tips</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Enable CORS on your backend to allow requests from the frontend</li>
            <li>Use high-quality jersey images for the best display</li>
            <li>Keep product names concise but descriptive</li>
            <li>Use consistent club names for better organization</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
