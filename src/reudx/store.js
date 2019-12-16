import {createStore} from 'redux'
import Reducer from './reducer'

function savetostorage(state){
    try{
        const data=JSON.stringify(state)
        localStorage.setItem('issue',data)
    }catch(e){
        console.log(e)
    }
}

function loadstorage(){
    try{
        const serdata=localStorage.getItem('issue')
        if(serdata===null) return undefined
        return JSON.parse(serdata)
    }catch(e){
        console.log(e)
        return undefined
    }
}
const persist=loadstorage()
const store=createStore(Reducer,persist)
store.subscribe(()=>savetostorage(store.getState()))
store.subscribe(()=>console.log(store.getState()))

export default store