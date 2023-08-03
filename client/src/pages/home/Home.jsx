import React, {useState,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import Pagination from "../../components/pagination/Pagination";
import PokemonCard from "../../components/pokemon-card/PokemonCard";
import NavBar from "../../components/navbar/NavBar";
import ErrorHandler from "../../components/error-handler/ErrorHandler";
import Loader from "../../components/loader/Loader";
import * as actions from "../../redux/actions";
import backgroundHome from "../../assets/OIP.jpg"
import './Home.css';

const Home= () => {
    
   // const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(12);
    const [loading,setLoading] = useState(false);

    const dispatch = useDispatch();
    //const pokemons = useSelector(state=>state.pokemons);

    const pokemonsSorted = useSelector(state => state.pokemons);
    const currentPages =useSelector(state => state.paginated);
    const error = useSelector(state => state.error);

    const lastCardIndex = currentPages * cardsPerPage;
    const firstCardIndex = lastCardIndex - cardsPerPage;
    const currentCards=Array.isArray(pokemonsSorted) ? pokemonsSorted.slice(firstCardIndex, lastCardIndex):[{...pokemonsSorted}]

   

    useEffect(()=>{
        setLoading(true);
        dispatch(actions.getAllPokemons());
            setLoading(false);
    },[dispatch]);

     //let currentCards
    //if(pokemonsSorted.length > 0){
    //    currentCards = pokemonsSorted.slice(firstCardIndex,lastCardIndex);
    //}else{
    //    currentCards = pokemons.slice(firstCardIndex,lastCardIndex);
    //};
    return(
        <div className="home" style={{ backgroundHome:`url(${backgroundHome})`}}>
         <div className="home_navbar">
            <NavBar setLoading={setLoading}/>
         </div>
           <div className="home_container">
             <div className="home_pokemons">
                {loading ? (
                    <Loader />
                ) : error.length ? (
                    <ErrorHandler error={error}/>
                ) : 
                 (
                    currentCards?.map((pokemon)=>{
                        console.log(currentCards)
                        return(
                            <PokemonCard
                             key ={pokemon.id}
                             id ={pokemon.id}
                             name ={pokemon.name}
                             image={pokemon.image}
                             type={pokemon.Types}
                             />
                        )
                    })
                )}
             </div>
           </div>
           {!error.length && (
            <Pagination
            cardsPerPage={cardsPerPage}
            pokemonsSorted={pokemonsSorted}
            />
           )}
        </div>
    )

};
export default Home;