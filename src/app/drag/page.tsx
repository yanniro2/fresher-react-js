"use client";
import React, { useRef, useState } from "react";

const Page = () => {
  const [people, setPeople] = useState([
    { id: 1, name: "John Doe", content: "Lorem 1" },
    { id: 2, name: "Jane Doe", content: "Lorem 2" },
    { id: 3, name: "James Doe", content: "Lorem 3" },
    { id: 4, name: "Jade Doe", content: "Lorem 4" },
    { id: 5, name: "Jake Doe", content: "Lorem 5" },
  ]);

  const dragPerson = useRef<number>(0);
  const dragOverPerson = useRef<number>(0);

  const handleSort = () => {
    const peopleClone = [...people];
    const temp = peopleClone[dragPerson.current];
    peopleClone[dragPerson.current] = peopleClone[dragOverPerson.current];
    peopleClone[dragOverPerson.current] = temp;
    setPeople(peopleClone);
  };
  return (
    <div className="flex flex-col gap-[1rem]">
      {people.map((data, index) => (
        <div
          key={index}
          className=" flex item-center justify-center rounded drop-shadow bg-white p-5 text-center"
          draggable
          onDragStart={() => (dragPerson.current = index)}
          onDragEnter={() => (dragOverPerson.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}>
          <p>{data.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Page;
