// import { useNavigate } from "react-router-dom"

export const Button=({onClick,children}:{onClick:()=>void,children:React.ReactNode})=>{
 
    return(
        <button
        onClick={onClick}
        className="bg-green-500
        hover:bg-blue-700 text-white
        font-bold py-2 px-4 rounded" >
        {children}
        </button>
    )
}