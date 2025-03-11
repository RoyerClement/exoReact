export function ProductRow({ product, setProducts , money, setMoney}) {
    const style = product.stocked ? undefined : { color: "red" };
    const styleSell = product.sell ? undefined : { color: "red" };

    const buyProduct = (price) => {
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


    const inSell = () => {
      
      setProducts(prevProducts =>
        prevProducts.map(p =>
            p.name === product.name && p.number > 0
              ? {
                  ...p,
                  number:  p.number - 1, 
                  sell: p.sell + 1,
                  stocked: p.number === 1 ? false : p.stocked 
                }
              : p
          )
        );
      };

      const inStock = () => {
      
        setProducts(prevProducts =>
          prevProducts.map(p =>
              p.name === product.name && p.sell > 0
                ? {
                    ...p,
                    sell: p.sell > 0 ? p.sell - 1 : p.sell, 
                    number: p.number + 1,
                    stocked: p.number === 0 ? true : p.stocked 
                  }
                : p
            )
          );
        };
  
    return (
      <tr>
        <td style={style}>{product.name}</td>
        <td style={style}>{product.price}$</td>
        <td style={style}>{product.number}</td>
        <td>
          <button onClick={increment}>Acheter</button>
          <button onClick={decrease}>Vendre</button>
        </td><td>
          <button onClick={inSell}>Disposer</button>
          <button onClick={inStock}>Retirer</button>
        </td>
        <td style={styleSell}>{product.sell}</td>
      </tr>
    );
  }