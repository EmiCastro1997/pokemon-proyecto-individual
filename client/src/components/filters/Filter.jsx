import React,{useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import { filter,getAllTypes } from "../../redux/actions";


const Filters = () =>{
    const dispatch = useDispatch();
    const copy=useSelector(state=>state.copyPokemons);
    const types = useSelector(state=>state.types);

    const [type , setType]=useState("");
    const [origi, setOrigi]=useState("");
    const [attack, setAttack]=useState("");
    const [alfa, setAlfa]=useState("");

   const Filter = () =>{
   let allPokemons=[...copy]
   if(type !== "" || origi !== "" || attack !== "" || alfa !== ""){
      if(origi === "Creados")allPokemons=allPokemons.filter(pokemon=>typeof pokemon.id !=="number")
      if(origi === "Api")allPokemons=allPokemons.filter(pokemon=>typeof pokemon.id ==="number")
      if(type !== "")allPokemons=allPokemons.filter(pokemon=>pokemon.types.find(typ=>typ.name === type))
      if(attack === "DES")allPokemons=allPokemons.sort((a, b) => b.attack - a.attack)
      if(attack === "ASC")allPokemons=allPokemons.sort((a, b) => a.attack - b.attack)
      if(alfa === "ASC")allPokemons=allPokemons.sort((a,b) => a.name.localeCompare(b.name))
      if(alfa === "DES")allPokemons=allPokemons.sort((a,b)=> b.name.localeCompare(a.name)) 
    }dispatch(filter(allPokemons))
   };

   useEffect(()=>{
      Filter()
   },[origi,type,attack,alfa])

     useEffect(()=>{
        dispatch(getAllTypes());
     }, [dispatch]);

     return(
        <div className="filter">
         <select value={type} onChange={(e)=>setType(e.target.value)} className="filter_select">
            <option key="none" value="" className="select">TYPES</option>
            {
               types?.map(typ=>{
                  return(
                     <option value={typ.name} key={typ.id}>{typ.name}</option>
                  )
               })
            }
         </select>
         <select value={origi}onChange={(e)=>setOrigi(e.target.value)} className="filter_select" >
            <option value="">ORIGIN</option>
            <option value="Creados">Create</option>
            <option value="Api">Api</option>
         </select>
         
         <select value={alfa} onChange={(e)=>{
            setAlfa(e.target.value)
            setAttack("")
            }}  className="filter_select" >
                <option value="">SORT BY</option>
                <option value="ASC">A-Z</option>
                <option value="DES">Z-A</option>
            </select>

            <select value={attack}  onChange={(e)=>{
               setAttack(e.target.value)
               setAlfa("")
               }}  className="filter_select" >
                <option value="">ATTACK</option>
                <option value="DES">MAX-MIN</option>
                <option value="ASC">MIN-MAX</option>
            </select>
            
            
            <button onClick={()=>{
               setOrigi("")
               setAlfa("")
               setAttack("")
               setType("")
            }}>CLEAR FILTERS</button>
        </div>
     )
};

export default Filters;