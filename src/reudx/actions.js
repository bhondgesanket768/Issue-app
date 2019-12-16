export const addissue=(list)=>({
    type:'ADD_ISSUE',
    payload:list
})

export const deleteissue=(index)=>({
    type:'DELETE_ISSUE',
    payload:index
})

export const closeissue=(index)=>({
    type:'CLOSED_ISSUE',
    payload:index
})

export const likes=(index)=>({
    type:'ADD_LIKES',
    payload:index
})

export const dislikes=(index)=>({
    type:'ADD_DISLIKES',
    payload:index
})
