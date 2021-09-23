import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectShopitems,
    selectMyshopitems,
    fetchCatshopitems,
    buyItem
  } from './catshopSlice';
import { Card, Col, Row, Button, Avatar } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;
const { Meta } = Card;

const url='https://res.cloudinary.com/dazg4q7xb/image/upload/v1629038022/';
const png='.png'

export function Catshop() {
  const shopitemlist = useSelector(selectShopitems);
  const myshopitemlist = useSelector(selectMyshopitems);
  const dispatch = useDispatch();

  useEffect(() => {
          dispatch(fetchCatshopitems())},[dispatch]);

  return (
    <>
    <Title level={2} style={{width: '100%', textAlign: 'center', paddingTop: '15px'}}>Catshop</Title>
    <Row gutter={[24, 24]} >
      
      <Col xs={{span: 24, order: 2}} sm={{span: 12, order: 1}} md={16} lg={18}>
        <Row gutter={[24, 24]} type="flex">
          {shopitemlist.map((item) => (
            <Col xs={24} sm={24} md={12} lg={8} style={{alignSelf: 'stretch'}}>
              <Card hoverable key={item.name} style={{height: '100%'}} bordered={true} cover={
                <img alt={item.name} src={url + item.img + png} />}>
                  <Title level={5}>{item.name}</Title>
                  <p>{item.description}</p>
                  <p><b>PRICE:</b> {item.price}</p>
                  <p><b>PIECES:</b> {item.pieces}</p>
                  <Button block type="primary" onClick={() => {dispatch(buyItem({name: item.name}))}}>BUY</Button>
              </Card>
            </Col>))}
        </Row>
      </Col>

      <Col xs={{span: 24, order: 1}} sm={{span: 12, order: 2}}  md={8} lg={6}>
        <Card>
        <Title level={4} style={{paddingLeft: '11px'}}>My Items</Title>
        {myshopitemlist.map((item) => (
          <Col span={24}>
            <Card style={{width: '100%'}}>
              <Meta avatar={<Avatar size="large" src={url + item.img + png} />}
                title={item.name}
                description={item.description} />
            </Card>
          </Col>))}
        </Card>
      </Col>

    </Row>
    </>);
}