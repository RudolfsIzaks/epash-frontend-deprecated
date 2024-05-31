import React from "react";
import "../index.css";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear
} from "@fortawesome/free-solid-svg-icons";

function DashNav({ handleLogout }) {
    const setActiveClass = ({ isActive }) => isActive ? 'text-white bg-epash-green px-4 py-2 rounded-md hover:scale-110 hover:text-white duration-200' : 'text-gray-500 hover:bg-epash-green hover:scale-110 hover:text-white duration-200 px-4 py-2 rounded-md duration-200';
    

    return (
        <>
            <hr />
            <nav>
                <div className="flex py-5 justify-center">
                    <ul className="flex gap-5 justify-center items-center">
                        <li>
                            <NavLink to="/dashboard" className={setActiveClass} end>
                                Current Campaign
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/previous-campaigns" className={setActiveClass} end>
                                Previous Campaigns
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/product-profiles" className={setActiveClass} end>
                                Product Profiles
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/manage-campaigns" className={setActiveClass} end>
                                Manage Campaigns
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="font-custom px-4 py-2 rounded-md hover:scale-110 hover:bg-red-500 hover:text-white duration-200">
                                Log Out
                            </button>
                        </li>
                        <li>
                            <NavLink to="/account/settings" className={setActiveClass} end>
                              <FontAwesomeIcon
                                icon={faGear}
                              />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default DashNav;


