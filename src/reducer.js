/**
 * Created by mat613 on 01/12/2016.
 */

import {combineReducers} from 'redux'

function reducer (state=[], action){
    switch (action.type){
        case 'ADD_SQUARE':
            return [...action.value];
        case'CLEAR':
            return [];
        default:
            return state;
    }
}

export default combineReducers({reducer:reducer});
