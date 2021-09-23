import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Avatar, Divider } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from "react-router-dom";
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import {
    setReduxRole,
    getMe,
    selectMe
  } from '../rolechoice/rolechoiceSlice';
  import {
    fetchMyCatshopitems,
    selectMyshopitems
  } from '../catshop/catshopSlice';
import {
    getMyActiveStay,
    selectActive,
    cancelStay
  } from '../accomodation/accomodationSlice';
  import {
    fetchCatfriends,
    selectCatfriends
  } from '../catfriends/catfriendsSlice';

const { Meta } = Card;
const url='https://res.cloudinary.com/dazg4q7xb/image/upload/v1629038022/';
const defaultroom = 'room1_syir27';
const png='.png'

export function Dashboard() {
    const dispatch = useDispatch();
    const myItems = useSelector(selectMyshopitems);
    const me = useSelector(selectMe);
    const active = useSelector(selectActive);
    const catfriends = useSelector(selectCatfriends);
    let {jwtPayload} = useSessionContext();
    let role = jwtPayload.role;

    useEffect(() => {
        dispatch(fetchMyCatshopitems());
        dispatch(getMyActiveStay());
        dispatch(fetchCatfriends());
        dispatch(getMe());
    }, [dispatch]);
    
            if (role !== 'cat' && role !== 'owner' ) {
                return(
                    <><Redirect to="/getrole"/></>
                );
            }
        else{
            dispatch(setReduxRole(role));
            return (
                <Row gutter={[24, 24]} type="flex">

                    <Col xs={{span: 24, order: 1}} md={{span: 12, order: 1}} lg={{order: 1, span: 6}}>
                        <Card title="Me" bordered={false} cover={
                            <img alt={me.nickname} src={url+me.img+png} />}>
                            {role==='cat' && <>{me.nickname}<Divider type="vertical" />{me.race}<Divider type="vertical" />{me.gender}</>}
                            {role==='owner' && <>{me.nickname}<Divider type="vertical" />{me.occupation}</>}
                        </Card>
                        <Card bordered={false} style={{marginTop: '20px'}}>
                            <div style={{width: '100%', overflow: 'scroll'}}>Friends: 
                            {catfriends.map((friend) => (<Avatar size="large" src={url + friend.img + png} />))}
                            </div>
                        </Card>
                    </Col>
                    
                    <Col xs={{span: 24, order: 3}} md={{span: 24, order: 3}} lg={{order: 2, span: 12}}>
                        {role==='cat' && 
                        <Card title="Accommodation" bordered={false} cover={
                            <img alt="My room"
                                src={active ? url + active.img + png :  url + defaultroom + png }
                                style={active ? null : { opacity: '0.2' }}/>}>
                            <Row> 
                            {!active && <Col span={12} offset={12}><Button type='primary' style={{float: 'right'}}><NavLink to="/accomodation">Book a room</NavLink></Button></Col>}
                            {active.name && <><Col span={12} style={{selfAlign: 'stretch'}}><div style={{position: 'absolute', bottom: 0}}>{active.name}</div></Col><Col span={12}><Button style={{float: 'right'}} onClick={() => {dispatch(cancelStay({id: active.id, type: active.type}))}}>CANCEL STAY</Button></Col></>}
                            {active.nickname && <><Col span={12} style={{selfAlign: 'stretch'}}><div style={{position: 'absolute', bottom: 0}}>{active.nickname+'\'s place'}</div></Col><Col span={12}><Button style={{float: 'right'}} onClick={() => {dispatch(cancelStay({id: active.id, type: active.type}))}}>CANCEL STAY</Button></Col></>}
                            </Row>
                        </Card>}

                        {role==='owner' &&
                        <Card title="My room" bordered={false} cover={
                            <img alt="My room" src={url + me.room + png} />}>
                                Tennants:
                        </Card>}
                    </Col>

                    <Col xs={{span: 24, order: 2}} md={{span: 12, order: 2}} lg={{order: 3, span: 6}}>
                        <Card title="My Items" bordered={false} >
                            <Row style={{maxHight: '200px', overflow: 'scroll'}}>
                                {myItems.map((item) => (
                                <Card style={{width: '100%'}}>
                                    <Meta avatar={<Avatar size="large" src={url + item.img + png} />}
                                        title={item.name}
                                        description={item.description} />
                                </Card>))}
                                <Button type='primary' block style={{float: 'right'}}><NavLink to="/catshop">GO TO THE SHOP</NavLink></Button>
                            </Row>
                        </Card>
                    </Col>
              </Row>
                );
        }
}