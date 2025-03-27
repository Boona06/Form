"use client";
import { useState, useEffect } from "react";
import z from "zod";

export default function Form({ next, page }) {
  const [form, setForm] = useState({
    Firstname: "",
    Lastname: "",
    Username: "",
  });

  const [touched, setTouched] = useState({
    Firstname: false,
    Lastname: false,
    Username: false,
  });

  const user = z.object({
    Firstname: z
      .string()
      .min(2, { message: "Та зөвхөн үсэг бичих хэрэгтэй" })
      .regex(/^[A-Za-zА-Яа-яӨ-өҮ-үЁ-ё\s]+$/, {
        message: "Зөвхөн үсэг бичих хэрэгтэй",
      }),
    Lastname: z
      .string()
      .min(2, { message: "Та өөрийн бүтэн нэрээ бичээрэй" })
      .regex(/^[A-Za-zА-Яа-яӨ-өҮ-үЁ-ё\s]+$/, {
        message: "Зөвхөн үсэг бичих хэрэгтэй",
      }),
    Username: z
      .string()
      .min(2, { message: "Хэрэглэх нэрээ оруулаарай" })
      .regex(/^[A-Za-zА-Яа-яӨ-өҮ-үЁ-ё\s]+$/, {
        message: "Зөвхөн үсэг бичих хэрэгтэй",
      }),
  });

  const [error, setError] = useState({});

  useEffect(() => {
    const validation = user.safeParse(form);
    if (!validation.success) {
      const resultError = validation.error.format();
      setError({
        Firstname: touched.Firstname
          ? resultError.Firstname?._errors?.[0]
          : undefined,
        Lastname: touched.Lastname
          ? resultError.Lastname?._errors?.[0]
          : undefined,
        Username: touched.Username
          ? resultError.Username?._errors?.[0]
          : undefined,
      });
    } else {
      setError({});
    }
  }, [form, touched]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDisabled = () => {
    return !!(error.Firstname || error.Lastname || error.Username);
  };
  useEffect(() => {
    localStorage.setItem("userForm", JSON.stringify(form));
  }, [form]);

  useEffect(() => {
    const savedForm = localStorage.getItem("userForm1");
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, [page]);

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div className="min-w-[26rem] w-[32rem] bg-white rounded-[8px] ml-auto mr-auto">
      <img src="Main.png" className="pt-6 pl-4 w-[60px] h-[66px] ml-6" />
      <h1 className="font-bold text-[2rem] pl-10">Join Us! 😎</h1>
      <p className="pl-10 text-[#8E8E8E]">
        Please provide all current information accurately.
      </p>
      <form>
        <p className="pl-10 pt-10 mt-2 font-bold">First name *</p>
        <input
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={form.Firstname}
          name="Firstname"
          placeholder="First name"
          className={`rounded-[8px] h-[3rem] w-[26rem] border-[1px] pl-4 ml-10 mt-2 ${
            error.Firstname ? "border-red-500" : ""
          }`}
        />
        {touched.Firstname && (
          <p className="text-[14px] text-red-600 ml-12">{error.Firstname}</p>
        )}

        <p className="pl-10 mt-2 font-bold">Last name *</p>
        <input
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={form.Lastname}
          name="Lastname"
          placeholder="Last name"
          className={`rounded-[8px] h-[3rem] w-[26rem] border-[1px] pl-4 ml-10 mt-2 ${
            error.Lastname ? "border-red-500" : ""
          }`}
        />
        {touched.Lastname && (
          <p className="text-[14px] text-red-600 ml-12">{error.Lastname}</p>
        )}

        <p className="pl-10 mt-2 font-bold">Username *</p>
        <input
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={form.Username}
          name="Username"
          placeholder="Username"
          className={`rounded-[8px] h-[3rem] w-[26rem] border-[1px] pl-4 ml-10 mt-2 ${
            error.Username ? "border-red-500" : ""
          }`}
        />
        {touched.Username && (
          <p className="text-[14px] text-red-600 ml-12">{error.Username}</p>
        )}
        <div className="pb-12">
          <button
            onClick={(e) => {
              e.preventDefault();
              setTouched({
                Firstname: true,
                Lastname: true,
                Username: true,
              });
              const validation = user.safeParse(form);
              if (validation.success) {
                next();
              }
            }}
            disabled={handleDisabled()}
            className={`w-[26rem] h-[3rem] rounded-[6px] mt-[4rem] ml-10 ${
              handleDisabled()
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-500 text-white"
            }`}
          >
            Continue 1/3
          </button>
        </div>
      </form>
    </div>
  );
}
