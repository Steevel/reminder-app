/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import CreateReminder from "../components/CreateReminder";
import ListAllReminders from "../components/ListAllReminders";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const HomePage = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [reminderList, setReminderList] = useState([]);

  // Get all reminders
  const getAllReminders = async () => {
    if (context.user !== null) {
      const { email } = context.user;

      const { data: allReminders } = await Axios.post("/reminders", {
        email,
      });
      setReminderList(allReminders);
    }
  };

  if (!context.user?.uid) {
    navigate("/");
  }

  useEffect(() => {
    if (context.user?.uid) {
      getAllReminders();
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col mx-5 max-h-screen">
      <CreateReminder getAllReminders={getAllReminders} />
      <h1 className="font-semibold text-xl my-4">All reminders</h1>
      <ListAllReminders
        reminderList={reminderList}
        getAllReminders={getAllReminders}
      />
    </div>
  );
};

export default HomePage;
