import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRouters, publicRouters } from "../routers";
import { SHOP_ROUTE } from "../utils/contstans";
import { Context } from "../index";


function AppRoter() {
    // const isAuth = false;
    const {user} = useContext(Context);
    console.log("user", user);

    return (
        <Routes>
            {user.isAuth && authRouters.map(
                ({path, Component}) => 
                <Route  key={path}
                        path={path}
                        element={<Component />} 
                />
            )}
            {publicRouters.map(
                ({path, Component}) => 
                <Route  key={path}
                        path={path}
                        element={<Component />} 
                />
            )}
            <Route path="*" element={<Navigate to ={SHOP_ROUTE} />}/>
            
        </Routes>
    );
}

export default AppRoter;