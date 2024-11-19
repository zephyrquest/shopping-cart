import { Col, Row } from "react-bootstrap";
import items from "../data/items.json";
import StoreItem from "../components/storeItem/StoreItem";

function Store() {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3}>
        {items.map((item) => (
          <Col className="mb-3" key={item.id}>
            <StoreItem
              id={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imgUrl}
            />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
