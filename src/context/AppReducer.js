export const initialState = {
    // initializing state to object from local storage; if it is empty, initialize to empty object
    user: localStorage.getItem('User') ? JSON.parse(localStorage.getItem('User')) : {},
    showModal: false,
    clickedDate: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SUBSCRIBE_USER':
            return {
                ...state,
                user: action.payload
            }

        case 'UNSUBSCRIBE_USER':
            return {
                ...state,
                user: {}
            }

        case 'TOGGLE_MODAL':
            return {
                ...state,
                showModal: !action.payload
            }

        case 'GET_CLICKED_DATE':
            return {
                ...state,
                clickedDate: action.payload
            }

        case 'ANNUL_CLICKED_DATE':
            return {
                ...state,
                clickedDate: ''
            }

        default:
            return state
    }
}

export default reducer