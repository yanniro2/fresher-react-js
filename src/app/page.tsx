"use client"

import Image from "next/image";
import { useState, useRef } from "react";
import { BsImageFill } from "react-icons/bs";

interface ImageData {
  id: number;
  imgUrl: string;
}

export default function Home() {
  const [imagesData, setImagesData] = useState<ImageData[]>([
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
  ]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const dragPerson = useRef<number>(0);
  const dragOverPerson = useRef<number>(0);

  const handleSort = () => {
    const imagesDataClone = [...imagesData];
    const temp = imagesDataClone[dragPerson.current];
    imagesDataClone[dragPerson.current] =
      imagesDataClone[dragOverPerson.current];
    imagesDataClone[dragOverPerson.current] = temp;
    setImagesData(imagesDataClone);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    if (name === "select") {
      setSelectAll(checked);
      if (checked) {
        const allUrls = imagesData.map((item) => item.imgUrl);
        setSelectedItems(allUrls);
      } else {
        setSelectedItems([]);
      }
    } else {
      let updatedSelectedItems = [];
      if (checked) {
        updatedSelectedItems = [...selectedItems, name];
      } else {
        updatedSelectedItems = selectedItems.filter((item) => item !== name);
      }
      setSelectedItems(updatedSelectedItems);
      setSelectAll(updatedSelectedItems.length === imagesData.length);
    }
  };

  const handleDelete = () => {
    const remainingImages = imagesData.filter(
      (item) => !selectedItems.includes(item.imgUrl)
    );
    setImagesData(remainingImages);
    setSelectedItems([]);
    setSelectAll(false);
  };
  return (
    <main className="container bg-white rounded-lg drop-shadow p-4 sm:p-6">
      {selectedItems.length > 0 ? (
        <header className="p-4 sm:p-5 flex w-full border-b justify-between items-center">
          <div className="flex items-center gap-5">
            <input
              type="checkbox"
              name="select"
              id="select"
              checked={selectAll}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="select"
              className="flex items-center gap-2 font-bold">
              <span>
                {selectedItems.length === 1 ? (
                  <span>A</span>
                ) : (
                  selectedItems.length
                )}
              </span>{" "}
              File
              {selectedItems.length > 1 ? "s" : ""} Selected
            </label>
          </div>
          <button
            className="text-red-600 font-semibold hover:underline transition"
            onClick={handleDelete}>
            Delete file{selectedItems.length > 1 ? "s" : ""}
          </button>
        </header>
      ) : (
        <header className="p-5 w-full h-[4rem] border-b font-bold">
          Gallery
        </header>
      )}
      <main className="w-full h-[80vh] p-5 grid grid-rows-3 grid-cols-5 gap-4">
        {imagesData.map((data, index) => {
          const isFirstIndex = index === 0;
          const isSelected = selectedItems.includes(data.imgUrl);
          const brightnessClass = isFirstIndex
            ? isSelected
              ? "brightness-50 group col-span-2 row-span-2 cursor-pointer"
              : "hover:brightness-75 hover:brightness-50 transition group col-span-2 row-span-2 cursor-pointer"
            : isSelected
            ? "brightness-50 cursor-pointer"
            : "hover:brightness-75 bg-white p-4 text-center rounded-lg drop-shadow transition group cursor-pointer";

          return (
            <div
              key={data.imgUrl}
              className={`${brightnessClass} cursor-pointer`}
              draggable
              onDragStart={() => (dragPerson.current = index)}
              onDragEnter={() => (dragOverPerson.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}>
              <label htmlFor={data.imgUrl}>
                <Image
                  src={data.imgUrl}
                  alt="img url"
                  width={isFirstIndex ? 400 : 100}
                  height={isFirstIndex ? 400 : 100}
                  className={
                    isFirstIndex
                      ? "w-full h-full object-cover bg-white text-center rounded-lg drop-shadow"
                      : "w-full h-full object-cover"
                  }
                  key={data.imgUrl}
                />
              </label>
              <input
                type="checkbox"
                name={data.imgUrl}
                id={data.imgUrl}
                className={`${
                  isSelected ? "block" : "hidden group-hover:block"
                } absolute z-10 top-5 left-5`}
                onChange={handleCheckboxChange}
                checked={selectAll || isSelected}
              />
            </div>
          );
        })}

        <div className="capitalize bg-gray-100 rounded-lg flex items-center justify-center outline-dashed outline-2 outline-offset-2 cursor-pointer outline-gray-200 font-semibold flex-col gap-[1rem]">
          <BsImageFill />
          add images
        </div>
      </main>
    </main>
  );
}
