export const initialState = {
    user: null,
    message: "",
};


const reducer = (state, action) => {
    console.log(action);
    switch(action.type){
        case 'SET_USER':
            return { 
                ...state,
                user: action.user,
            }
        case 'SET_MESSAGE':
            return { 
                ...state,
                message: action.message,
            }

        default: 
            return state;
    }
};

export default reducer;