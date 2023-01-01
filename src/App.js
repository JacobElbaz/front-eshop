import { useEffect, useState } from 'react';
import './App.css';
import { UidContext } from './Components/AppContext';
import NavbarComp from "./Components/NavbarComp";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.action';

function App() {
    const [uid, setUid] = useState('6363b389f87b72140fb22f93');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchToken =async() => {
            await axios({
                method: "get",
                url: `${process.env.REACT_APP_API_URL}jwtid`,
                withCredentials: true,
            })
              .then((res) =>{
                  setUid(res.data);
                })
              .catch((err) => console.log("No token"));       
        };
        fetchToken();
        if (uid) dispatch(getUser(uid))
        console.log(uid)
    }, [uid, dispatch]);
    return (
        <UidContext.Provider value = {uid}>
            <NavbarComp />
        </UidContext.Provider  >
    );
}

export default App;