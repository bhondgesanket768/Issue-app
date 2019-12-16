import React from 'react'

const tagstyle={
    display:"inline-block",
    backgroundColor:"yellow",
    fontSize:"0.9em",
    margin:"5px",
    border:"1px solid lightblue",
    padding:"2px"
}

function Tags({value}){
    var tag=(
        <span style={tagstyle}>{value}</span>
    )
    return (
            <React.Fragment>
            {tag}
            </React.Fragment>
    )
}

export default Tags