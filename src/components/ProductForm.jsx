import React, { useState } from "react";
import useUserStore from "../stores/userStore";
import useProductStore from "../stores/productStore";
import { toast } from "react-toastify";
import { PhotoIcon2 } from "../icons";
import AddPicture from "./AddPicture";
import useCategoryStore from "../stores/categoryStore";

function ProductForm() {
  const user = useUserStore((state) => state.user);
  const token = useUserStore((state) => state.token);
  const createProduct = useProductStore((state) => state.createProduct);
  const category = useCategoryStore((state) => state.category);
  const loading = useProductStore((state) => state.loading);

  const [addPic, setAddPic] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const hdlCreateProduct = async () => {
    try {
      const body = new FormData();

      body.append("name", name);
      console.log(name);
      body.append("description", description);
      body.append("price", price);
      body.append("stock", stock);
      body.append("image", file);
      body.append("category_id", categoryId);

      console.log(categoryId);

      const response = await createProduct(body, token, user);
      toast.success(response.data.message);
      document.getElementById("productform-modal").close();
    } catch (err) {
      const errMsg = err.response?.data.error || err.message;
      toast.error(errMsg);
    }
  };

  return (
    <div
      className={`flex flex-col justify-center transition-opacity duration-300 ${
        loading ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <p className="text-4xl font-bold text-center">Product</p>
      <div className="divider"></div>
      <label className="flex flex-col gap-2">
        <p>Name:</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          className="input w-full"
        />
      </label>

      <label className="flex flex-col gap-2 mt-2">
        <p>Description:</p>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter produt description"
          className="input w-full"
        />
      </label>

      <label className="flex flex-col gap-2 mt-2">
        <p>Price:</p>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter product price"
          className="input w-full"
        />
      </label>

      <label className="flex flex-col gap-2 mt-2">
        <p>Stock:</p>
        <input
          type="text"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Enter product Stock"
          className="input w-full"
        />
      </label>

      <label className="flex flex-col gap-2 mt-2">
        <p>Image:</p>
        {addPic && <AddPicture file={file} setFile={setFile} />}
        <div className="input flex justify-between w-full items-center cursor-pointer">
          <p className="opacity-55">Enter product image</p>
          <div
            className="flex justify-center items-center w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 active:scale-110 "
            onClick={() => setAddPic((prv) => !prv)}
          >
            <PhotoIcon2 className="w-5" />
          </div>
        </div>
      </label>

      <label className="flex flex-col gap-2 mt-2">
        <p>Category:</p>
        <select
          className="select"
          name="category"
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled hidden>
            -- Pick a category --
          </option>
          {category.map((category) => (
            <option value={category.category_id} key={category.category_id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={hdlCreateProduct} 
      className="btn btn-neutral"
      disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          "Create"
        )}
      </button>
    </div>
  );
}

export default ProductForm;
