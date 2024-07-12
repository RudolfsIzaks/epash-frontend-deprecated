import React from "react";
import NavLogo from "../components/navLogo";
import { Link } from "react-router-dom";
import '../index.css';

function PlatformGoogle() {
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
      <div className=" flex flex-col m-10 rounded-lg shadow-lg border border-stone-200 bg-white p-10">
        <h1 className="text-4xl font-custom">Google Ad 1:</h1>
        <div className="flex gap-10 items-center justify-between mt-10">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-custom">Headlines</h2>
                <input type="text" placeholder="Headline revision 1" className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"/>
                <input type="text" placeholder="Headline revision 2" className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"/>
                <input type="text" placeholder="Headline revision 3" className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"/>
                <h2 className="text-xl font-custom mt-5">Descriptions</h2>
                <input type="text" placeholder="Description revision 1" className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"/>
                <input type="text" placeholder="Description revision 2" className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"/>
                <input type="text" placeholder="Description revision 3" className="rounded-md bg-stone-50 font-custom appearance-none outline-none border border-stone-200 py-2 px-5"/>
            </div>
            <div className="flex flex-col items-end">
                <div className="w-96 h-96 bg-green-200 rounded-md mb-5"></div>
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
