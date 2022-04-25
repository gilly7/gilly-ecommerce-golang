import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { userContext } from "../pages/utils/contexts/userContext";

const nav = () => {
  const { userDetails } = useContext(userContext);

  const { user, setUser } = userDetails;

  return (
    // Beginning of the Main NavBar

    <nav className="h-16 flex items-center justify-between mx-8">
      {/* Start of the Product Logo */}

      <div className="">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/images/monk2.png"
            alt="me"
            width="65"
            height="40"
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* End of the Product Logo */}

      {/* Start of the Navigation Images */}

      <div className="flex flex-row items-center">
        <p className="mx-8">
          <span className="rounded-full h-5 w-5 border-red-600"></span>
          {user.length == 0 ? <h1>Anonymous</h1> : <h1>{user}</h1>}
        </p>
        <Image src="/images/cart2.svg" alt="me" width="65" height="40" />
        <Image src="/images/user-icon.svg" alt="me" width="65" height="40" />
      </div>

      {/* Start of the Navigation Images */}
    </nav>

    // Beginning of the Main NavBar
  );
};

export default nav;
