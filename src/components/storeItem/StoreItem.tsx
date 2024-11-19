import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../../utilities/formatCurrency";
import { useShoppingCart } from "../../context/ShoppingCartContext";

interface StoreItemProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

function StoreItem({ id, name, price, imageUrl }: StoreItemProps) {
  const {
    getItemAmount,
    increaseCartAmount,
    decreaseCartAmount,
    removeFromCart,
  } = useShoppingCart();
  const amount = getItemAmount(id);

  return (
    <>
      <Card id="card">
        <Card.Img
          variant="top"
          src={imageUrl}
          height="200px"
          className="store-item-image"
        ></Card.Img>
        <Card.Body id="cardBody">
          <Card.Title id="cardTitle">
            <span className="fs-2">{name}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>
          </Card.Title>
          <div id="cardButtonContainer">
            {amount === 0 ? (
              <Button className="w-100" onClick={() => increaseCartAmount(id)}>
                + Add To Cart
              </Button>
            ) : (
              <>
                <div>
                  <Button
                    id="descreaseAmountButton"
                    onClick={() => decreaseCartAmount(id)}
                  >
                    -
                  </Button>
                  <div>
                    <span id="amount" className="fs-3">
                      {amount}
                    </span>{" "}
                    in cart
                  </div>
                  <Button
                    id="increaseAmountButton"
                    onClick={() => increaseCartAmount(id)}
                  >
                    +
                  </Button>
                </div>
                <div>
                  <Button
                    id="removeButton"
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(id)}
                  >
                    Remove
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default StoreItem;
