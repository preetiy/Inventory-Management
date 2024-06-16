import { useEffect, useState, useMemo } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import StatsTab from './Components/StatsTab/StatsTab';
import ItemList from './Components/ItemList/ItemList';

function App() {
  const [products, setProducts] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const [isUser, setIsUser] = useState(false);

  const stats = useMemo(() => {
    let totalProducts = 0;
    let totalValue = 0;
    let outOfStock = 0;
    const categories = new Set();

    products.forEach((product) => {
      totalProducts += product.quantity;
      totalValue += product.quantity * parseFloat(product.price.substring(1));
      if (product.quantity === 0) outOfStock += 1;
      categories.add(product.category);
    });

    return {
      totalProducts,
      totalValue,
      outOfStock,
      totalCategory: categories.size,
    };
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory');
        const data = await res.json();
        setProducts(data);
        setShowProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <Header setIsUser={setIsUser} />
      <StatsTab {...stats} />
      {products?.length ? (
        <ItemList
        products={products}
        setProducts={setProducts}
        isUser={isUser}
        showProducts={showProducts}
        setShowProducts={setShowProducts}
      />
      ) : null}
    </div>
  );
}

export default App;
