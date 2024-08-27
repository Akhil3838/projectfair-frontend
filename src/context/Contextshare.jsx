import React, {  createContext, useState } from 'react'

export const addResponseContext = createContext({})
export const editResponseContext = createContext({})
export const isLoginAuthContext =createContext({})

function Contextshare({children}) {

  const [addResponse ,setAddResponse]=useState({})
  const [editResponse ,setEditResponse]=useState({})
  const [isLoginStatus ,setIsLoginStatus]=useState(true)
  return (
    <>
   <isLoginAuthContext.Provider value={{isLoginStatus,setIsLoginStatus}}>
      <addResponseContext.Provider value={{addResponse , setAddResponse}}> 
         <editResponseContext value={{editResponse , setEditResponse}}> {children}</editResponseContext>
      </addResponseContext.Provider>
  
   </isLoginAuthContext.Provider>
    </>
  )
}

export default Contextshare