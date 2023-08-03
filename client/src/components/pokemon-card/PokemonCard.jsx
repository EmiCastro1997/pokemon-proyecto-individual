import React from "react";
import {Link} from "react-router-dom";
import './PokemonsCard.css'
//import { getPokeByName } from "../../redux/actions";
//import { useDispatch, useSelector } from "react-redux";


const PokemonCard = ({name,id,image,types}) =>{

  //const datos= useSelector(state=> state.currentPokemon);
  

    return(
        <div className="card">
          <img src={image} alt={name + 'image'} className="card_img"/>
          <div className="card_content">
            <Link to={`/pokemons/${id}`}>
                <h1 className="h1" >{name}</h1>
                {types?.map(type => {
                  return (
                    <h3 className="h3">{type.name}</h3>
                  )
                })
                 }
                {/*{datos?.types?.map((e,i)=><h3 className="h3" key={i}>{e.type.name}</h3>)}  */}
               {/* <h4 className="h4">{attack}</h4>*/}
               {/* <h5 className="h5">{defense}</h5>*/}
            </Link>
          </div>
        </div>
    )
};
export default PokemonCard;