import React from "react";
import Filters from "../filters/Filter";
import SearchBar from "../searchbar/Search";
import {Link} from "react-router-dom";

const NavBar=()=>{
    return(
        <div className="navbar">
            <Link to="/home" className="home_button">HOME</Link>
            <div className="navbar_header">
                <SearchBar/>
            </div>
             <div className="navbar_create_button">
                <Link to='/create'><span>CREATE POKEMON</span></Link>
             </div>
             <div className="navbar_form">
                <Filters />
             </div>
        </div>
    )
};

export default NavBar;