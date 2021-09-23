import React, {  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import {
    getRole,
    selectGetrolefulfilled
  } from './rolechoiceSlice';

export function Getrole() {
  const fulfilled = useSelector(selectGetrolefulfilled);
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getRole());
    }, [dispatch]);

  if(fulfilled === true){
  return (
    <><Redirect to="/setup"/></>
      );
  }
  else{
    return (
        <></>
          );
  }
}