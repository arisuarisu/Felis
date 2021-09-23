import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  searchCatfriends,
  fetchCatfriends,
  fetchRequestedCatfriends,
  approvecatfriend,
  requestcatfriend,
  cancelcatfriend,
  selectSearchCatfriends,
  selectCatfriends,
  selectRequested
  } from './catfriendsSlice';
import { Card, Col, Row, Button, Input, Typography } from 'antd';
const { Search } = Input;
const { Title } = Typography;

const url='https://res.cloudinary.com/dazg4q7xb/image/upload/v1629038022/';
const png='.png'

export function Catfriends() {
  const [searchValue, setSearchValue] = useState('');
  const searchlist = useSelector(selectSearchCatfriends);
  const requestedlist = useSelector(selectRequested);
  const catfriendslist = useSelector(selectCatfriends);
  const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchRequestedCatfriends())
      dispatch(fetchCatfriends())
    },[dispatch]);

    useEffect(() => {
      if(searchValue!==''){
        dispatch(searchCatfriends({name: searchValue}))
      }
    },[searchValue, dispatch]);

    const search = ()=>{
      dispatch(searchCatfriends({name: searchValue}))
    }

  return (

<Row gutter={[24, 24]} style={{paddingTop: '15px', paddingBottom: '15px'}}>
<Title level={2} style={{width: '100%', textAlign: 'center'}}>Friends</Title>
<Search placeholder="Find new friends here" value={searchValue} size="large" onChange={(e) => {setSearchValue(e.target.value)}} style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', paddingBottom: '15px'}} onSearch={search} enterButton />
  {searchValue!=='' ?
    <>{searchlist.map((item) => (
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card hoverable key={item.id} bordered={true} cover={
                <img alt={item.nickname} src={url + item.img + png} />}>
            <p>{item.nickname}</p>
            <p>{item.race}</p>
            <p>{item.points}</p>
            <Button block type="primary" onClick={() => {dispatch(requestcatfriend({id: item.id}));setSearchValue('')}}>Request friendship</Button>
        </Card>
    </Col> ))}</>:
    <>
    {requestedlist.map((item) => (
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card hoverable key={item.id} bordered={true} cover={
                <img alt={item.nickname} src={url + item.img + png} />}>
            <p>{item.nickname}</p>
            <p>{item.race}</p>
            <p>{item.points}</p>
            <Button block type="primary" onClick={() => {dispatch(approvecatfriend({id: item.id}))}}>Accept friendship</Button>
        </Card>
    </Col> ))}

    {catfriendslist.map((item) => (
      <Col xs={24} sm={12} md={8} lg={6}>
        <Card hoverable key={item.id} bordered={true} cover={
                <img alt={item.nickname} src={url + item.img + png} />}>
            <p>{item.nickname}</p>
            <p>{item.race}</p>
            <p>{item.points}</p>
            <Button onClick={() => {dispatch(cancelcatfriend({id: item.id}))}} block>Cancel friendship</Button>
        </Card>
    </Col>
    ))}
    </>}

    </Row>
   );
}