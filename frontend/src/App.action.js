// import $ from 'jquery';
// import {hashHistory} from 'react-router';

export function action1(){
  console.log('entering action1 handler');
  return (dispatch) => dispatch({type: 'action1'});

}

export function action2(){
  console.log('entering action2 handler');
  return (dispatch) => dispatch({type: 'action2'});

}

export function action3(){
  console.log('entering action3 handler');
  return (dispatch) => dispatch({type: 'action3'});

}

export function action4(){
  console.log('entering action4 handler');
  return (dispatch) => dispatch({type: 'action4'});

}

export function input1Typing(event){
  console.log('entering input1Typing handler');
  return (dispatch) => dispatch({type: 'action5', payload: event.target.value});

}

export function input2Typing(event){
  console.log('entering input2Typing handler');
  return (dispatch) => dispatch({type: 'action6', payload: event.target.value});

}
