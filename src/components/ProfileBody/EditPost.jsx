import React from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";

const EditPost = () => {
  const loader = useLoaderData();
  console.log(loader);
  const id = loader.id;
  console.log(id);
  const navigate = useNavigate();

  let productDetail;
  let category;

  function gatherUpdatedProductDetail(event) {
    event.preventDefault();
    const form=event.target.form;

    let img = form.img.value;
    let aboutProduct = form.aboutProduct.value;
    let category = form.category.value;
    let name = form.name.value;
    let price = form.price.value;
    let stock = form.stock.value;
    let shipping = form.shipping.value;

    productDetail = { aboutProduct, category, img, name, price, stock, shipping };
  }

  function viewProductUpdatedDetail(event) {
    event.preventDefault();
    console.log(productDetail);
    fetch(`http://localhost:5000/post/updatePost/${id}`,{
        method:'put',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify(productDetail)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.modifiedCount>0)
        {
            alert('your post has been updated')
            navigate('/profile');
        }
    })
  }

  return (
    <div className="mt-60 pb-10">
      <h1 className="text-center text-2xl text-white"> Edit A Post <br /><small>Previous value is being shown</small></h1>
      <form onSubmit={viewProductUpdatedDetail} className="">
        <div className="mt-2 flex flex-col gap-2 justify-center items-center">
          <input
            onChange={gatherUpdatedProductDetail}
            name="img"
            type="text"
            placeholder="Provide img url"
            defaultValue={loader.img}
            className="input input-bordered input-primary w-full max-w-xs hover:border-blue-500"
            required
          />
          <small>
            provide img url..To convirt your img into url use{" "}
            <Link target="blank" className="underline" to="https://imgbb.com/">
              imegebb
            </Link>
          </small>
          <input
            onChange={gatherUpdatedProductDetail}
            name="price"
            type="text"
            placeholder="Product Price"
            defaultValue={loader.price}
            className="input input-bordered input-primary w-full max-w-xs hover:border-blue-500 "
            required
          />

          <input
            onChange={gatherUpdatedProductDetail}
            name="name"
            type="text"
            placeholder="Product Name"
            defaultValue={loader.name}
            className="input input-bordered input-primary w-full max-w-xs hover:border-blue-500"
            required
          />

          <input
            onChange={gatherUpdatedProductDetail}
            name="aboutProduct"
            type="text"
            placeholder="About Product"
            defaultValue={loader.aboutProduct}
            className="input input-bordered input-primary w-full max-w-xs hover:border-blue-500"
            required
          />

          <input
            onChange={gatherUpdatedProductDetail}
            name="stock"
            type="text"
            placeholder="Aveable Quantity"
            defaultValue={loader.stock}
            className="input input-bordered input-primary w-full max-w-xs hover:border-blue-500"
            required
          />
          <input
            onChange={gatherUpdatedProductDetail}
            name="shipping"
            type="text"
            placeholder="Shipping Cost"
            defaultValue={loader.shipping}
            className="input input-bordered input-primary w-full max-w-xs hover:border-blue-500"
            required
          />

          <select
            value={category}
            onChange={gatherUpdatedProductDetail}
            className="select select-primary w-full max-w-xs hover:border-2 hover:border-blue-500"
            name="category"
            defaultValue={loader.category}
            required
          >
            <option value="default">Category</option>
            <option>Art</option>
            <option>craft</option>
          </select>
        </div>

        <div className="flex justify-center gap-1 mt-2 ">
          <button type="submit" className="btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
