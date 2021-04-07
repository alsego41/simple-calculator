import React from 'react'
// import Boton from './components/Boton'
import Display from './components/Display'
import LineBox from './components/LineBox'

function App() {
  return (
    <div id='calc'>
      <h1>A Simple Calculator</h1>
      <div id='main-box'>
        <Display lastText='34512 * 5616' mainText='193819392' />
        <LineBox text1='^' text2='sqrt' text3='^2' text4='/' />
        <LineBox text1='7' text2='8' text3='9' text4='*' />
        <LineBox text1='4' text2='5' text3='6' text4='-' />
        <LineBox text1='1' text2='2' text3='3' text4='+' />
        <LineBox text1='0' text2='' text3='.' text4='=' />
      </div>
    </div>
  )
}

export default App;
