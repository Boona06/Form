"use client";
import { useEffect, useState, useCallback } from "react";
import { FaRegImage } from "react-icons/fa6";
import { z } from "zod";

export default function Page2({ back, next }) {
  const userSchema = z.object({
    date: z.string().min(1, "Огноо заавал оруулах шаардлагатай!"),
    photo: z.string().min(1, "Та зураг оруулах шаардлагатай!"),
  });

  const [error, setError] = useState({});
  const [form, setForm] = useState({
    date: "",
    photo: "",
  });

  const validateForm = useCallback(() => {
    const validation = userSchema.safeParse(form);
    if (!validation.success) {
      const resultError = validation.error.format();
      setError({
        date: resultError?.date?._errors?.[0],
        photo: resultError?.photo?._errors?.[0],
      });
    } else {
      setError({});
    }
  }, [form]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "food-delivery");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/do0qq0f0b/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const dataJson = await response.json();
      setForm((prev) => ({
        ...prev,
        photo: dataJson.secure_url, 
      }));
    }
  };

  const removeImage = () => {
    setForm((prev) => ({
      ...prev,
      photo: "",
    }));
  };

  const isDisabled = () => {
    return !form.date || !form.photo || Object.keys(error).length > 0;
  };

  return (
    <div className="w-[32rem] h-auto bg-white rounded-[8px] ml-auto mr-auto p-6">
      <img src="Main.png" className="pt-2 w-[60px] h-[66px]" />
      <h1 className="font-bold text-[2rem]">Join Us! 😎</h1>
      <form>
        <p className="text-[#8E8E8E]">
          Please provide all current information accurately.
        </p>

        <p className="pt-6 font-bold">Date *</p>
        <input
          name="date"
          type="date"
          onChange={onChange}
          className={`rounded-[8px] h-[3rem] w-full border-[1px] border-[#cbd5e1] pl-4 ${
            error.date ? "border-red-500" : ""
          }`}
        />
        {error.date && <p className="text-red-500">{error.date}</p>}

        <p className="pt-6 font-bold">Profile Image *</p>

        {form.photo ? (
          <div className="flex justify-center gap-8">
            <img
              src={form.photo}
              alt="Uploaded"
              className="w-40 h-40 object-cover rounded-md mb-4"
            />
            <button
              type="button"
              onClick={removeImage}
              className="bg-red-400 text-white  h-5 w-5  rounded-md"
            >
             X
            </button>
          </div>
        ) : (
          <label className="cursor-pointer">
            <div className="w-full h-40 bg-slate-100 flex flex-col items-center justify-center">
              <div className="bg-white rounded-full w-10 h-10 flex justify-center items-center">
                <FaRegImage />
              </div>
              <h2 className="text-center">Add image</h2>
            </div>
            <input type="file" name="photo" hidden onChange={onFileChange} />
          </label>
        )}

        {error.photo && <p className="text-red-500">{error.photo}</p>}

        <div className="flex mt-6">
          <button
            type="button"
            onClick={back}
            className="w-[8rem] h-[3rem] border-2 border-solid rounded-[6px] font-bold text-[1rem]"
          >
            Back
          </button>
          <button
            type="button"
            onClick={next}
            disabled={isDisabled()}
            className={`w-[24rem] h-[3rem] rounded-[6px] text-[1rem] ml-2 ${
              isDisabled() ? "bg-[#d6d8db] text-[#A9ACAF]" : "bg-blue-500 text-white"
            }`}
          >
            Continue 3/3
          </button>
        </div>
      </form>
    </div>
  );
}
