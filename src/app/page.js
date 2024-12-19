"use client"
import Form from "./components/form";
import Page1 from "./components/page1";
import Page2 from "./components/page2";
import Submission from "./components/submission";
import { useState } from "react";

export default function Home() {
  const [page ,setPage]=useState(1)
  const [error ,setError]=useState(""
    // firstname= "" ,
    // lastname= "" ,
    // username="" ,
    // email="" ,
    // phonenumber= "" ,
    // password="",
    // confirmpassword="",
    // date= ""
  )
  function nextPage(){
    setPage(page+1)
  }
  function backPage(){
    setPage(page-1)
  }
  const onChange=(events)=>{
   const value=events.target.value
   if(value=== ""  ){
    setError("Can not be empty")
   }else if (!(value[0] >= "A" && value[0] <= "Z")){
     setError("Tom useg baih ystoi")
   }else if (checkNumber(value)) {
    setError("Too baih ysgue ")
   }else if(checkCharater(value)){
    setError("Temdeg bh ysgue")
   }
    else{setError("")}
  }
  const checkNumber = (string)=> {
   for(let i=0 ; i<string.length ; i++){
    if(string[i] >= 0 && string[i] <= 9 ){
      return true
    }
   }
   return false;
  }
  const checkCharater = (value) => {
    let chartr = "~!@#$%^&*()_+?.,></;|`-={}:'[]\'"
    for(let i=0 ; i<chartr.length ; i++){
      if(chartr.includes(value[i]) ){
        return true
      }
    }
    return false
  }
  

  return (
   <div className="bg-[#f4f4f4] h-screen w-full flex justify-center items-center">
      {page === 1 && <Form  next={nextPage} onChange={onChange} error={error} border={setError} /> }
      {page === 2 && <Page1 next={nextPage} back={backPage} />}
      {page === 3 && <Page2 next={nextPage} back={backPage} />}
      {page === 4 && <Submission next={nextPage}/>}
   </div>
  );
}
