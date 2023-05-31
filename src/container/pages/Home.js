import { useEffect, useState } from 'react';

import { requires } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [outcome, setOutcome] = useState(0);
  const [getPage, setGetPage] = useState({});

  const getAllUser = async() => {
    const res = await requires.getAllUser();
    if(res.data.message === 'ok') {
      console.log('user', res.data);
      setUsers(res.data.users)
    }
  };

  const getAllOrder = async(page) => {
    const pages = page || 1;
    const res = await requires.getAllOrder(pages);
    if(res.data.message === 'ok') {
      console.log('order', res.data);
      setGetPage(res.data.orders);
      setOrders(res.data.orders.orders?.reverse())
    }
  };

  useEffect(() => {
    const totalAmount = orders.map(item => item.amount).reduce((init, curr) => {
      return +init + +curr;
    }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setOutcome(totalAmount);
  }, [orders])

  useEffect(()=> {
    getAllUser();
    getAllOrder();
  }, []);

  const handleShowOrder = async(id) => {
    const res = await requires.getDetailOrder(id);
    if(res.data.message === 'ok') {
      navigate(`/order/${id}`, {state: {data: res.data.order}});
    }
  };

  const handlePrev = () => {
    if (getPage.currPage > 1) {
      const page = +getPage.currPage - 1;
      getAllOrder(page);
    }
  };

  const handleNext = () => {
    if (getPage.totalPage > getPage.currPage) {
      const page = +getPage.currPage + 1;
      getAllOrder(page);
    }
  };

  return (
    <div className=''>
    <div className="home">
      <section className="d-flex justify-content-center home-title">
        <div className="home-title__group">
          <div className="">
            <h3>{users.length}</h3>
            <span>clients</span>
          </div>
          <div>
            <i className="fas fa-user-plus"></i>
          </div>
        </div>
        <div className="home-title__group">
          <div>
            <h3>{outcome} VND</h3>
            <span>Total Earning</span>
          </div>
          <div>
            <i className="fas fa-dollar-sign"></i>
          </div>
        </div>
        <div className="home-title__group">
          <div>
            <h3>{orders.length}</h3>
            <span>Orders</span>
          </div>
          <div>
            <i className="fas fa-plus-square"></i>
          </div>
        </div>
      </section>

    <section className="home-table">
      <h5>History</h5>
      <table className="table">
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.map((item, i) => {
            return (
              <tr key={item._id}>
                <th scope="row">{i+1}</th>
                <td>{item.user.name}</td>
                <td>{item.user.phone}</td>
                <td>{item.user.address}</td>
                <td>{item.amount}</td>
                <td style={{textTransform: 'capitalize'}}>{item.status}</td>
                <td>Paid</td>
                <td style={{textAlign:'center'}}><button onClick={handleShowOrder.bind(null, item._id)} className='btn btn-info'>View</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="page">
          <button onClick={handlePrev}>««</button>
          <span>{getPage?.currPage}</span>
          <button onClick={handleNext}>»»</button>
        </div>
    </section>
    </div>
    </div>
  );
};

export default Home;
