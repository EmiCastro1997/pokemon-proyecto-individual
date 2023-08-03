import React,{useState} from "react";
import {useDispatch, useSelector}from "react-redux";
import { getPokeByName } from "../../redux/actions";

const SearchBar = ()=>{
    //const [error, setError]=useState(false);
    
    const pokemonByName = useSelector((state)=> state.pokemonByName)

    const [pokemons,setPokemons]=useState("");
    const dispatch = useDispatch();

    //const getName = useSelector((state) => state.getName)
   //const [byName, setByName] = useState("");

    const imputHandler = (event) => {
        setPokemons(event.target.value)  
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getPokeByName(pokemons))
        setPokemons("")
    }

   // const handleSearch = e =>{
     //   e.preventDefault();
       // if(!pokemons || pokemons === ""){
         //   setError(true)
           // return
        //}
        //setError(false);
        //dispatch(getPokeByName(pokemons));
        //setLoading(true);
        //setTimeout(()=>{
         //   setLoading(false)
        //},1000);
        //setPokemons("");
    //};
    //const onChangeInput=e=>{
      //  setPokemons(e.target.value);
    //};
    return( 
        <div className="search">
            <form >
                <input type="text" placeholder="Search..." onChange={imputHandler} name="name" value={pokemons}/>
                <button  onClick={handleSubmit}type="submit" >Submit</button>
            </form>

        </div>
    )
};
export default SearchBar;