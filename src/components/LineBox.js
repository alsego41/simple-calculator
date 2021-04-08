import Boton from './Boton'

const LineBox = props => {
    return (
        <div className='line-box'>
            <Boton text={props.text1} updDisplay={props.updDisplay} />
            <Boton text={props.text2} updDisplay={props.updDisplay} />
            <Boton text={props.text3} updDisplay={props.updDisplay} />
            <Boton text={props.text4} updDisplay={props.updDisplay} />
        </div>
    )
}

export default LineBox