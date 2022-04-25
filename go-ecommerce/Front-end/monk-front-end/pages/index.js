import React from "react";
import Head from "next/head";
import Image from "next/image";

export default function index() {
  return (
    <div>
      <main className="bg-gray-100 h-4/5 p-8">
        <div className="banner flex flex-column items-center justify-center flex-wrap">
          <div className="flex justify-center">
            <Image src="/images/banner.png" height={500} width={500} />
          </div>
          <div>
            <h1 className="text-5xl font-serif tracking-wider">
              STYLISH . ELEGANT . MESSAGE
            </h1>
            <p className="mt-4 text-2xl font-serif text-indigo-300">
              Monk is a clothing brand that does not only believe <br /> in
              being kind but also in leading a humble Life. <br />
              Dress Monk choose Peace
            </p>
            <input
              type="submit"
              value="Join Us!"
              className="shadow-inner bg-transparent border-2 border-indigo-300 hover:shadow-lg block w-72 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md text-center p-4 font-bold cursor-pointer mt-4"
            />
          </div>
        </div>
      </main>
      <div className="quick flex flex-row justify-around mx-12 mt-8">
        <input
          type="submit"
          value="Hoodies &rarr;" 
          className="font-serif tracking-wider bg-transparent border-2 border-indigo-300 hover:shadow-lg block w-52 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md text-center p-2 font-bold cursor-pointer mt-4"
        />
        <input
          type="submit"
          value="T-Shirts &rarr;"
          className="font-serif tracking-wider bg-transparent border-2 border-indigo-300 hover:shadow-lg block w-52 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md text-center p-2 font-bold cursor-pointer mt-4"
        />
        <input
          type="submit"
          value="Shorts &rarr;"
          className="font-serif tracking-wider bg-transparent border-2 border-indigo-300 hover:shadow-lg block w-52 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md text-center p-2 font-bold cursor-pointer mt-4"
        />
      </div>
    </div>
  );
}
