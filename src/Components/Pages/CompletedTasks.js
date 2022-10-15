import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import swal from "sweetalert";
import auth from "../../firebase.init";
import Loader from "../Shared/Loader";

const CompletedTasks = () => {
  const [user] = useAuthState(auth);
  const email = user?.email;
  const {
    data: completedTasks,
    isLoading,
    refetch,
  } = useQuery("completedTasks", () =>
    fetch(`https://smart-tasks-server.vercel.app/completedTask/${email}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
  );

  if (isLoading) {
    return <Loader />;
  }
  refetch();
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this  file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(`https://smart-tasks-server.vercel.app/completedTask/${id}`, {
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
  return (
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
  );
};

export default CompletedTasks;
