"use client";
import { useState, useEffect } from "react";
import { z } from "zod";

export default function Page1({ back, next }) {
  const [form, setForm] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("userForm");
      return saved ? JSON.parse(saved) : {
        email: "",
        number: "",
        password: "",
        confirmpassword: ""
      };
    }
    return {
      email: "",
      number: "",
      password: "",
      confirmpassword: ""
    };
  });

  const [touched, setTouched] = useState({
    email: false,
    number: false,
    password: false,
    confirmpassword: false
  });

  const user = z.object({
    email: z.string().email({ message: "Та зөвхөн мэйл хаяг бичих хэрэгтэй" }),
    number: z.coerce.number().max(8 , { message: "Та зөвхөн дугаараа оруулана уу!" }),
    password: z.string()
    // confirmpassword validation болон баталгаажуулалт ч нэмэх боломжтой
  });

  const [error, setError] = useState({});
console.log(form)
  useEffect(() => {
    const validation = user.safeParse(form);
    if (!validation.success) {
      const resultError = validation.error.format();
      setError({
        // Таны эхний код дээр Firstname, Lastname гэх мэт ашигласан байгаа байсан,
        // одоо бол form-ын түлхүүрүүд: email, number, password
        email: touched.email ? resultError.email?._errors?.[0] : undefined,
        number: touched.number ? resultError.number?._errors?.[0] : undefined,
        password: touched.password ? resultError.password?._errors?.[0] : undefined,
        // confirmpassword-ийн validation-г хэрэв нэмсэн бол түүнийг ч энд авч болно.
      });
    } else {
      setError({});
    }
  }, [form, touched]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev ,[name] : name === "number" ? (value ? parseInt(value, 10) : "") : value }));
  };

  // Form дахь утгууд өөрчлөгдөх үед localStorage-д хадгалж байх effect
  useEffect(() => {
    console.log("Setting localStorage:", form);
    localStorage.setItem("userForm1", JSON.stringify(form));
  }, [form]);

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleDisabled = () => {
    return !!(error.email || error.number || error.password);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({
      email: true,
      number: true,
      password: true,
      confirmpassword: true
    });
    const validation = user.safeParse(form);
    if (validation.success) {
      next();
    }
  };

  return (
    <div className="w-[32rem]  bg-white rounded-[8px] ml-auto mr-auto">
      <img src="Main.png" className="pt-6 pl-4 w-[60px] h-[66px] ml-6" />
      <h1 className="font-bold text-[2rem] pl-10">Join Us! 😎</h1>
      <p className="pl-10 text-[#8E8E8E]">
        Please provide all current information accurately.
      </p>
      <form onSubmit={onSubmit}>
        <p className="pl-10 pt-10 mt-2 font-bold">Email *</p>
        <input 
          name="email"
          defaultValue={form.email}
          onBlur={onBlur}
          onChange={onChange}
          type="email" 
          placeholder="Email"
          className={`rounded-[8px] h-[3rem] w-[26rem] border-[1px] border-[#cbd5e1] pl-4 ml-10 mt-2
            ${error.email ? "border-red-500" : ""}`}
        />
        {touched.email && error.email && <p className="pl-10 mt-2 font-bold text-red-600">{error.email}</p>}
        
        <p className="pl-10 mt-2 font-bold">Phone number *</p>
        <input
          name="number"
          onBlur={onBlur}
          onChange={onChange}
          type="" 
          placeholder="Phone number" 
          className={`rounded-[8px] h-[3rem] w-[26rem] border-[1px] border-[#cbd5e1] pl-4 ml-10 mt-2
            ${error.number ? "border-red-500" : ""}`}
        />
        {touched.number && error.number && <p className="pl-10 mt-2 font-bold text-red-600">{error.number}</p>}
        
        <p className="pl-10 mt-2 font-bold">Password *</p>
        <input
          name="password"
          onBlur={onBlur}
          onChange={onChange}
          type="password"
          placeholder="Password"
          className={`rounded-[8px] h-[3rem] w-[26rem] border-[1px] border-[#cbd5e1] pl-4 ml-10 mt-2
            ${error.password ? "border-red-500" : ""}`}
        />
        {touched.password && error.password && <p className="pl-10 mt-2 font-bold text-red-600">{error.password}</p>}
        
        <p className="pl-10 mt-2 font-bold">Confirm password *</p>
        <input
          name="confirmpassword"
          onBlur={onBlur}
          onChange={onChange}
          type="password"
          placeholder="Confirm password"
          className="rounded-[8px] h-[3rem] w-[26rem] border-[1px] border-[#cbd5e1] pl-4 ml-10 mt-2"
        />
        {/* Confirmpassword-ийн validation харуулах хэсгийг нэмэх бол энд нэмээрэй */}

        <div className="flex pb-12 ">
          <button onClick={back} className="w-[8rem] h-[3rem] border-2 border-solid rounded-[6px] font-bold text-[1rem] mt-[4rem] ml-10">
            Back
          </button>
          <button
            type="submit"
            disabled={handleDisabled()}
            className={`w-[15rem] h-[3rem] rounded-[6px] mt-[4rem] ml-10 ${
              handleDisabled() ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"
            }`}
          >
            Continue 2/3
          </button>
        </div>
      </form>
    </div>
  );
}
