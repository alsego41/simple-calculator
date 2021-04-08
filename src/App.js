import React from 'react'
import { useState } from 'react'
// import Boton from './components/Boton'
import Display from './components/Display'
import LineBox from './components/LineBox'
import Footer from './components/Footer'

function App() {
  const [ display, setDisplay ] = useState(0)
  const updDisplay = e => {
    e.type === 'keydown' ? 
    setDisplay(
      display === 0 ? 
        e.key : 
        display + e.key
    ) :
    setDisplay(
      display === 0 ? 
        e.target.textContent : 
        display + e.target.textContent
    )
  }

  document.onkeydown = e => {
    updDisplay(e)
  }

  return (
    <div id='calc'>
      <h1>A Simple Calculator</h1>
      <div id='main-box'>
        <Display lastText='34512 * 5616' mainText={display} />
        <LineBox text1='^' text2='sqrt' text3='^2' text4='/' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='7' text2='8' text3='9' text4='*' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='4' text2='5' text3='6' text4='-' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='1' text2='2' text3='3' text4='+' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='0' text2='C' text3='.' text4='=' 
          updDisplay={updDisplay}  
        />
      </div>
      <Footer />
    </div>
  )
}

export default App;
