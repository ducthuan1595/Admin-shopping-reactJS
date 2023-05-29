import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Buffer } from "buffer";

const DetailOrder = () => {
  const location = useLocation();
  const [order, setOrder] = useState(location.state.data);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    let amount = order.amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setAmount(amount)
  }, [])

  console.log(order);

  return (
    <div className='order'>
      <section className='order-title'>
        <h2>INFORMATION ORDER</h2>
        <div>Name: {order.user.name}</div>
        <div>Phone: {order.user.phone}</div>
        <div>Address {order.user.address}</div>
        <div>Total: {amount} VND</div>
      </section>
      <table>
        <thead>
        <tr>
          <th>NAME</th>
          <th>CATEGORY</th>
          <th>IMAGE</th>
          <th>PRICE</th>
          <th>COUNT</th>
        </tr>
        </thead>
        <tbody>
          {order && order.items.map(item => {
            const p = item.productId;
            const buffer = Buffer.from(p.images[0]).toString('base64');
            let price = p?.price?.toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            return (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
          <td><img style={{height: '100px'}} src={'data:image/jpeg;base64,' + buffer} alt={p.name} /></td>
          <td>{price}</td>
          <td>{item.quantity}</td>
              </tr>
            )
          })}
          </tbody>
      </table>
    </div>
  );
};

export default DetailOrder;
