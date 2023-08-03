const { GET_ALL_POKEMONS,
        GET_DETAIL_ID,
        GET_POKEMON_BY_NAME,
        GET_ALL_TYPES,
        CREATE_POKEMON,
        FILTER_POKEMON_ORIGIN,
        PAGINATED,
        CLEAR_FILTERS,
        ORDER_BY_AZ,
        FILTER,

     } = require("./actions")

const initialState = {
    pokemons:[],
    creado:[],
    copyPokemons:[],
    pokemonByName:[],
    currentPokemon:[],
    pokemonsSorted:[],
    pokemonsDetail:[],
    types:[],
    origin:[],
    error:[],
    paginated:1
}
const rootReducer =(state = initialState, action) =>{
    switch(action.type){
        case GET_ALL_POKEMONS:
            return{
                ...state,
                copyPokemons:action.payload,
                pokemons: action.payload,
            };
        case GET_DETAIL_ID:
            return{
                ...state,
                pokemonsDetail:action.payload,
            };
        case GET_POKEMON_BY_NAME:
            console.log(action.payload)
            return{
                ...state,
                pokemons:action.payload,

            };
            case FILTER:
                return{
                    ...state,
                    pokemons:action.payload,
                    paginated:1
                }
        case GET_ALL_TYPES:
            return{
                ...state,
                types:action.payload,
            };
        case ORDER_BY_AZ:
            return{
                ...state,
                pokemonsSorted:action.payload,
            };
        case FILTER_POKEMON_ORIGIN:
           return {
            ...state,
            origin:action.payload,
        };
        case CREATE_POKEMON:
            return{
                ...state,
                creado:action.payload,
        };
         case PAGINATED:
            return{
                ...state,
                paginated:action.payload,
            };
         case CLEAR_FILTERS:
            return{
                ...state,
                pokemons:action.payload,
                pokemonsSorted:[],
                error:{},
            };  

            default:
                return{...state}   
    }
}

export default rootReducer;