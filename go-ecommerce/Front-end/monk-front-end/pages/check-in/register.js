import { useForm } from "react-hook-form";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import axios from "axios";

export default function Home() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
    };
    console.log(data);
    axios({
      method: "POST",
      headers,
      url: "http://localhost:9000/register",
      data,
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-200 h-screen">
        <form
          action=""
          className="flex justify-center flex-col items-center h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="object-none object-center mx-w-xs m-2">
            <label
              htmlFor="First Name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="text"
                name="first"
                className="focus:ring-indigo-500 focus:border-indigo-500 block mx-w-xs pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                {...register("first")}
              />
            </div>
          </div>
          <div className="object-none object-center mx-w-xs m-2">
            <label
              htmlFor="Last Name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                id="lastNameID"
                type="text"
                name="last"
                className="focus:ring-indigo-500 focus:border-indigo-500 block mx-w-xs pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                {...register("last")}
              />
            </div>
          </div>
          <div className="object-none object-center mx-w-xs m-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="email"
                name="email"
                className="focus:ring-indigo-500 focus:border-indigo-500 block mx-w-xs pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                {...register("email")}
              />
            </div>
          </div>
          <div className="object-none object-center mx-w-xs m-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"></div>
              <input
                type="password"
                name="password"
                className="focus:ring-indigo-500 focus:border-indigo-500 block mx-w-xs pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                {...register("password")}
              />
            </div>
          </div>

          <input
            type="submit"
            value="Register"
            className="bg-indigo-300 hover:bg-indigo-500 block w-72 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md text-center p-4 font-bold cursor-pointer mt-4"
          />
          <p className="mt-4 cursor-pointer">
            Are you Registered?{" "}
            <Link href = "/check-in/login">
              <span className="text-indigo-500">Log In</span>
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}