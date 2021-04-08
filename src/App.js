import React from 'react'
import { useState } from 'react'
import Display from './components/Display'
import LineBox from './components/LineBox'
import Footer from './components/Footer'

function App() {
  const [ display, setDisplay ] = useState(0)
  const [ prim, setPrim ] = useState(0)

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
        } else if (e.target.textContent === '=') {
          calculation()
        }
        else {
          setDisplay(
            display === 0 ? 
            e.target.textContent : 
            display + e.target.textContent
          )
        }
    }
  }

  const calculation = () => {
    const operadores = new RegExp('([/*+-])', 'g')
    let newDisplay = display
    let match
    let pos = []

    while ((match = operadores.exec(newDisplay)) != null){
      // console.log(match);
      // console.log(match.index);
      pos.push(match.index)
    }
    console.log(pos);
    let primS = Number(newDisplay.substring(0, pos[0]))
    while (pos.length > 0){
      // console.log('---------');
      // console.log(`quedan ${pos.length}`);
      // console.log(pos[0]);
      // console.log(newDisplay.charAt(pos[0]));


      // console.log(primS);

      let segS = Number(newDisplay.substring(pos[0] + 1, pos[1]))

      // console.log(segS);

      // console.log((operations(primS, segS, newDisplay.charAt(pos[0]))));
      primS = operations(primS, segS, newDisplay.charAt(pos[0]))
      // console.log(primS);

      pos.shift()
    }
    setDisplay(primS)
    setPrim(display)
    // setPrim(primS)
  }

  const operations = (a, b, op) => {
    a = Number(a)
    b = Number(b)
    let result = 0
    switch (op) {
      case '+':
        result = a + b
        break;
      case '-':
        result = a - b
        break;
      case '*':
        result = a * b
        break;
      case '/':
        result = a / b
        break;
      default:
        break;
    }
    return result
  }

  const regex = new RegExp('([0-9*/+.-])+')
  const f = new RegExp('([^F])')

  document.onkeydown = e => {
    console.log(e);
    // console.log(!(e.which > 112 && e.which < 123));
    if ((e.key.match(regex) && !(e.which > 112 && e.which < 123)) || e.key === 'Backspace'){
        updDisplay(e)
    }
      // console.log(e);
    else if (e.key === 'Enter') {
      calculation()
    }
  }

  return (
    <div id='calc'>
      <h1>A Simple Calculator</h1>
      <p>Now with React!</p>
      <div id='main-box'>
        <Display lastText={prim} mainText={display} />
        <LineBox text1='^' text2='&radic;' text3='x&sup2;' text4='/' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='7' text2='8' text3='9' text4='*' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='4' text2='5' text3='6' text4='-' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='1' text2='2' text3='3' text4='&#43;' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='0' text2='.' text3='C' text4='&#61;' 
          updDisplay={updDisplay}  
        />
      </div>
      <Footer />
    </div>
  )
}

export default App;
