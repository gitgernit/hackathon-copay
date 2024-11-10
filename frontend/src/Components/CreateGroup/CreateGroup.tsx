import React, { useState } from "react";
import "./CreateGroup.css";
import { defaultReq, eventsApi } from "../../shared/api";
import { ChevronLeft, LucideArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "pending" | "success" | "error">(
    "idle"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setState("pending");
      await eventsApi.createEventApiEventsPost(
        { baseEvent: { name } },
        defaultReq
      );
      setState("idle");
      navigate("/");
    } catch (error) {
      localStorage.removeItem("token");
      setState("idle");
    }
  };
  return (
    <form className="create-group-form w-full" onSubmit={handleSubmit}>
      <input
        required
        className="w-full"
        type="text"
        placeholder="Название"
        value={name}
        onChange={handleChange}
      />
      <div className="flex gap-2 items-center">
        <div className="absolute left-0 right-0 bottom-[40px] mx-auto">
          <div className="flex items-center gap-2 mx-auto justify-center">
            <button className='shadow-[1px_3px_7px_1px_rgba(34,_60,_80,_0.2)] bg-[#ece6f0] active:bg-pink-200 p-4 rounded-2xl' onClick={() => navigate('/')}>
              <LucideArrowLeft />
            </button>
            <button type="submit" className="shadow-[1px_3px_7px_1px_rgba(34,_60,_80,_0.2)] bg-[#ece6f0] active:bg-pink-200 p-4 rounded-2xl" disabled={!name}>
              <span>{state === "idle" ? "Создать" : "..."}</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateGroup;
