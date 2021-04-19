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
     } else if (e.key === 'Delete'){
       setDisplay(0)
     }
     else {
      let tkd = transformarKeyDown(e.key)
      if (tkd !== ' '){
        setDisplay(
          display === 0 || display === 'Syntax error' ? 
            tkd : 
            display + tkd
        )
      } else
       setDisplay(
         display === 0 || display === 'Syntax error' ? 
           e.key : 
           display + e.key
       )
     }
    } 
    else {
      // console.log(e.target.textContent);
      if (e.target.textContent === 'C') {
        setDisplay(0)
      } 
      else if (e.target.textContent === '=') {
        if (display !== 'Syntax error'){
          calcRevamped()
        }
      }
      else if (e.target.textContent === '+∕-'){
        let aux = display.toString()
        // console.log(display);
        // console.log(aux);
        // console.log(aux[0]);
        if (display !== 'Syntax error'){
          if (aux[0] === '-'){
            setDisplay(aux.slice(1))
          }
          else {
            setDisplay('-' + display)
          }
        }
      }
      else {
        setDisplay(
          display === 0 || display === 'Syntax error' ? 
          interpretarSimbolo(e.target.textContent) : 
          display + interpretarSimbolo(e.target.textContent)
        )
      }
    }
  }

  const calcRevamped = () => {
    let arreglo = separar()
    // console.log(arreglo);
    setPrim(display)
    setDisplay(procesar(arreglo))
  }

  const separar = () => {
    let cadena = display.toString()
    let lista = ['²','√','×','÷','+','-']
    let arreglo = []
    let flag = false
    let acc = ''
    for (let i=0; i < cadena.length; i++){
      for (let j = 0; j < lista.length; j++){
        if (cadena[i] === lista[j]){
          arreglo.push(acc)
          arreglo.push(cadena[i])
          flag = true
          acc = ''
        }
      }
      if (flag === false){
        acc += cadena[i]
      }
      flag = false
    }
    arreglo.push(acc)
    arreglo = arreglo.filter(sub => sub !== '')
    return arreglo
  }

  const procesar = (cadena) => {
    let op = ['²','√','×','÷','-','+']
    for (let i = 0; i < op.length; i++){
      for (let j = 0; j < cadena.length; j++){
        // console.log('procesar');
        // console.log(cadena);
        cadena = transformarCadena(op[i], cadena[j], j, cadena)
        if (cadena.includes(NaN)){
          return 'Syntax error'
        }
      }
    }
    return cadena
  }

  const transformarCadena = (op, valor, vPos, cadena) => {
    let res
    if (op === valor){
      switch (op) {
        case '²':
          // console.log(`op ${op} -> ${cadena[vPos - 1]} `);
          if (op !== cadena[vPos - 1]){
            res = Math.pow(Number(cadena[vPos - 1]), 2)
            cadena.splice(vPos - 1, 2, res)
          } else {
            cadena.splice(vPos - 1, 2, NaN)
            return cadena
          }
          break;
        case '√':
          res = Math.sqrt(Number(cadena[vPos + 1]))
          cadena.splice(vPos, 2, res)
          break
        case '×':
          res = Number(cadena[vPos - 1]) * Number(cadena[vPos + 1])
          cadena.splice(vPos - 1, 3, res)
          break
        case '÷':
          res = Number(cadena[vPos - 1]) / Number(cadena[vPos + 1])
          cadena.splice(vPos - 1, 3, res)
          break
        case '+':
          res = Number(cadena[vPos - 1]) + Number(cadena[vPos + 1])
          cadena.splice(vPos - 1, 3, res)
          break
        case '-':
          // console.log(cadena[vPos - 1]);
          if (cadena[vPos - 1] === undefined){
            // console.log('hola');
            res = Number(0) - Number(cadena[vPos + 1])
            cadena.splice(vPos, 2, res)
          } else{
            res = Number(cadena[vPos - 1]) - Number(cadena[vPos + 1])
            cadena.splice(vPos - 1, 3, res)
          }
          // console.log(res);
          // cadena.splice(vPos - 1, 3, res)
          break
        default:
          break;
      }
      // console.log(cadena);
    }
    return cadena
  }

  const interpretarSimbolo = (simbolo) => {
    // console.log(`simbolo ${simbolo}`);
    const simbolosRaros = ['x²','√x']
    const operadores = ['²','√']
    let whichOp = simbolosRaros.findIndex(simboloRaro => simboloRaro === simbolo)
    let op = ' '
    if (whichOp >= 0){
      op = operadores[whichOp]
      // console.log(`op ${op}`);
      return op
    }
    return simbolo
  }

  const transformarKeyDown = (simbolo) => {
    const simbolosRaros = ['+','-','×','÷']
    const operadores = ['+','-','*','/']
    let whichOp = operadores.findIndex(op => op === simbolo)
    let op = ' '
    if (whichOp >= 0){
      op = simbolosRaros[whichOp]
      // console.log(`sr ${op}`);
    }
    return op
  }

  const regex = new RegExp('([0-9*/+.-])+')

  document.onkeydown = e => {
    // console.log(e);
    // console.log(!(e.which > 112 && e.which < 123));
    if ((e.key.match(regex) && !(e.which > 112 && e.which < 123)) 
    || e.key === 'Backspace' 
    || e.key === 'Delete'){
        updDisplay(e)
    }
      // console.log(e);
    else if (e.key === 'Enter' && !(display === 'Syntax error')) {
      calcRevamped()
      // calculation()
    }
  }

  const copyContent = () => {
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
        <LineBox text1='4' text2='5' text3='6' text4='-' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='1' text2='2' text3='3' text4='&#43;' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='0' text2='.' text3='&#43;&#x2215;-' text4='&#61;' 
          updDisplay={updDisplay}  
        />
      </div>
      <Footer />
    </div>
  )
}

export default App;
