import { useContext, useEffect, useState } from "react";
import { requires } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { Buffer } from 'buffer';
import { toast } from 'react-toastify';
import handleToast from '../../util/toast';
import { Context } from "../../store/userStore";

const ListProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(null);
  const [getProducts, setGetProducts] = useState();

  const { currUser } = useContext(Context);

  const getAllProduct = async (page) => {
    const pages = page || 1;
    const limit = 20;
    const res = await requires.getAllProduct(pages, limit);
    if (res.data.message === "ok") {
      console.log(res.data);
      setGetProducts(res.data.products);
      setProducts(res.data.products.products);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  useEffect(() => {
    const result = getProducts?.products.filter(item => {
      return item.name.toLowerCase().includes(search?.toLowerCase());
    })
    setProducts(result?.length > 0 ? result : getProducts?.products);
  }, [search])

  const handlePrev = () => {
    if (getProducts.currPage > 1) {
      const page = +getProducts.currPage - 1;
      getAllProduct(page);
    }
  };

  const handleNext = () => {
    if (getProducts.totalPage > getProducts.currPage) {
      const page = +getProducts.currPage + 1;
      getAllProduct(page);
    }
  };

  const handleDelete = async(id) => {
    const alter = window.confirm('Are you sure?')
    if(alter) {
      const res = await requires.deleteProduct(id, currUser.userId);
      if(res.data.message === 'ok') {
        getAllProduct();
        handleToast(toast.success, 'Remove product successfully!');
      }else {
        handleToast(toast.error, res.data.message);
      }
    }
  };

  const handleEdit = async(id) => {
    const res = await requires.getEditProduct(id);
    if(res.data.message === 'ok') {
      navigate(`/product-action/edit-product?${id}`, {state: {data: res.data.product}});
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  console.log(products);

  return (
    <div className="list-product">
      <div className="product-title">
        <h5>Product</h5>
        <input onChange={handleSearch} type="text" name="search" placeholder="Enter name's product" />
      </div>
      <div className="product-table">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Category</th>
              <th>Count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products?.map((item, i) => {
                const base64 = Buffer.from(item.images[0]).toString('base64');
                let price = item?.price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                return (
                  <tr key={item._id}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td style={{ textAlign: "center" }}>{price}</td>
                    <td style={{ textAlign: "center" }}>
                      <img
                        style={{ width: "100px" }}
                        src={'data:image/jpeg;base64,' + base64}
                        alt={item.name}
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>{item.category}</td>
                    <td style={{ textAlign: "center" }}>{item.count}</td>
                    <td style={{ textAlign: "center" }}>
                      <button onClick={handleEdit.bind(null, item._id)} className="btn btn-primary">
                        Edit
                      </button>
                      <button
                        onClick={handleDelete.bind(null, item._id)}
                        className="btn btn-danger ms-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="page">
          <button onClick={handlePrev}>««</button>
          <span>{getProducts?.currPage}</span>
          <button onClick={handleNext}>»»</button>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
