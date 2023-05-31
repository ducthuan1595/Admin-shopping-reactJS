import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { requires } from "../../services/api";
import { getTokenFromCookie } from "../../store/userStore";

const ActionProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { params } = useParams();
  const valueEdit = location.state?.data;

  const [inputValue, setInputValue] = useState({
    name: params === "edit-product" ? valueEdit.name : "",
    price: params === "edit-product" ? valueEdit.price : "",
    category: params === "edit-product" ? valueEdit.category : "",
    shortDesc: params === "edit-product" ? valueEdit.short_desc : "",
    longDesc: params === "edit-product" ? valueEdit.long_desc : "",
    count: params === "edit-product" ? valueEdit.count : "",
  });
  const [files, setFiles] = useState([]);
  const [errMessage, setErrMessage] = useState("");

  const handleChangeInput = (e, id) => {
    const cpState = { ...inputValue };
    cpState[id] = e.target.value;
    setInputValue(cpState);
  };

  const handleChangeFile = (e) => {
    const files = e.target.files;
    setFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params === "edit-product") {
      if(inputValue) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append(`images`, files[i]);
        }
        formData.append("name", inputValue.name);
        formData.append("price", inputValue.price);
        formData.append("category", inputValue.category);
        formData.append("shortDesc", inputValue.shortDesc);
        formData.append("longDesc", inputValue.longDesc);
        formData.append("count", inputValue.count);
        formData.append("productId", valueEdit._id);
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${getTokenFromCookie()}`,
          },
          
        };
        const res = await requires.editProduct(config, formData);
        if (res.data.message === "ok") {
          navigate("/product");
        } else {
          setErrMessage(res.data.message);
        }
      }
    } else {
      if(inputValue) {
        const formData = new FormData();
  
        formData.append("name", inputValue.name);
        formData.append("price", inputValue.price);
        formData.append("category", inputValue.category);
        formData.append("shortDesc", inputValue.shortDesc);
        formData.append("longDesc", inputValue.longDesc);
        formData.append("count", inputValue.count);
        for (let i = 0; i < files.length; i++) {
          formData.append(`images`, files[i]);
        }
        for (const pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
  
        const config = {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${getTokenFromCookie()}`,
          },
        };
        const res = await requires.addProduct(config, formData);
        if (res.data.message === "ok") {
          navigate("/product");
        } else {
          setErrMessage(res.data.message);
        }
      }
    }
  };

  return (
    <div className="action">
      <div className="action-product">
        <div className="action-title">
          <h4>
            {params === "edit-product" ? "Update Product" : "Add New Product"}
          </h4>
        </div>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              value={inputValue.name}
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Enter product's name"
              onChange={(e) => handleChangeInput(e, "name")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Category
            </label>
            <input
              type="text"
              value={inputValue.category}
              className="form-control"
              id="formGroupExampleInput2"
              onChange={(e) => handleChangeInput(e, "category")}
              placeholder="Enter product's category"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Price Product
            </label>
            <input
              type="text"
              value={inputValue.price}
              className="form-control"
              id="formGroupExampleInput2"
              onChange={(e) => handleChangeInput(e, "price")}
              placeholder="10999000"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Short Description
            </label>
            <textarea
              type="text"
              value={inputValue.shortDesc}
              className="form-control"
              id="Enter product's description"
              onChange={(e) => handleChangeInput(e, "shortDesc")}
              placeholder="Another input placeholder"
              rows={3}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formGroupExampleInput2" className="form-label">
              Long Description
            </label>
            <textarea
              type="text"
              value={inputValue.longDesc}
              className="form-control"
              id="formGroupExampleInput2"
              rows={6}
              onChange={(e) => handleChangeInput(e, "longDesc")}
              placeholder="Enter product's description"
            />
          </div>
          <div className="action-form">
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Update image
              </label>
              <input
                value={inputValue.images}
                style={{ width: "260px" }}
                type="file"
                multiple
                className="form-control"
                onChange={(e) => handleChangeFile(e, "images")}
                aria-label="First name"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Product's number
              </label>
              <input
                type="number"
                value={inputValue.count}
                className="form-control"
                onChange={(e) => handleChangeInput(e, "count")}
                aria-label="Last name"
              />
            </div>
          </div>
          <div className="err-message">{errMessage}</div>
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ActionProduct;
