import React from "react";
import NavLogo from "../components/navLogo";
import { Link, useLocation } from "react-router-dom";
import '../index.css';

function PlatformGoogle() {
  const location = useLocation();
  const { parsedData } = location.state || {};

  if (!parsedData) {
    return <div>Loading...</div>;
  }

  const {
    headings,
    longHeadings,
    descriptions,
    images,
  } = parsedData;

  return (
    <>
      <div className="flex w-full justify-between items-center py-5 px-48">
        <NavLogo />

        <div className="flex gap-3">
          <Link
            to="/dashboard/manage-campaigns"
            className="flex justify-center items-center bg-epash-green text-white rounded-md px-8 h-12 font-bold hover:scale-110 duration-100"
          >
            Go Back
          </Link>
        </div>
      </div>
      <hr />
      <div>
        <h1 className="text-center mt-20 text-5xl font-custom font-bold">Modify your google ads</h1>
        <p className="text-center mb-20 mt-5 text-xl">Change headlines, body text and contents of your google ads.</p>
        <div className="flex flex-col m-10 rounded-lg shadow-lg border border-stone-200 bg-white p-10">
          <h1 className="text-4xl font-custom">Google Ad 1:</h1>
          <div className="flex gap-10 justify-between mt-10">
            <div className="flex flex-col gap-4 flex-grow">
              <h2 className="text-xl font-custom">Headlines</h2>
              {headings.map((headline, index) => (
                <input key={index} type="text" defaultValue={headline} className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"/>
              ))}
              <h2 className="text-xl font-custom mt-5">Descriptions</h2>
              {descriptions.map((description, index) => (
                <input key={index} type="text" defaultValue={description} className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"/>
              ))}
              <h2 className="text-xl font-custom mt-5">Long Headlines</h2>
              {longHeadings.map((longHeadline, index) => (
                <input key={index} type="text" defaultValue={longHeadline} className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"/>
              ))}
            </div>
            <div className="flex flex-col items-center mt-10 flex-grow">
              <p>{images[0]}</p>
              <img src={images[0]} alt="Google Ad" className="w-96 h-96 object-cover rounded-md mb-5"/>
              <div className="flex gap-5">
                <button className="py-2 px-5 bg-epash-green rounded-md text-white font-custom font-black">
                  Reroll
                </button>
                <button className="py-2 px-5 bg-epash-green rounded-md text-white font-custom font-black">
                  Confirm
                </button>
              </div>
            </div>
          </div>
          <div>
            <button className="py-2 px-5 bg-epash-green rounded-md text-white font-custom font-black mt-10">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlatformGoogle;
