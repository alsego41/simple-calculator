const Display = props => {
    return (
        <>
            <div id='display-last' className='display' onClick={props.copyContent}>
                {props.lastText}
            </div>
            <div id='display-main' className='display'>
                {props.mainText}
            </div>
        </>
    )
}

export default Display