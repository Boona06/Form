"use client"
import Image from "next/image";
import Form from "./components/form";
import Page1 from "./components/page1";
import Page2 from "./components/page2";
import Submission from "./components/submission";
import { useState } from "react";

export default function Home() {
  const [page ,setPage]=useState(1)
  function nextPage(){
    setPage(page+1)
  }
  return (
   <div className="bg-[#f4f4f4] h-screen w-full flex justify-center items-center">
      {page === 1 && <Form next={nextPage} /> }
      {page === 2 && <Page1 next={nextPage}/>}
      {page === 3 && <Page2 next={nextPage}/>}
      {page === 4 && <Submission next={nextPage}/>}
   </div>
  );
}
