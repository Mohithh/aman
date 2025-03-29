"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function LoginPage() {
  const navHandler = useRouter();
  const [usrIdentifier, setUsrIdentifier] = useState("");
  const [usrSecret, setUsrSecret] = useState("");

  const loginProcessor = async (evt) => {
    evt.preventDefault();

    const credentials = { email: usrIdentifier, password: usrSecret };

    try {
      const srvResponse = await fetch(atob("aHR0cDovL2xvY2FsaG9zdDozMDAwL2FwaS9sb2dpbg=="), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const jsonResponse = await srvResponse.json();

      if (jsonResponse.success) {
        localStorage.setItem("email", usrIdentifier);
        localStorage.setItem("token", jsonResponse.token);

        toast.success("Successfully logged in!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setTimeout(() => {
          navHandler.push("/");
        }, 1000);
      } else {
        toast.error(jsonResponse.error, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (err) {
      toast.error("Something went wrong!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={loginProcessor}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={usrIdentifier}
              onChange={(e) => setUsrIdentifier(e.target.value)}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={usrSecret}
              onChange={(e) => setUsrSecret(e.target.value)}
              className="w-full p-2 border rounded-lg mt-1"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="text-center">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
          <br />
          <Link href="/signup">
            <p className='mx-10 mt-5 text-blue-500 hover:underline'>Create new Account</p>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
