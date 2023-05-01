import React from "react"
import * as endpoints from "../assets/endpoints"


function Home() {

  const initialize = async () => {
    console.log('entra');
    //console.log( await endpoints.login('admin@example.es', 'aA1551-'))
    console.log( await endpoints.login('admin@example.es', 'aA1551-'))
    console.log( await endpoints.register('Prueba@prueba1.es', 'Prueba-1', 'Prueba'))
  }


  React.useEffect(() => {
    initialize();
  }, [])


  return (
    <>
        <h1>Home</h1>
    </>
  )
}

export default Home