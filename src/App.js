import React from 'react'
import { useState } from 'react'
// import Boton from './components/Boton'
import Display from './components/Display'
import LineBox from './components/LineBox'
import Footer from './components/Footer'

function App() {
  const [ display, setDisplay ] = useState(0)
  const updDisplay = e => {
   if ( e.type === 'keydown') {
     if (e.key === 'Backspace'){
       let len = display.length
       if (len === 1){
         setDisplay(0)
      }
      else {
        if (display !== 0)
        {
          let auxdis = display.substring(0, len - 1)  
          setDisplay(auxdis)
        }
      }
     } 
     else {
       setDisplay(
         display === 0 ? 
           e.key : 
           display + e.key
       )
     }
    } else {
      if (e.target.textContent === 'C') {
        setDisplay(0)
      } else
        setDisplay(
          display === 0 ? 
          e.target.textContent : 
          display + e.target.textContent
        )
    }
  }

  const regex = new RegExp('([0-9*/+.-])+')

  document.onkeydown = e => {
    if (e.key.match(regex) || e.key === 'Backspace')  
      // console.log(e);
      updDisplay(e)
  }

  return (
    <div id='calc'>
      <h1>A Simple Calculator</h1>
      <p>Now with React!</p>
      <div id='main-box'>
        <Display lastText='34512 * 5616' mainText={display} />
        <LineBox text1='^' text2='&radic;' text3='x&sup2;' text4='&divide;' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='7' text2='8' text3='9' text4='&times;' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='4' text2='5' text3='6' text4='&minus;' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='1' text2='2' text3='3' text4='&#43;' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='0' text2='C' text3='.' text4='&#61;' 
          updDisplay={updDisplay}  
        />
      </div>
      <Footer />
    </div>
  )
}

export default App;
