import React from 'react'
import Nav from './navigation/Nav'
// import Hero from './hero/Hero'
import Main from './main/Main'
// import FormSearch from './UI/formSearch/FormSearch'
import Vacantion from './vacantion/Vacantion'
// import Slider from './UI/slider/slider'

const App = () => {
  return (
    <div>
      <Nav />
      <Main />
      {/* <Hero /> */}
      {/* <FormSearch /> */}
      <Vacantion />
    </div>
  )
}

export default App