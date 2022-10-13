import React from "react";
import { Link } from "react-router-dom";
// import { signOut } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";
// import auth from "../../firebase.init";

const Navbar = () => {
//   const [user] = useAuthState(auth);
//   const handleSignOut = () => {
//     signOut(auth);
//   };
  return (
    <div>
      <div className="navbar bg-base-100  flex justify-between">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabindex="0" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 "
            >
              <>
                <li>
                  <Link
                    to="/"
                    class="block h-12 leading-[3rem] border-b-4 border-transparent hover:text-primary hover:border-current text-[12px] "
                  >
                    Home
                  </Link>
                </li>
                

                
                {/* <li>
                  {user ? (
                    <button onClick={handleSignOut} className="btn btn-ghost">
                      Logout
                    </button>
                  ) : (
                    <Link className="block h-12 leading-[3rem] text-[13px] border-b-4 border-transparent hover:text-primary hover:border-current " to="/login">Login</Link>
                  )}
                </li> */}
              </>
            </ul>
          </div>
         
        </div>
        <div className="navbar-center hidden lg:flex  ">
          <ul className="menu menu-horizontal p-0 px-16 lg:space-x-4">
          
            <>
              <Link
                to="/"
                class="font-bold block h-12 leading-[3rem] border-b-4 border-transparent hover:text-primary  ease-in-out duration-200 hover:border-current text-[14px] "
              >
                Home
              </Link>

          
              

              
              {/* {user ? (
                <button
                  onClick={handleSignOut}
                  className="block h-12 leading-[3rem] border-b-4 border-transparent hover:text-primary hover:border-current text-[13px] "
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">
                  <button className="block h-12 leading-[3rem] text-[13px] border-b-4 border-transparent hover:text-primary hover:border-current ">
                    Login/Register
                  </button>
                </Link>
              )} */}
             
            </>
           
          </ul>
        </div>
      </div>
    </div>
   
  );
};

export default Navbar;