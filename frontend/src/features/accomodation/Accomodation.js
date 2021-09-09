import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Typography, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectOwners,
    selectShelters,
    selectActive,
    fetchOwners,
    fetchShelters,
    getMyActiveStay,
    setStay,
    cancelStay
  } from './accomodationSlice';
import { Redirect } from "react-router-dom";
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import './accommodation.css'
const { Title, Paragraph } = Typography;

const { Meta } = Card;

const url='https://res.cloudinary.com/dazg4q7xb/image/upload/v1629038022/';
const png='.png'

export function Accomodation() {
    const dispatch = useDispatch();
    const owners = useSelector(selectOwners);
    const active = useSelector(selectActive);
    const shelters = useSelector(selectShelters);
    let {jwtPayload} = useSessionContext();
    let role = jwtPayload.role;

    useEffect(() => {
        dispatch(fetchOwners());
        dispatch(fetchShelters());
        dispatch(getMyActiveStay());
    }, [dispatch]);

            if (role === 'cat') {
                return(
                    <>
                    <Title level={2} style={{width: '100%', textAlign: 'center', paddingTop: '15px'}}>Accommodation</Title>
                    <Row gutter={[24, 24]}>

                      <Col md={active?{span: 12, order: 1}:24}  sm={active?{span: 24, order: 2}:24}> 
                        <Title level={2} className='title'>Live with people</Title>
                        <Paragraph className='paragraph'>Find a cosy room at peoples' house</Paragraph>
                        <Row type="flex" gutter={[24, 24]}>
                          {owners.map((item) => (
                            <Col md={active? 24 : 12} sm={24}>
                              <Card hoverable key={item.id} bordered={true} cover={
                                <img alt={item.name} src={url + item.room + png} />}>
                                <p><b>OWNER:</b> {item.nickname}</p>
                                <p><b>FREE PLACES:</b> {item.max_amount_of_cats}</p>
                                <Button block type="primary" onClick={() => {dispatch(setStay({place_id: item.id, place_type: "o"}))}}>BOOK</Button>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </Col>

                      <Col md={active?{span: 12, order: 3}:24} sm={active?{span: 24, order: 3}:24}>
                        <Title level={2} className='title'>Live in shelter</Title>
                        <Paragraph className='paragraph'>Find a place amongst many cats in shelter</Paragraph>
                        <Row type="flex" gutter={[24, 24]}>
                          {shelters.map((item) => (
                            <Col md={active?24:12} sm={24}>
                              <Card hoverable key={item.id} bordered={true} cover={
                                <img alt={item.name} src={url + item.img + png} />}>
                                <p><b>SHELTER:</b> {item.name}</p>
                                <p><b>FREE PLACES:</b> {item.max_amount_of_cats}</p>
                                <Button block type="primary" onClick={() => {dispatch(setStay({place_id: item.id, place_type: "s"}))}}>BOOK</Button>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </Col>

                      {active?
                        <Col xs={{span: 24, order: 1}} md={{span: 12, order: 2}} className='sticky'>
                          <Title level={2} className='title'>My current stay</Title>
                          <Paragraph className='paragraph'>at {active.type==='o'?'human':'shelter'}</Paragraph>
                          <Row gutter={[24, 24]}>
                            <Col>
                              <Card hoverable bordered={true} cover={
                                <img alt={active.type==='o' ? active.nickname : active.name} src={url + active.img + png} />}>
                                <Meta
                                  avatar={active.type==='o'&& <Avatar src={url + active.avatar + png} size="large"/>}
                                  title={active.type==='o' ? active.nickname+'\'s place' : active.name}
                                  description={
                                    <Button block onClick={() => {dispatch(cancelStay({id: active.id, type: active.type}))}}>CANCEL</Button>}/>
                              </Card>
                            </Col>
                          </Row>
                        </Col>: null}

                    </Row>
                    </>
                );
            }
        else{
            return (
                <><Redirect to="/"/></>
                );
        }
}