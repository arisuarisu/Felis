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
  selectRequested,
  //selectPending
  } from './catfriendsSlice';
import { Card, Col, Row, Button, Form, Input, Typography } from 'antd';
const { Search } = Input;
//const Search = Input.Search;
const { Title } = Typography;

const url='https://res.cloudinary.com/dazg4q7xb/image/upload/v1629038022/';
const png='.png'

export function Catfriends() {
  const [searchValue, setSearchValue] = useState('');
  const searchlist = useSelector(selectSearchCatfriends);//[{id: 1, name: 'Alice', race: 'Birman', points: 3000}, {id: 2, name: 'Cori', race: 'British shorthair', points: 250000}]
  const requestedlist = useSelector(selectRequested);
  //console.log(typeof(requestedlist[0].id), "tlacim typ idcka")
  const catfriendslist = useSelector(selectCatfriends);
  const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchRequestedCatfriends())
      dispatch(fetchCatfriends())
    },[dispatch]);

    useEffect(() => {
      console.log("vypisujem searchValue", searchValue)
      if(searchValue!==''){
        dispatch(searchCatfriends({name: searchValue}))
      }
    },[searchValue]);

    // const search = e => {
    //   console.log(e, showSearch)
    //   if(e===''){
    //     setShowSearch(false, console.log(showSearch, "vypisujem showsearch"))
    //     console.log(e, showSearch)
    //   }
    //   else{
    //     setShowSearch(true)
    //     dispatch(searchCatfriends({string: e}))
    //     console.log(e, showSearch)
    //   }
    // }

    const search = ()=>{
      dispatch(searchCatfriends({name: searchValue}))
    }

    // const approveCatfriend= ()=>{
      
    // }

    // const requestCatfriend = ()=>{
      
    // }

    // const cancelCatfriend = ()=>{
      
    // }

  return (

<Row gutter={[24, 24]} style={{paddingTop: '15px', paddingBottom: '15px'}}>
<Title level={2} style={{width: '100%', textAlign: 'center'}}>Friends</Title>
{/* <Form>
<Form.Item name="search">
  <Input placeholder="Find new friends here" size="large" onChange={(e) => {setSearchValue(e.target.value)}} style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', paddingBottom: '15px'}}></Input>
</Form.Item>
<Button type="primary" onClick={search}>Search friends</Button>
</Form> */}
<Search placeholder="Find new friends here" value={searchValue} size="large" onChange={(e) => {setSearchValue(e.target.value)}} style={{width: '80%', marginLeft: 'auto', marginRight: 'auto', paddingBottom: '15px'}} onSearch={search} enterButton />
  {//showSearch || requestedlist && catfriendslist ?
  searchValue!=='' ?
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