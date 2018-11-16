import { ISLOADING, GET_USERS_LIST } from '../constants/action-types';
const getInitialState = () => ({
    users: [],
    isLoading: false,
  });
const userReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case ISLOADING:
            return { ...state, isLoading: action.isLoading };
        case GET_USERS_LIST:
            return { ...state, users: action.users };
        default:
            return state;
    }
}
export default userReducer;