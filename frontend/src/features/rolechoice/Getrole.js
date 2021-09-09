import React, {  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
//import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import {
    getRole,
    selectGetrolefulfilled
  } from './rolechoiceSlice';
  //import { Newcosmo } from './Newcosmo';
  //import fetchCosmonauts from './cosmoSlice';
//import { Card, Col, Row } from 'antd';

export function Getrole() {
    //console.log("getrole first console log")
  const fulfilled = useSelector(selectGetrolefulfilled);
  //console.log(fulfilled, "fulfilled")
  //let {jwtPayload} = useSessionContext();
   // let role = jwtPayload.role;
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getRole());
    }, [dispatch]);

//   componentDidMount(){
//     dispatch(getRole());
//   }

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