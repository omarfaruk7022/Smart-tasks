import React from "react";

const EditTask = (task ) => {
  const handleEdit = () => {
    console.log(task);
  };
  return (
    <div>
      <div className="dropdown flex">
        <label tabIndex={0} className="hover:text-blue-500">
          <span className="text-xl  hover:rounded-full ml-5">+</span>{" "}
          <span className="cursor-pointer  hover:text-blue-500">
            Add a task
          </span>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <form onSubmit={handleEdit}>
            <div class="relative z-0 mb-6 w-full group flex">
              <input
                type="text"
                name="task"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-500  peer"
                placeholder=" "
                required
              />

              <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-500 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Add task
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
