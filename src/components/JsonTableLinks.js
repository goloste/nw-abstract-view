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
        var i = 1
        jsonData.map((data)=>{
            var t = tab.append("tr")
              t.append("td").text(i)
              t.append("td").text(data.srcrouterid)
              t.append("td").text(data.srcintf)
              t.append("td").text(data.dstrouterid)
              t.append("td").text(data.dstintf)
              t.append("td").text(data.totBW)
              t.append("td").text(data.freeBW)
              t.append("td").text(data.usedBW)
              ++i
        })
    }, [jsonData, toggleTabView])
 
    return(
        <div style={{ marginBottom: "10rem" }}>
            <h2>Links</h2>
            <table class="table-striped">
                <thead>
                    <tr>
                    <th>
                        <button className='button' onClick={() => toggleView()}>
                            {msg}
                        </button>
                    </th>
                    <th>srcrouterid</th>
                    <th>srcintf</th>
                    <th>dstrouterid</th>
                    <th>dstintf</th>
                    <th>totBW</th>
                    <th>freeBW</th>
                    <th>usedBW</th>
                    </tr>
                </thead>
                {toggleTabView ? <tbody ref={tabRef}>
                </tbody> : <tbody> </tbody>}
            </table>
             
        </div>
    )
 }
 
 export default JsonTableNodes;
