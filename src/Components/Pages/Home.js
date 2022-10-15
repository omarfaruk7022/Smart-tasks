import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import auth from "../../firebase.init";

const Home = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const [reload, setReload] = useState(false);
  const [tasks, setTasks] = useState();
  const [completedTasks, setCompletedTasks] = useState();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleCorrect = (e) => {
    e.preventDefault();
    const addingTask = e.target.task.value;

    const inputData = {
      addingTask,
      email,
    };
    console.log(inputData);
    if (addingTask) {
      fetch("http://localhost:5000/addTask", {
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
    fetch(`http://localhost:5000/completedTask/${id}`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        swal("Yayy", "Your task completed Successfully", "success");
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/addTask/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
      setReload(true);
      
  });

  useEffect(() => {
    fetch(`http://localhost:5000/completedTask/${email}`)
      .then((res) => res.json())
      .then((data) => {
        setCompletedTasks(data);
      });
      setReload(true);
      
  });
  // const {
  //   data: tasks,
  //   isLoading,
  //   refetch,
  // } = useQuery("tasks", () =>
  //   fetch(`http://localhost:5000/addTask/${email}`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       refetch();
  //       return data;
  //     })
  // );

  // const { data: completedTasks } = useQuery("completedTasks", () =>
  //   fetch(`http://localhost:5000/completedTask/${email}`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       refetch();
  //       return data;
  //     })
  // );

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this  file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`http://localhost:5000/completedTask/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            swal("Yayy", "Company Deleted Successfully", "success");
          });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  // const handleDelete = (id) => {
  //   fetch(`http://localhost:5000/completedTask/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       swal("Yayy", "Your task deleted Successfully", "success");
  //     });
  // };

  return (
    <div>
      <div className="dropdown flex">
        <label tabIndex={0} className="btn btn-outline m-1">
          + Add a task
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <form onSubmit={handleCorrect}>
            <div class="relative z-0 mb-6 w-full group flex">
              <input
                type="text"
                name="task"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-green-400  peer"
                placeholder=" "
                required
              />

              <label class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-400 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
      <div className="mt-16">
        {tasks?.map((task) => (
          <h1 className="flex">
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
            {task?.addingTask}
          </h1>
        ))}
      </div>
      <div>
        <div className="card w-96 bg-base-100 drop-shadow-2xl ">
          <div className="card-body">
            {completedTasks?.map((completedTask) => (
              <h1 className="flex ">
                <span className="text-green-400">
                  {completedTask?.addingTask}
                </span>

                <button
                  onClick={() => handleDelete(completedTask?._id)}
                  className="ml-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 text-red-400 mx-2 hover:scale-125 ease-out duration-200 ml-auto"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
