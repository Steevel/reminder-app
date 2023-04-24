/* eslint-disable react/prop-types */
import ReminderCard from "./ReminderCard";

const ListAllReminders = ({ reminderList, getAllReminders }) => {
  return (
    <>
      <div className="gap-x-2 gap-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {reminderList.length ? (
          reminderList.map((item) => (
            <ReminderCard
              key={item._id}
              item={item}
              getAllReminders={getAllReminders}
            />
          ))
        ) : (
          <div className="w-screen">
            Add some reminders to display them here
          </div>
        )}
      </div>
    </>
  );
};

export default ListAllReminders;
