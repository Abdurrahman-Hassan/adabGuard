import type { MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export const meta: MetaFunction = () => {
  return [
    { title: "AdabGuard" },
    {
      name: "description",
      content: "Welcome to AdabGuard!, A Roman Urdu Toxic Detector"
    },
  ];
};

interface AdabGuard {
  prediction?: string;
}

export default function Index() {

  const [adabGuard, setAdabGuard] = useState<AdabGuard>({})
  const [text, settext] = useState("");

  async function gettext(e: any) {
    e.preventDefault();
    if (text == '' || text == null) {
      toast.warn("Please input some text!")
      return
    }


    const id = toast.loading("Please wait...")
    await axios.post('https://111abdurrehman222-adabguard.hf.space/predict', {
      comment: text
    })
      .then((e) => {
        console.log(e)
        setAdabGuard(e.data)
        toast.update(id, { render: "Answered", type: 'success', isLoading: false, autoClose: 1000 });
      })
      .catch((e) => {
        console.log(e);
        toast.update(id, { render: "Error", type: 'error', isLoading: false, autoClose: 1000 });
      })
  }

  return (
    <div className="bg-gradient-to-r from-teal-50 via-teal-100 to-teal-200 min-h-screen flex flex-col justify-center items-center p-6">
      <div className="text-center mb-12 animate__animated animate__fadeIn animate__delay-1s">
        <h1 className="text-5xl font-extrabold text-teal-800 mb-4 tracking-wide">AdabGuard</h1>
        <p className="text-xl text-teal-600">A Roman Urdu Toxicity Detector</p>
      </div>

      <ToastContainer />

      <div className="flex flex-col gap-8 w-full max-w-2xl bg-white p-10 rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105 animate__animated animate__fadeInUp animate__delay-2s">
        <form
          onSubmit={gettext}
          className="flex flex-col gap-6"
        >
          <div className="relative">
            <textarea
              className="w-full h-40 p-5 border-2 border-gray-300 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-teal-400 transition-all duration-300 resize-none shadow-lg hover:shadow-xl"
              placeholder="Enter your Comment here"
              value={text}
              onChange={(e) => settext(e.target.value)}
            />
            <label className="absolute top-[-12px] left-5 bg-white px-2 text-teal-700 text-lg font-inter">Comment</label>
            {/* <div className="absolute left-0 right-0 bottom-[-2px] h-[2px] bg-teal-500"></div> */}
          </div>

          <button
            className="w-full py-3 bg-teal-600 text-white text-lg font-semibold rounded-lg hover:bg-teal-700 hover:shadow-2xl transition-all duration-300 active:scale-95 transform hover:translate-y-[-2px] animate__animated animate__fadeInUp"
            type="submit"
          >
            <i className="fas fa-paper-plane mr-2"></i> Submit
          </button>
        </form>

        {adabGuard && (
          <div className="flex justify-center items-center mt-8 animate__animated animate__zoomIn animate__delay-1s">
            <h3 className="text-4xl font-gochi text-blue-950">
              {adabGuard?.prediction === 'NT' ? (
                <span className="bg-green-200 text-green-800 py-2 px-6 rounded-full shadow-md animate__animated animate__fadeInUp">
                  Non-Toxic
                </span>
              ) : adabGuard?.prediction === 'T' ? (
                <span className="bg-red-200 text-red-800 py-2 px-6 rounded-full shadow-md animate__animated animate__fadeInUp">
                  Toxic
                </span>
              ) : (
                <span className="text-gray-600">No Prediction Yet</span>
              )}
            </h3>
          </div>
        )}

        <div className="flex justify-center items-center mt-6">
          <Link
            className="text-teal-800 text-lg font-semibold hover:text-teal-600 hover:underline transition-all duration-300 animate__animated animate__fadeIn animate__delay-3s"
            to={"https://abdurrahmanhassan.netlify.app/"}
          >
            <h5 className="font-gochi">Created by Abdurrahman Hassan</h5>
          </Link>
        </div>
      </div>
    </div>

  );
}