/* eslint-disable react/prop-types */
import Axios from "axios";
import { useState } from "react";
import { errorMessage, successMessage } from "../utils/toastOptions";

const ReminderCard = ({ item, getAllReminders }) => {
  const [isChecked, setIsChecked] = useState(item.isCompleted);

  // Delete a reminder
  const deleteReminder = async (id) => {
    try {
      const { data } = await Axios.delete(`/reminder/delete/${id}`);
      successMessage(data.message);
      getAllReminders();
    } catch (error) {
      errorMessage("Unable to delete reminder. Please try again");
    }
  };

  // Mark as completed
  const handleChecked = async (id) => {
    const checked = !isChecked;
    setIsChecked(checked);

    try {
      const { data } = await Axios.put(`/reminder/completed/${id}`, {
        checked,
      });
      successMessage(data.message);
      getAllReminders();
    } catch (error) {
      errorMessage("Unable to delete reminder. Please try again");
    }
  };

  return (
    <div className="border relative p-3 shadow-lg rounded-lg">
      <div
        className="absolute top-2 right-2 cursor-pointer rounded-full p-1 hover:bg-red-500 hover:text-white"
        onClick={() => deleteReminder(item._id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 md:w-6 md:h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </div>
      <h3 className={isChecked ? "line-through font-semibold" : "font-bold"}>
        {item.name}
      </h3>
      <p className={isChecked ? "line-through" : ""}>
        Date:&nbsp;{item.date.split("-").reverse().join("-")}
      </p>
      <p className={isChecked ? "line-through" : ""}>
        Time:&nbsp;{item.time}&nbsp;
        {Number(item.time.split(":")[0]) >= 12 ? "PM" : "AM"}
      </p>
      <div className="flex items-center">
        <input
          className="mt-1"
          type="checkbox"
          name="iscompleted"
          id="iscompleted"
          checked={isChecked}
          onChange={() => handleChecked(item._id)}
        />
        <label htmlFor="iscompleted">&nbsp;Mark as completed</label>
      </div>
    </div>
  );
};

export default ReminderCard;
