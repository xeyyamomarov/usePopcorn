import React, { useState } from 'react'

const Test = ({children,expand=false,value}) => {
    const [isExpanded,setIsExpanded] = useState(expand)

    const content = isExpanded ? children : children.split(" ").slice(0,value).join(" ")+ "..."

  return (
    <div style={{border:"1px solid red",margin:"10px 0"}} >
        <p>{content}</p>
        <button onClick={()=>setIsExpanded(!isExpanded)} >{isExpanded? "expand" : "show more"}</button>
    </div>
  )
}

export default Test