export function AfricanMarket (productList) {
    productList.push(
        { category: "Vegetables", price: 6, stocked: false, number: 0, name: "Igname" , sell: 0},
        { category: "Vegetables", price: 3, stocked: false, number: 0, name: "Onion" , sell: 0},
        { category: "Fruits", price: 4, stocked: false, number: 0, name: "Banane Plantain", sell: 0 },
        { category: "Dry Product", price: 9, stocked: false, number: 0, name: "Coffee", sell: 0 },
        { category: "Dry Product", price: 11, stocked: false, number: 0, name: "Hibiscus", sell: 0 },
    )
    return <button onClick={()=>{
              AfricanMarket(PRODUCTS)}
            }>Progresser dans le marché africain</button>
}