import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {userContext} from "../utils/contexts/userContext"
import {useRouter} from "next/router"


export default function EditProduct() {
  const { register, handleSubmit } = useForm();

  const {edit, determinor} = useContext(userContext)

  const {editInfo} = edit
  const {setDetermine} = determinor

  //Declare NextJs Router
  const router = useRouter()

  // Function to send data to the backend with use of Axios
  const onSubmit = (data) => {

    const formData = new FormData();
    formData.append("product", data.product);
    formData.append("technology", data.technology);
    formData.append("color", data.color);
    formData.append("price", data.price);
    formData.append("size", data.size);
    formData.append("id", editInfo.productID)

    axios({
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: "http://localhost:9000/update-product",
      data: formData,
    })
      .then((res) => {
        if (res.data == "OK"){
          router.reload()
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    // This is a Form to Add Products

    <div className="flex flex-row w-full p-4">
      {/* Extra Info on form module */}

      <div className="w-1/4 flex items-center flex-col justify-center">
        <h1 className="font-serif text-2xl pb-4">Edit Product</h1>
        <p className="">
          Please Edit The product Information if and only if you are sure the
          products specification have changed. <br />
          Always be kind and lead a humble life
        </p>
      </div>

      {/* End of Extra Info on form module */}

      <div className="flex justify-center flex-grow border-gray-300 flex-wrap">
        <div className="flex items-center px-12 p-2 shadow-md rounded-md">
          {/* This is where the form starts */}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Product Type Module */}

            <div className="object-none object-center mx-w-xs m-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Product
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                <select
                  name="product"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block mx-w-xs pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  {...register("product")}
                  defaultValue = {editInfo.product}
                >
                  <option selected value="Hoodies">
                    Hood
                  </option>
                  <option value="T-Shirt">T-Shirt</option>
                  <option value="shorts">Biker-Shorts</option>
                </select>
              </div>
            </div>

            {/* End Of Product Type Module */}

            {/* The Type Of Tech Module */}

            <div className="object-none object-center mx-w-xs m-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Technology Used
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                <select
                  name="technology"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block mx-w-xs pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  {...register("technology")}
                  defaultValue = {editInfo.technology}
                >
                  <option value="Patch">Badge Patch</option>
                  <option selected value="Vynl">
                    Vynl
                  </option>
                  <option value="Print">Print</option>
                </select>
              </div>
            </div>

            {/* End Of The Type Of Tech Module */}

            {/* Color of the Product Module */}

            <div className="object-none object-center mx-w-xs m-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Color
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                <input
                  type="text"
                  name="color"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block mx-w-xs pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  {...register("color")}
                  defaultValue = {editInfo.color}
                />
              </div>
            </div>

            {/*End Color of the Product Module */}

            {/* Price of the Product Module */}

            <div className="flex justify-between px-2">
              <div className="">
                <div>
                  <label htmlFor="">Price</label>
                </div>
                <div>
                  <input
                    type="text"
                    name="price"
                    className="block mx-w-xs pl-7 pr-12 sm:text-sm border-gray-300 rounded-md w-1/2 appearance-textfield"
                    {...register("price")}
                    defaultValue = {editInfo.price}
                  />
                </div>
              </div>

              {/* End of Price of the Product Module */}

              {/* Size of the Product Module */}

              <div>
                <div>
                  <label htmlFor="">Size</label>
                </div>
                <div>
                  <select
                    type="text"
                    name="size"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block mx-w-xs pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    {...register("size")}
                  >
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                  </select>
                </div>
              </div>
            </div>

            {/* End of Size of the Product Module */}

            <div className="flex justify-center p-2">
              <input
                type="submit"
                value="Register"
                className="hover:shadow-md block w-72 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md text-center p-4 font-bold cursor-pointer mt-4"
              />
            </div>
          </form>

          {/* End of Add Product Form */}
        </div>
      </div>
    </div>
  );
}
