import React, {useState, useEffect} from "react";
import { getDetailId} from "../../redux/actions";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/loader/Loader";
import "./Detail.css";

const Details=()=>{
    const {id}=useParams();

    const [loading, setLoading] = useState(false);

    const pokemons= useSelector((state)=> state.pokemonsDetail);
    const dispatch = useDispatch();

    useEffect(()=>{
        setLoading(true);
        dispatch(getDetailId(id));
        setTimeout(()=>{
            setLoading(false);
        },1000);
    },[dispatch, id]);

     return(
        <div className="detail">
            {loading ? (
                <Loader/>
            ) : (
                <>
                 <div className="detail_head">
                    <Link to='/home'>
                        <div className="detail_back">
                            <span>Back To Home</span>
                        </div>
                    </Link>
                    <img src={pokemons.image} alt="" />
                    <h1>{pokemons.name}</h1>
                     <div className="detail_content">
                        <h2>Id: {pokemons.id}</h2>
                        <h2>Life: {pokemons.life}</h2>
                        <h2>Attack: {pokemons.attack}</h2>
                        <h2>Defense: {pokemons.defense}</h2>
                        <h2>Speed: {pokemons.speed}</h2>
                        <h2>Weigth: {pokemons.weigth}</h2>
                        <h2>Height: {pokemons.height}</h2>
                     </div>
                       <div className="Types">
                        
                        {pokemons.types && pokemons.types.map((typ)=>{
                            return(
                                <div key={typ.name} className="allTypes">
                                   <div className="cardType">
                                     <h1>Type: {typ.name}</h1>
                                   </div>
                                 </div>
                            )
                        })}

                       </div>
                 </div>
                </>
            )};
        </div>
    )
};
export default Details;