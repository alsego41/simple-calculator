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
        deleteByOne()
      } 
      else if (e.key === 'Delete'){
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
      switch (e.target.textContent){
        case 'AC':
          setDisplay(0)
          break
        case '=':
          if (display !== 'Syntax error'){
            calcRevamped()
          }
          break
        case '+∕-':
          let aux
          if (typeof display !== 'string' && typeof display !== 'number'){
            aux = display.join('')
          }
          else if (typeof display === 'number') {
            aux = display.toString()
          }
          else {
            aux = display
          }
          if (display !== 'Syntax error' && display !== 0){
            if (aux[0] === '-'){
              setDisplay(aux.slice(1))
            }
            else {
              setDisplay('-' + aux)
            }
          }
          break
        case 'C':
          deleteByOne()
          break
        case 'Π':
          if (display !== 0)
            setDisplay(display + '3.1415')
          else
            setDisplay('3.1415')
          break
        case 'x²':
          setDisplay(display + '²')
          break
        case '√x':
          // Add exception when a single number is displayed
          if (display !== 0)
            setDisplay(display + '√')
          else
            setDisplay('√')
          break
        case '∛x':
          if (display !== 0)
            setDisplay(display + '∛')
          else
            setDisplay('∛')
          break
        case 'xy':
          setDisplay(display + '^')
          break
        case 'y':
          setDisplay(display + '^')
          break
        default:
          setDisplay(
            display === 0 || display === 'Syntax error' ? 
            e.target.textContent : 
            display + e.target.textContent
          )
          break
      }
    }
  }

  const calcRevamped = () => {
    let arreglo = separar()
    let [ openParPos, closeParPos ] = getPosPrts(arreglo)
    resolverPrts(openParPos, closeParPos, arreglo)
    setPrim(display)
    setDisplay(procesar(arreglo))
  }

  const getPosPrts = (arreglo) => {
    let openParPos = []
    let closeParPos = []
    for (let i = 0; i < arreglo.length; i++){
      if (arreglo[i] === '('){
        openParPos.push(i)
      }
      if (arreglo[i] === ')'){
        closeParPos.push(i)
      }
    }
    let prts = [openParPos, closeParPos]
    return prts
  }

  const resolverPrts = (open, close, arreglo) => {
    let opL = open.length - 1
    let clL = close.length
    for (let i = opL; i >= 0; i--){
      for (let j = 0; j < clL; j++){
        if (open[i] < close[j]){
          let newArray = arreglo.slice(open[i] + 1, close[j])
          let result = procesar(newArray)
          arreglo.splice( open[i], (close[j] - open[i]) + 1, result.toString() );
          [open, close] = getPosPrts(arreglo)
        }
      }
    }
  }

  const deleteByOne = () => {
    if (display !== 'Syntax error') {
      let aux = display.toString()
      let len = aux.length
      if (len === 1){
        setDisplay(0)
      }
      else {
        setDisplay(aux.substring(0, len - 1))
      }
    }
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

  const separar = () => {
    let cadena = display
    let lista = operadores
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

    for (let i = arreglo.length - 1; i >= 0; i--){
      if (arreglo[i].includes('log')){
        arreglo.splice(i, 1, 'log', arreglo[i].substring(3))
      }
      if (arreglo[i].includes('ln')){
        arreglo.splice(i, 1, 'ln', arreglo[i].substring(2))
      }
    }
    return arreglo
  }

  const operadores = ['(',')','²','^','√','∛','log','ln','×','÷','-','+']

  const procesar = (cadena) => {
    let op = operadores
    console.log(cadena);
    while (cadena.length > 1){
      for (let i = 0; i < op.length; i++){
        for (let j = 0; j < cadena.length; j++){
          cadena = transformarCadena(op[i], cadena[j], j, cadena)
          if (cadena.includes(NaN)){
            return 'Syntax error'
          }
        }
      }
    }
    return Number(cadena)
  }

  const transformarCadena = (op, valor, vPos, cadena) => {
    let res
    if (op === valor){
      switch (op) {
        case '²':
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
        case '∛':
          if (cadena[vPos + 1] === '-'){
            res = Number(0) - Number(cadena[vPos + 2])
            res = Math.cbrt(Number(res))
            cadena.splice(vPos, 3, res)
          }
          else {
            res = Math.cbrt(Number(cadena[vPos + 1]))
            cadena.splice(vPos, 2, res)
          }
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
          if (cadena[vPos - 1] === undefined){
            // console.log('hola');
            res = Number(0) - Number(cadena[vPos + 1])
            cadena.splice(vPos, 2, res)
          } else{
            res = Number(cadena[vPos - 1]) - Number(cadena[vPos + 1])
            cadena.splice(vPos - 1, 3, res)
          }
          break
        case '^':
          res = Math.pow(Number(cadena[vPos - 1]), Number(cadena[vPos + 1]))
          cadena.splice(vPos - 1, 3, res)
          break
        case 'ln':
          res = Math.log(Number(cadena[vPos + 1]))
          cadena.splice(vPos, 2, res)
          break
        case 'log':
          res = Math.log10(Number(cadena[vPos + 1]))
          cadena.splice(vPos, 2, res)
          break
        default:
          break;
      }
    }
    return cadena
  }

  
  document.onkeydown = e => {
    const regex = new RegExp('([0-9*/+.-])+')
    if (
    (e.key.match(regex) && !(e.which >= 112 && e.which <= 123)) 
    || e.key === 'Backspace' 
    || e.key === 'Delete'){
        updDisplay(e)
    }
    else if (e.key === 'Enter' && !(display === 'Syntax error')) {
      calcRevamped()
    }
  }

  const copyContent = () => {
    setDisplay(prim)
  }

  const copyClipboard = e => {
    let elemento
    e.target.nodeName === 'path' ?
      elemento = e.target.parentNode :
      elemento = e.target
    let padre = elemento.parentNode
    if (padre.id === 'lastd-copyc'){
      navigator.clipboard.writeText(prim)
      let copyDiv = padre.parentNode.querySelector('.notif-box')
      copyDiv.classList.toggle('invisible')
      setTimeout(() => {
        copyDiv.classList.toggle('invisible')
      }, 2000);
    }
    else if (padre.id === 'maind-copyc') {
      navigator.clipboard.writeText(display)
      let copyDiv = padre.parentNode.querySelector('.notif-box')
      copyDiv.classList.toggle('invisible')
      setTimeout(() => {
        copyDiv.classList.toggle('invisible')
      }, 2000);
    }
  }

  const pasteToDisplay = e => {
    e.preventDefault()
    let toPaste = e.clipboardData.getData('Text')
    if (display === 0 || display === 'Syntax error') {
      setDisplay(toPaste)
    }
    else {
      setDisplay(display + toPaste)
    }
  }

  const editContMenu = e => {
    // console.log(e);
    if (e.button === 0 ) {
      // console.log(e.target.contentEditable);
    }
    if (e.button === 2) {
      e.target.contentEditable = 'true'
      // console.log(e.target.contentEditable);
      setTimeout(() => {
        e.target.contentEditable = 'false'
        // console.log(e.target.contentEditable);
      }, 1000);
    }
  }

  return (
    <div id='calc'>
      <h1>A Simple Calculator</h1>
      <div id='main-box'>
        <Display lastText={prim} mainText={display} 
          copyContent={copyContent} 
          copyClipboard={copyClipboard}
          pasteToDisplay={pasteToDisplay}
          editContMenu={editContMenu} />
        <LineBox text1='log' text2='ln' text3='(' text4=')' 
          updDisplay={updDisplay}  
        />
        <LineBox text1='AC' text2='&#8731;x' text3={<p>x<sup>y</sup></p>} text4='&Pi;' 
          updDisplay={updDisplay}  
        />
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
