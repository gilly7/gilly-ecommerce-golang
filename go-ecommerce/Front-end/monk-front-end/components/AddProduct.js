import React from "react";
import { useForm} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/router"

export default function AddProduct() {
  const { register, handleSubmit} = useForm();
  const router = useRouter()

// Function to send data to the backend with use of Axios
  const onSubmit = (data) => {


    const formData = new FormData()
    formData.append("product", data.product)
    formData.append("technology", data.technology)
    formData.append("color", data.color)
    formData.append("price", data.price)
    formData.append("size", data.size)
    formData.append("file", data.file)
    
    // console.log(data.file)

    // for (let image in data.file){
    //     console.log(image)
    // }
    Object.entries(data.file).map(image => {
        formData.append("file",image[1], image[1].name )
    })

    console.log(formData.get("file"))
  
    
    axios({
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      url: "http://localhost:9000/add-products",
      data: formData,
    })
      .then((res) => {
        if(res.status === 200){
          router.reload()
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
// This is a Form to Add Products

    <div className="flex flex-row w-full p-4">

{/* Extra Info on form module */}

      <div className="w-1/4 ">
        <h1 className="font-serif text-2xl pb-4">Add Product</h1>
        <p className="">
          Please Add Available and products that can be delivered on a timely
          manner. <br />
          Always be kind and lead a humble life
        </p>
      </div>

{/* End of Extra Info on form module */}

      <div className="flex items-center justify-center flex-grow border-gray-300 flex-wrap">
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
                />
              </div>
            </div>

{/*End Color of the Product Module */}

{/* Images of the Product Module */}

            <div className="object-none object-center mx-w-xs m-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
                <div className="mt-1">
                  <div className="flex w-full h-1/4 items-center justify-center bg-grey-lighter">
                    <label className="w-full flex flex-col items-center bg-white text-blue rounded-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:border-indigo-500">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                      </svg>

                      <input
                        type="file"
                        className="hidden"
                        multiple
                        {...register("file")}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

{/*End of Images of the Product Module */}

{/* Price of the Product Module */}


            <div className="flex justify-between px-2">
              <div className="">
                <div>
                  <label htmlFor="">Price</label>
                </div>
                <div>
                  <input
                    type="number"
                    name="price"
                    className="block mx-w-xs pl-7 pr-12 sm:text-sm border-gray-300 rounded-md w-1/2 appearance-textfield"
                    {...register("price")}
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
