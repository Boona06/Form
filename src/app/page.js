"use client"
import { useState } from "react";
import Form from "./components/form";
import Page1 from "./components/page1";
import Page2 from "./components/page2";
import Submission from "./components/submission";
export default function Home() {
  const [page, setPage] = useState(1);

  return (
   <div className="bg-[#f4f4f4] h-screen w-full flex justify-center items-center">
      {page === 1 && <Form page={page}  next={()=>{setPage(2)}} /> }
      {page === 2 && <Page1 back={()=>{setPage(1)}} next={()=>{setPage(3)}}  />}
      {page === 3 && <Page2 back={()=>{setPage(2)}}  next={()=>{setPage(4)}} />}
      {page === 4 && <Submission />}
   </div>
  );
}
