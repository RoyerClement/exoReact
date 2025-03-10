export function ProductRow({ product, setProducts , money, setMoney}) {
    const style = product.stocked ? undefined : { color: "red" };
    
    
    const buyProduct = (price) => {
        console.log(price, " est le prix")
        if (money >= price) {
          setMoney(money - price);  
        } else {
          alert("Vous n'avez pas assez d'argent!");
        }
      };
    const sellProduct = (price) => {
          setMoney(money + price);    
      };

    const increment = () => {
        console.log(money)
        console.log(product.price)
        if (money >= product.price){
        buyProduct(product.price)
        setProducts   (prevProducts =>
        prevProducts.map(p =>
          p.name === product.name 
            ? { ...p, 
                number: p.number + 1 ,
                stocked : p.number === 0 ? true : p.stocked
            }
            : p
        ),
      );}
      
    };

    const decrease = () => {
      setProducts(prevProducts =>
        prevProducts.map(p =>
            p.name === product.name
              ? {
                  ...p,
                  number: p.number > 0 ? p.number - 1 : p.number, 
                  stocked: p.number === 1 ? false : p.stocked 
                }
              : p
          )
        );
        if(product.number > 0){
        sellProduct(product.price)}
      };
  
    return (
      <tr>
        <td style={style}>{product.name}</td>
        <td style={style}>{product.price}$</td>
        <td style={style}>{product.number}</td>
        <td>
          <button onClick={increment}>Acheter</button>
          <button onClick={decrease}>Vendre</button>
        </td>
      </tr>
    );
  }