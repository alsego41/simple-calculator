import Boton from './Boton'

const LineBox = props => {
    return (
        <div>
            <Boton text={props.text1} />
            <Boton text={props.text2} />
            <Boton text={props.text3} />
            <Boton text={props.text4} />
        </div>
    )
}

export default LineBox