import { useEffect, useState } from 'react';
import './App.css';
import { UidContext } from './Components/AppContext';
import NavbarComp from "./Components/NavbarComp";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.action';

function App() {
    const [uid, setUid] = useState(null);
    const dispatch = useDispatch();
    const fetchToken = () => {
        return async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}jwtid`
                );
                setUid(res.data);
            } catch(err) {
                console.log(err);
            }
        }};

    useEffect(() => {
        fetchToken();
        if (uid) dispatch(getUser(uid))
    }, [uid, dispatch]);


    return (

        <UidContext.Provider value = {uid}>
            <NavbarComp />
        </UidContext.Provider  >
    );
}

export default App;