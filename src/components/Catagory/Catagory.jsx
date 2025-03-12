import CatagorySlice   from './CatagorySlice'
import CatagoryinfoList from './CatagoryinfoLIst'
import classes from './Catagory.module.css'
import Loading from '../Loading/Loading'
import { useEffect, useState } from 'react'
const Catagory = () => {
   const [isloading, setisloading] = useState(false)
   useEffect(() => {
      setTimeout(() => {
         setisloading(false); // Set loading to false after data is "loaded"
      }, 1000); // Simulate 1 second loading
   }, []);
  return (
   <>
     { 
      isloading ? (<Loading />) :
      <div className={classes.catagoryWrapper}>
        
        {CatagoryinfoList.map((datas, key) => (
           
           <CatagorySlice key={key} data={datas} />
        ))}
     </div>
     }
     </>
    )
}

export default Catagory
