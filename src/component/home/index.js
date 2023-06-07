import { useNavigate } from "react-router-dom"
import axios from "axios";

function Home() {
    // const navigate = useNavigate();

    // const handleClick = (e) => {
    //     window.localStorage.removeItem("name");
    //     window.localStorage.removeItem("token");
    //     navigate("/login");
    // }
    // const username =  window.localStorage.getItem("name");
    // const token =  window.localStorage.getItem("token");
    // console.log(username)


    // // const url = "http://localhost:8080/api/v1/books/list"
    // // const config = {
    // //     headers: { Authorization: `Bearer ${token}` }
    // // };
    
    
    // // axios.get(url, config)
    // // .then(res => console.log(res))
    // // .catch(err => console.log(err))



    return(
        <div>
            Home
            {/* <div>{username}</div>
            <div>{token}</div>
            <button onClick={(e) => handleClick(e)}>Back</button> */}
        </div>
    )
}

export default Home;