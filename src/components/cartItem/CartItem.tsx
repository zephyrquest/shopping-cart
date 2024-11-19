import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import items from "../../data/items.json";
import { formatCurrency } from "../../utilities/formatCurrency";

interface CartItemProps {
  id: number;
  amount: number;
}

export function CartItem({ id, amount }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = items.find((item) => item.id === id);

  if (item == null) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {amount > 1 && <span className="text-muted">x{amount}</span>}
        </div>
        <div className="text-muted">{formatCurrency(item.price)}</div>
      </div>
      <div>{formatCurrency(item.price * amount)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
