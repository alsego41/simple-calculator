const Display = props => {
    return (
        <>
            <div id='display-last' className='display'>
                {props.lastText}
            </div>
            <div id='display-main' className='display'>
                {props.mainText}
            </div>
        </>
    )
}

export default Display