import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { getPages } from "../../redux/actions";
import './Pagination.css';

const Pagination = ({pokemonsSorted,cardsPerPage})=>{
    const currentPage=useSelector(state=> state.paginated);
    const dispatch = useDispatch();

    let pages =[];

    for(let i=1; i< Math.ceil(pokemonsSorted / cardsPerPage); i++){
        pages.push(i);
    };
    return(
        <div className="pagination">
            <div className="pagination">
                {
                    currentPage === 1 ?
                    <button></button>:
                    <button onClick={()=>dispatch(getPages(currentPage - 1))}>{"ant"}</button>
                }
            </div>
            <div className="pagination">
                <button>{currentPage}</button>
            </div>
            <div className="pagination">
                {
                    currentPage === pages.length ?
                    <button></button>:
                    <button onClick={()=>dispatch(getPages(currentPage + 1))}>{"sig"}</button>
                }
            </div>
        </div>
    )
};
export default Pagination;