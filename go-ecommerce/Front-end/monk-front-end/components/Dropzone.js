import React, { useState } from "react";
import { Controller } from "react-hook-form";
// import "../styles/Home.module.css";
import Image from "next/image";

import Dropzone from "react-dropzone";

export default function FileInput   ({ control, name }) {
  const [fileNames, setFileNames] = useState([]);
  const handleDrop = (acceptedFiles) => {
    setFileNames(acceptedFiles.map((file) => file.name));
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({onChange,value, onBlur }) => (
        <div>
          <Dropzone onChange={onChange} >
            {({ getRootProps, getInputProps }) => (
              <div
                {...getRootProps({ className: "dropzone" })}
                className="flex flex-row items-center justify-center space-x-4 rounded-md border-dashed border-gray-500 border-2 p-2"
              >
                <input {...getInputProps()} />
                <span>
                  <Image src="/images/drop.svg" height={15} width={15} />
                </span>
                <p className="text-center">Drag'n'drop An Image, Only Three</p>
              </div>
            )}
          </Dropzone>
          <div>
            <ul>
              {fileNames.map((f, index) => (
                <li key={index} className="text-xs">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    />
  );
}
{
  /* <Controller 
control = {control}
name = {name}
defaultValue = {[]}
render = {({onBlur, onChange, value})=> (
  <>
    <Dropzone onDrop = {onChange}>
      {({getRootProps, getInputProps}) => (
          <div
          {...getRootProps({ className: "dropzone" })}
          className="flex flex-row items-center justify-center space-x-4 rounded-md border-dashed border-gray-500 border-2 p-2"
        >
          <input {...getInputProps()} />
          <span>
            <Image src="/images/drop.svg" height={15} width={15} />
          </span>
          <p className="text-center">Drag'n'drop An Image, Only Three</p>
        </div>
      )}
    </Dropzone>
    </> */
}
