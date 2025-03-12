import React from 'react'
import {SyncLoader} from 'react-spinners'

const Loading = () => {
  return (
    <div style={
        {
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            height:'50vh',
        }
    }>

      <SyncLoader />
    </div>
  )
}

export default Loading
