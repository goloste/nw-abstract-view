import { json, select } from 'd3'
import React, { useEffect, useRef, useState } from 'react'
import './Table.css'

 function JsonTableNodes({jsonData}){
    
    var [toggleTabView, setToggle] = useState(true)
    var [msg, setMsg] = useState('Hide')
    
    function toggleView () {
        setToggle(!toggleTabView)
        if (toggleTabView) { 
            setMsg('Hide')
        } else {
            setMsg('Show')
        }
    }

    const tabRef = useRef()
    const tab = select(tabRef.current)

    useEffect(() => {
        // setToggle(false)
        var i = 1
        jsonData.map((data)=>{
            var t = tab.append("tr")
              t.append("td").text(i)
              t.append("td").text(data.routerid)
              t.append("td").text(data.tech_type)
              ++i
        })
    }, [jsonData,toggleTabView])

    return(
        <div>
            
            <h2>Nodes</h2>

            <table onChange={toggleTabView}>
                <thead>
                    <tr>
                    <th>
                        <button className='button' onClick={() => toggleView()}>
                            {msg}
                        </button>
                    </th>
                    <th>routerid</th>
                    <th>tech_type</th>
                    </tr>
                </thead>
                {toggleTabView ? <tbody ref={tabRef}>
                </tbody> : <tbody> </tbody>}
            </table>
             
        </div>
    )
 }
 
 export default JsonTableNodes;
