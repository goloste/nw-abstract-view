import './App.css';
import JsonSnippet from './components/JsonSnippet';
import JsonTableNodes from './components/JsonTableNodes';
import JsonTableLinks from './components/JsonTableLinks';
import NewGraph from './components/NewGraph';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { useState, useEffect } from 'react';

const App = () => {
  
  const [nodes, setNodes] = useState([])
  const [links, setLinks] = useState([])

  useEffect(() => {
    
    const getNodes = async () => {
      const nodesFromServer = await fetchElem('Node')
      const linksFromServer = await fetchElem('Links')
      setNodes(nodesFromServer)
      setLinks(linksFromServer)
    }

    getNodes()
  }, []) // The empty array '[]' is a dependency array, to pass value inside useEffect
  
  // Two elements can be fetched: 'Node' and 'Links'
  const fetchElem = async (elem) => {
    const res = await fetch(`http://localhost:5000/${elem}`)
    const data = await res.json()
    return data
  }

  // server fetched JSON is reorganized in a custom format to draw topology graph
  var newNodes = []
  nodes.forEach(function(d) {
    newNodes.push({
      "id": d.routerid,
      "tech_type": d.tech_type,
      "toggle_info": true
    })
  })
  var newLinks = []
  links.forEach(function(d) {
    newLinks.push({
      "source": d.srcrouterid,
      "target": d.dstrouterid,
      "srcintf": d.srcintf,
      "dstintf": d.dstintf,
      "totBW": d.totBW,
      "freeBW": d.freeBW,
      "usedBW": d.usedBW
    })
  })

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path='/' element={<>
            <NewGraph nodeInput={newNodes} linkInput={newLinks}/>
            <JsonTableNodes jsonData={nodes}/>
            <JsonTableLinks jsonData={links}/>
            {/* <NewGraph nodeInput={newNodes} linkInput={newLinks}/> */}
            {/* <JsonSnippet title={"Nodes retrieved by Querying server"} jsonElem={nodes}/> */}
            {/* <JsonSnippet title={"Links retrieved by Querying server"} jsonElem={links}/> */}
            </>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
