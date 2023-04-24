/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import Axios from "axios";
import { UserContext } from "../context/UserContext";
import { errorMessage, successMessage } from "../utils/toastOptions";

const CreateReminder = ({ getAllReminders }) => {
  const context = useContext(UserContext);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = context.user?.email;

    if (!name && !date && !time) {
      alert("Please fill all the required fields");
    } else {
      try {
        const { data } = await Axios.post(`/reminder/add`, {
          name,
          date,
          time,
          email,
        });
        successMessage(data.message);
        getAllReminders();
      } catch (error) {
        errorMessage("Unable to create reminder. Please try again");
      }
    }
  };

  return (
    <div className="flex flex-col border-black border-1 lg:items-center p-2">
      <h1 className="font-semibold my-4 text-xl">Create Reminder</h1>
      <form
        className="flex flex-col gap-y-4  lg:w-6/12 mb-4"
        onSubmit={handleSubmit}
      >
        <input
          className="border bottom-2"
          type="text"
          name="name"
          id="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border"
          type="date"
          name="date"
          id="date"
          onChange={(e) => setDate(e.target.value)}
        ></input>
        <input
          className="border"
          type="time"
          name="time"
          id="time"
          onChange={(e) => setTime(e.target.value)}
        ></input>
        <button
          className="rounded-md bg-indigo-600 px-3.5 pt-1 pb-1.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500 "
          onClick={() => {}}
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateReminder;
