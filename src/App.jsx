//Nouveau projet

import React, { useState, useEffect } from 'react';
import { Checkbox } from "./components/forms/Checkbox";
import { Input } from "./components/forms/Input.jsx";
import { Range } from "./components/forms/Range.jsx";
import { ProductRow } from "./components/products/ProductRow.jsx";
import { ProductCategoryRow } from "./components/products/ProductCategoryRow.jsx";
import { AsianMarket } from "./components/addProductRow/AsianMarket.jsx"
import { AfricanMarket } from './components/addProductRow/AfricanMarket.jsx';

function App() {
  const [PRODUCTS, setPRODUCTS] = useState([
    { category: "Fruits", price: 1, stocked: true, number: 17, name: "Apple", sell: 0, time: 1800},
    { category: "Fruits", price: 4, stocked: true, number: 12, name: "Pineapple", sell: 0, time: 2400 },
    { category: "Fruits", price: 2, stocked: false, number: 0, name: "Pear", sell: 0, time: 2000 },
    { category: "Vegetables", price: 3, stocked: true, number: 5, name: "Tomato", sell: 0, time: 1500 },
    { category: "Vegetables", price: 5, stocked: true, number: 32, name: "Pumpkin", sell: 0, time: 2500 },
    { category: "Vegetables", price: 2, stocked: false, number: 0, name: "Carrot", sell: 0, time: 1700 },
  ]);
  
  let maxPrice = PRODUCTS.reduce((max, product) => {
     return Math.max(max, product.price);
  }, 0);

  const [money, setMoney] = useState(50);  
  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [range, setRange] = useState(0);

  const visibleProducts = PRODUCTS.filter(product =>{
    if (showStockedOnly && !product.stocked) {
      return false
    } 
    if (search && !product.name.includes(search)) {
      return false
    }
    if (product.price < range) {return false}
      return true
  } 
  )

  function updateProduct(product) {
    setMoney(prevMoney => prevMoney + product.price * 1.5);
    setProducts(prevProducts =>
      prevProducts.map(p =>
        p.name === product.name && p.sell > 0
          ? {
              ...p,
              sell: p.sell - 1
            }
          : p
      )
    );
  }
  useEffect(() => {
    const intervals = PRODUCTS.map(product => {
      // Si le produit a des articles à vendre (sell > 0), on crée un intervalle
      if (product.sell > 0) {
        const interval = setInterval(() => {
          setPRODUCTS(prevProducts =>
            prevProducts.map(p =>
              p.name === product.name && p.sell > 0
                ? { ...p, sell: p.sell - 1 }  // Diminue `sell` de 1 pour ce produit
                : p
            )
          );
          setMoney(prevMoney => prevMoney + product.price * 1.5); // Ajoute de l'argent au portefeuille
        }, product.time);  // Chaque produit a son propre intervalle basé sur `product.time`
        return interval;
      }
      return null;
    });

    // Nettoyage des intervalles au démontage du composant
    return () => {
      intervals.forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, [PRODUCTS]);
  
  
  return (
    <div className="container my-3">
      <SearchBar
        search={search}
        onSearchChange={setSearch}
        range={range}
        onRangeChange={setRange}
        showStockedOnly={showStockedOnly}
        onStockedOnlyChange={setShowStockedOnly}
        maxPrice={maxPrice}
      />
      <div><h1>Epargne : {money}$</h1></div> 
      <ProductTable products={visibleProducts} setPRODUCTS={setPRODUCTS} money={money} setMoney={setMoney} />
        <button onClick={()=>{
          AsianMarket(PRODUCTS)}
        }>Progresser dans le marché asiatique</button>
        <button onClick={()=>{
          AfricanMarket(PRODUCTS)}
        }>Progresser dans le marché africain</button>
    </div>
  );  
}
function ProductTable({ products, setPRODUCTS, money, setMoney }) {
  const rows = [];
  let lastCategory = [];
  const sortedProducts = [...products].sort((a, b) => a.category.localeCompare(b.category));


  for (let product of sortedProducts) {
    if (!lastCategory.includes(product.category)) {
      rows.push(<ProductCategoryRow key={product.category} name={product.category} />);
      lastCategory.push(product.category);
    } 
    rows.push(<ProductRow product={product} key={product.name} setProducts={setPRODUCTS}  money={money} setMoney={setMoney}/>);
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Prix</th>
          <th>Stock</th>
          <th></th><th></th>
          <th>Mise en rayon</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({showStockedOnly, onStockedOnlyChange, search, onSearchChange, range, onRangeChange, maxPrice}) {
  console.log("MaxPrice dans la fonction SearchBar : ", maxPrice)
  return (
    <div>
      <div className="mb-3">

        <Input 
        value={search} 
        onChange={onSearchChange} 
        placeHolder="Rechercher..." 
        />

        <Range placeholder={"Prix minimum"}
               min={0}
               max={maxPrice}
               value={range}
               onChange={onRangeChange}
        />

        <Checkbox 
          id="stocked" 
          checked={showStockedOnly} 
          onChange={onStockedOnlyChange} 
          label="N'afficher que les produits en stock" 
        />
      </div>
    </div>
  );
}

export default App;