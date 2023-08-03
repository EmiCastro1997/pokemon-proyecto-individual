import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { clearFilters } from "../../redux/actions";

const ErrorHandler = ({error})=>{
    const dispatch = useDispatch();
    const pokemons = useSelector(state => state.pokemons);
    const handleBack = () =>{
        dispatch(clearFilters(pokemons));
    };
    return(
        <div>
            <h1>Error</h1>
            <p>{error}</p>
            <button onClick={handleBack}>Back</button>
        </div>
    )
};
export default ErrorHandler;