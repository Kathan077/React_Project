export const myAction = (payload) => {
    return {
        type: "ADD",
        payload
    }
}
export const IncAction = (index) => {
    return {
        type: "INC",
        index
    }
}
export const DecAction = (index) => {
    return {
        type: "DEC",
        index
    }
}

export const DelAction=(index)=>{
    return{
        type:"DELETE",
        index
    }
}