//Nouveau projet

import React, { useState } from 'react';
import { Checkbox } from "./components/forms/Checkbox";
import { Input } from "./components/forms/Input.jsx";
import { Range } from "./components/forms/Range.jsx";
import { ProductRow } from "./components/products/ProductRow.jsx";
import { ProductCategoryRow } from "./components/products/ProductCategoryRow.jsx";
import { AsianMarket } from "./components/addProductRow/AsianMarket.jsx"

function App() {
  const [PRODUCTS, setPRODUCTS] = useState([
    { category: "Fruits", price: 1, stocked: true, number: 17, name: "Apple" },
    { category: "Fruits", price: 4, stocked: true, number: 12, name: "Pineapple" },
    { category: "Fruits", price: 2, stocked: false, number: 0, name: "Pear" },
    { category: "Vegetables", price: 3, stocked: true, number: 5, name: "Tomato" },
    { category: "Vegetables", price: 5, stocked: true, number: 32, name: "Pumpkin" },
    { category: "Vegetables", price: 2, stocked: false, number: 0, name: "Carrot" },
  ]);
  let maxPrice = PRODUCTS.reduce((max, product) => {
     return Math.max(max, product.price);
  }, 0);
  const [money, setMoney] = useState(50);  
  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [range, setRange] = useState(maxPrice);
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
  console.log("maxPrice dans App:", maxPrice);
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
    </div>
  );  
}
function ProductTable({ products, setPRODUCTS, money, setMoney }) {
  const rows = [];
  let lastCategory = [];

  for (let product of products) {
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
          <th>Nombre</th>
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