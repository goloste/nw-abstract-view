const JsonSnippet = ({jsonElem, title}) => {

  return (
    <div>
      <h4>{title}</h4>
      <h4>{JSON.stringify(jsonElem)}</h4>
      <h4> ---- </h4>
    </div>
  )
}

export default JsonSnippet
