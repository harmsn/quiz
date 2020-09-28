import React from 'react';
import '../App.css'
import {SET_CURRENT_ANSWER, SET_ERROR} from '../reducers/types.js';
//REact  material import
import { makeStyles } from '@material-ui/core/styles';
//
//CSS
const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : '20px',
        borderRadius : '4px',
        boxShadow : 'none'
    }
}));
//
const Answer = (props) => {
    let classes = ['answer'];
    let class1 = useStyles();
    const handleClick = e => {
        props.dispatch({
            type: SET_CURRENT_ANSWER,
            currentAnswer: e.target.value,
        });
        props.dispatch({type: SET_ERROR, error: ''});
    };

    if (props.selected) {
        classes.push('selected');
    }
    return (
        <button
            value={props.letter}
            className={class1.root}
            onClick={handleClick}>
            <span>{props.letter}.</span> {props.answer}
        </button>
    );
}
export default Answer;