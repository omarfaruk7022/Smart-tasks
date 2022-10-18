import React from "react";
import swal from "sweetalert";

const EditTask = (task) => {
  const { addingTask, _id } = task.task;
  const handleEdit = (e) => {
    e.preventDefault();
    const editTask = e.target.task.value;
    const editedData = {
      addingTask: editTask,
    };
    fetch(` http://localhost:5000/addTask/${_id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        swal("Success", "Your task edited Successfully", "success");
      });
    e.target.reset();
  };
  return (
    <div>
      <div className="dropdown mt-5 ">
        <label tabIndex={0} className="hover:text-blue-500">
          {/* <span className="text-xl  hover:rounded-full ml-5">+</span>{" "}
          <span className="cursor-pointer  hover:text-blue-500">Edit</span> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-blue-400 cursor-pointer hover:scale-125 ease-out duration-200 transform hover:text-blue-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content dropdown-start menu p-2 shadow bg-base-100 rounded-box w-36"
        >
          <form onSubmit={handleEdit}>
            <div class="relative z-0 mb-6 w-full group flex">
              <input
                type="text"
                name="task"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500  peer"
                placeholder=" "
                required
                // defaultValue={addingTask}
              />

              <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Edit Task
              </label>
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-green-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </button>
            </div>
          </form>
        </ul>
      </div>
    </div>
  );
};

export default EditTask;
