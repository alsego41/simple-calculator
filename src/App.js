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
          // console.log(display);
          let auxdis = display.substring(0, len - 1)  
          setDisplay(auxdis)
        }
      }
     } else if (e.key === 'Delete'){
       setDisplay(0)
     }
     else {
      let tkd = transformarKeyDown(e.key)
      if (tkd !== ' '){
        setDisplay(
          display === 0 ? 
            tkd : 
            display + tkd
        )
      } else
       setDisplay(
         display === 0 ? 
           e.key : 
           display + e.key
       )
     }
    //  e type click
    } else {
      console.log(e.target);
        if (e.target.textContent === 'C') {
          setDisplay(0)
        } else if (e.target.textContent === '=') {
          calculation()
        }
        else {
          interpretarSimboloClick(e.target.textContent)
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
    setDisplay(primS.toString())
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

  const interpretarSimboloClick = (simbolo) => {
    console.log(`simbolo ${simbolo}`);
    const simbolosRaros = ['+','−','×','÷','x²','√x','+∕−']
    const operadores = ['+','-','*','/','sqr','sqrt','signo']
    let whichOp = simbolosRaros.findIndex(simboloRaro => simboloRaro === simbolo)
    let op = ' '
    if (whichOp >= 0){
      op = operadores[whichOp]
      console.log(`op ${op}`);
    }
    return op
  }

  const transformarKeyDown = (simbolo) => {
    const simbolosRaros = ['+','−','×','÷']
    const operadores = ['+','-','*','/']
    let whichOp = operadores.findIndex(op => op === simbolo)
    let op = ' '
    if (whichOp >= 0){
      op = simbolosRaros[whichOp]
      console.log(`sr ${op}`);
    }
    return op
  }

  const regex = new RegExp('([0-9*/+.-])+')
  // const f = new RegExp('([^F])')

  document.onkeydown = e => {
    // console.log(e);
    // console.log(!(e.which > 112 && e.which < 123));
    if ((e.key.match(regex) && !(e.which > 112 && e.which < 123)) || e.key === 'Backspace' || e.key === 'Delete'){
        updDisplay(e)
    }
      // console.log(e);
    else if (e.key === 'Enter') {
      calculation()
    }
  }

  const copyContent = () => {
    // console.log('on copycontent');
    setDisplay(prim)
  }

  return (
    <div id='calc'>
      <h1>A Simple Calculator</h1>
      <p>Now with React!</p>
      <div id='main-box'>
        <Display lastText={prim} mainText={display} copyContent={copyContent} />
        <LineBox text1='C' text2='&radic;x' text3='x&sup2;' text4='&#247;' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='7' text2='8' text3='9' text4='&#215;' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='4' text2='5' text3='6' text4='&#8722;' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='1' text2='2' text3='3' text4='&#43;' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='0' text2='.' text3='&#43;&#x2215;&#8722;' text4='&#61;' 
          updDisplay={updDisplay}  
        />
      </div>
      <Footer />
    </div>
  )
}

export default App;
