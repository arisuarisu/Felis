import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectCosmonauts,
    fetchCosmonauts
  } from './cosmoSlice';
  import { Newcosmo } from './Newcosmo';
import { Card, Col, Row } from 'antd';

export function Cosmonauts() {
  const cosmolist = useSelector(selectCosmonauts);
  const dispatch = useDispatch();
   
  useEffect(() => {
          dispatch(fetchCosmonauts())},[dispatch]);

  return (
      <Row gutter={16} type="flex" style={{paddingTop: "10px", paddingBottom: "10px"}}>
        <Col span={6}>
          <Newcosmo />
        </Col>
    {cosmolist.map((person) => (
      <Col span={6}>
        <Card hoverable key={person.id} bordered={true}>
            <p>{person.firstname}</p>
            <p>{person.lastname}</p>
            <p>{person.superpower}</p>
            <p>{person.dateofbirth}</p>
        </Card>
    </Col>
    ))}
    </Row>);
}