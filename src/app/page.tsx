"use client"

import Image from "next/image";
import { useState } from "react";


 const imagesData: ImageData[] = [
   {
     id: 1,
     imgUrl: "/images/image-1.webp",
   },
   {
     id: 2,
     imgUrl: "/images/image-2.webp",
   },
   {
     id: 3,
     imgUrl: "/images/image-3.webp",
   },
   {
     id: 4,
     imgUrl: "/images/image-4.webp",
   },
   {
     id: 5,
     imgUrl: "/images/image-5.webp",
   },
   {
     id: 6,
     imgUrl: "/images/image-6.webp",
   },
   {
     id: 7,
     imgUrl: "/images/image-7.webp",
   },
   {
     id: 8,
     imgUrl: "/images/image-8.webp",
   },
   {
     id: 9,
     imgUrl: "/images/image-9.webp",
   },
   {
     id: 10,
     imgUrl: "/images/image-10.jpeg",
   },
   {
     id: 11,
     imgUrl: "/images/image-11.jpeg",
   },
 ];
  

  interface ImageData {
    id: number;
    imgUrl: string;
  }
  
  



export default function Home() {
  const [active, setActive] = useState(11);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const mainImg = imagesData.filter((item) => item.id === active);
  const subImg = imagesData.filter((item) => item.id !== active);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    if (checked) {
      setSelectedItems((prev) => [...prev, name]);
    } else {
      setSelectedItems((prev) => prev.filter((item) => item !== name));
    }
  };

  return (
    <main className="container bg-white rounded-lg drop-shadow">
      {selectedItems.length > 0 ? (
        <header className="p-5 flex w-full h-[4rem] border-b justify-between items-center">
          <div className="flex items-center gap-5">
            <input type="checkbox" name="select" id="select" />
            <label
              htmlFor="select"
              className="flex items-center gap-2 font-bold">
              <span>{selectedItems.length}</span> Files Selected
            </label>
          </div>
          <button className="text-red-600 font-semibold">Delete files</button>
        </header>
      ) : (
        <header className="p-5 w-full h-[4rem] border-b font-bold">
          Gallery
        </header>
      )}
      <main className="w-full h-[80vh] p-5 grid grid-rows-3 grid-cols-5 gap-4">
        {mainImg.map((data) => (
          <div
            className="col-span-2 row-span-2 hover:brightness-50 transition group "
            key={data.imgUrl}>
            <label htmlFor={data.imgUrl}>
              <Image
                src={data.imgUrl}
                alt="img url"
                width={400}
                height={400}
                className="w-full h-full object-cover bg-white text-center rounded-lg drop-shadow"
                key={data.imgUrl}
              />
            </label>
            <input
              type="checkbox"
              name={data.imgUrl}
              id={data.imgUrl}
              className="hidden group-hover:block absolute z-10 top-5 left-5"
              onChange={handleCheckboxChange}
            />
            {selectedItems.includes(data.imgUrl) && (
              <p className="text-green-500">Selected</p>
            )}
          </div>
        ))}

        {subImg.map((data) => (
          <div
            key={data.imgUrl}
            className={`${
              selectedItems.includes(data.imgUrl)
                ? "brightness-50"
                : "hover:brightness-75"
            } bg-white p-4 text-center rounded-lg drop-shadow transition group`}>
            <label htmlFor={data.imgUrl}>
              <Image
                src={data.imgUrl}
                alt="img url"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </label>

            <input
              type="checkbox"
              name={data.imgUrl}
              id={data.imgUrl}
              className={`${
                selectedItems.includes(data.imgUrl)
                  ? "block"
                  : "hidden group-hover:block "
              } absolute z-10 top-5 left-5`}
              onChange={handleCheckboxChange}
            />
            {/* {selectedItems.includes(data.imgUrl) && (
              <p className="text-green-500">Selected</p>
            )} */}
          </div>
        ))}

        <div className="capitalize bg-gray-100 rounded-lg flex items-center justify-center border-dashed border cursor-pointer">
          add images
        </div>
      </main>
    </main>
  );
}
