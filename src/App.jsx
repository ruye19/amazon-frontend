import React, { useContext, useEffect } from "react";
import Router from "./Router";
import { auth } from "./utility/firebase";
import { DataContext } from "./components/dataProvider/DataProvider";
import { Type } from "./utility/action.type";


function App() {
  const [{user},dispatch]=useContext(DataContext)


  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if (authUser) {
        console.log(authUser)
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
        
      }else{
        dispatch({
          type:Type.SET_USER,
          user:null,
        })
      }
    })
        
  }, [])
  return (
       <Router/>
  );
}

export default App;
