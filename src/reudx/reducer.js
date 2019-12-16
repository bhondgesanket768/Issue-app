//import Issues from "../components/issueslist"

const initial_state={
    IssuesList:[]
}

function Reducer(state=initial_state,action){
    switch(action.type){
        case 'ADD_ISSUE':
            return {
                ...state,
                IssuesList:[...state.IssuesList,action.payload]
            }
        case 'DELETE_ISSUE':
            return {
                ...state,
                IssuesList:state.IssuesList.filter((_,index)=>index!==action.payload)
            }
        case 'CLOSED_ISSUE':
            return {
                ...state,
                IssuesList:state.IssuesList.map((todo,index)=>(index===action.payload)?{...todo,open:!todo.open}:todo)
            }
        case 'ADD_LIKES':
            return {
                ...state,
                IssuesList:state.IssuesList.map((todo,index)=>(index===action.payload)?{...todo,like:todo.like+1}:todo)
            }
        case 'ADD_DISLIKES':
            return {
                ...state,
                IssuesList:state.IssuesList.map((todo,index)=>(index===action.payload)?{...todo,dislike:todo.dislike+1}:todo)
            }
        default:
            return state
    }
}

export default Reducer