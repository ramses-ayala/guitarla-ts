

import Header from "./components/Header";
import Guitar from "./components/Guitar";

import useCart from "./hooks/userCart";

function App() {

  const { 
    guitars,
    cart,
    handleAddCart,
    handleDeleteItem,
    handleIncrementItems,
    handleDecrementItems,
    handleEmptyCart,
    setTotal,
    isEmpty
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        handleDeleteItem={handleDeleteItem}
        handleEmptyCart={handleEmptyCart}
        handleIncrementItems={handleIncrementItems}
        handleDecrementItems={handleDecrementItems}
        setTotal={setTotal}
        isEmpty={isEmpty}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {guitars.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              handleAddCart={handleAddCart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
