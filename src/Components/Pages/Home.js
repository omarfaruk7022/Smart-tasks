import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { format } from "date-fns";
import swal from "sweetalert";
import auth from "../../firebase.init";
import Loader from "../Shared/Loader";
import CompletedTasks from "./CompletedTasks";
import EditTask from "./EditTask";

const Home = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [reload, setReload] = useState(true);
  // const [tasks, setTasks] = useState();
  // const [completedTasks, setCompletedTasks] = useState();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const date = new Date();
  const formattedDate = format(date, "PP");
  const formattedDate2 = format(date, "p");

  const handleCorrect = (e) => {
    e.preventDefault();
    const addingTask = e.target.task.value;
    const taskDate = formattedDate;
    const taskTime = formattedDate2;

    const inputData = {
      addingTask,
      email,
      taskDate,
      taskTime,
    };
    if (addingTask) {
      fetch(" https://smart-tasks-server-production.up.railway.app/addTask", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(inputData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          swal("Yayy", "Company Added Successfully", "success");
        });
    }
    e.target.reset();
  };
  const handleComplete = (id, task) => {
    fetch(
      ` https://smart-tasks-server-production.up.railway.app/completedTask/${id}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(task),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        swal("Success", "Your task completed Successfully", "success");
      });
  };

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery("tasks", () =>
    fetch(
      ` https://smart-tasks-server-production.up.railway.app/addTask/${email}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
  );

  if (isLoading) {
    return <Loader />;
  }
  refetch();

  // const handleEdit = (e) => {
  //   if (e.target.task.value) {
  //     fetch(" https://smart-tasks-server-production.up.railway.app/addTask", {
  //       method: "PATCH",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         swal("Yayy", "Company Added Successfully", "success");
  //       });
  //   }
  //   e.target.reset();
  // };
  const total = tasks?.length;
  return (
    <div>
      <div className="grid lg:grid-cols-4 grid-cols-1 lg:px-12 lg:gap-5">
        <div className=" sm:px-0">
          <div className="dropdown flex">
            <label tabIndex={0} className="hover:text-blue-500">
              <span className="text-xl  hover:rounded-full ml-5">+</span>{" "}
              <span className="cursor-pointer  hover:text-blue-500">
                Add a task
              </span>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content shadow bg-base-100 rounded-box"
            >
              <form onSubmit={handleCorrect}>
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
          <div>
            <h1 className="text-blue-700 text-center text-xl my-2">
              Incomplete ({total})
            </h1>

            <div className="bg-base-200 drop-shadow-2xl ">
              {tasks?.map((task) => (
                <>
                  <div className="flex ">
                    <button onClick={() => handleComplete(task?._id, task)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-6 h-6 hover:text-green-500 cursor-pointer mx-2 hover:scale-125 ease-out duration-200"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                    <span className="text-gray-500 mt-3 ">
                      <td className=" py-2 whitespace-nowrap ">
                        <div className="group ">
                          <p>
                            {task?.addingTask.slice(0, 15)}
                            {task?.addingTask.length > 20 && (
                              <>
                                <span>......</span>
                              </>
                            )}
                          </p>
                          <span className="absolute z-50 hidden  px-1 -mt-16 text-center text-black  bg-base-100 border  rounded tooltip-text group-hover:block">
                            {task?.addingTask.slice()}
                          </span>
                        </div>
                      </td>
                    </span>
                    <p className="text-[12px] lg:mt-1.5  lg:mr-2 p-5">
                      {task?.taskTime}, {task?.taskDate}
                    </p>
                    <EditTask task={task} />
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        <CompletedTasks />
      </div>
    </div>
  );
};

export default Home;
