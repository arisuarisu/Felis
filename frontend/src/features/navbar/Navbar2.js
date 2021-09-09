import React, { useState } from "react";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { Row, Col, Menu,  Layout, Avatar, Image, Typography, Divider } from 'antd';
import { NavLink, Redirect } from  "react-router-dom";
import { useSelector } from 'react-redux';
import {
  selectRole,
  selectMe
} from '../rolechoice/rolechoiceSlice';
const { Header } = Layout;
const { Title } = Typography;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

async function onLogout () {
  await signOut();
  window.location.href = "/";
}

const url='https://res.cloudinary.com/dazg4q7xb/image/upload/v1629038022/';
const png='.png';

export function Navbar2() {

  const [current, setCurrent] = useState('mail');
  const role = useSelector(selectRole);
  const me = useSelector(selectMe);

  if(role==='cat' || role==='owner') {  
    return (
        <Header>
          <Row>
            <Col span={12}>
              <Title style={{color: 'white', lineHeight: '64px'}}>Felis</Title>  
            </Col>
      <Col span={12}> 
      <Row justify="end">
        <Col>
      <Menu onClick={e => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal" theme="dark">
        <SubMenu title={<><b>{me.level}</b><Divider type="vertical" />{me.points}<Divider type="vertical" />{me.nickname+'  '}<Avatar size="large" src={<Image src={url+me.img+png} />}/></>} >
          
            {role==='cat'?
            <MenuItemGroup>
            <Menu.Item key="setting:1">
              <NavLink to="/dashboard" >Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item key="setting:2">
              <NavLink to="/accomodation" >Accommodation</NavLink>
            </Menu.Item>

            <Menu.Item key="setting:3">
              <NavLink to="/catfriends" >Catfriends</NavLink>
            </Menu.Item>
            <Menu.Item key="setting:4">
              <NavLink to="/catshop" >Catshop</NavLink>
            </Menu.Item>

            <Menu.Item key="logout" onClick={onLogout}>Logout</Menu.Item>
          </MenuItemGroup>
            :
            <MenuItemGroup>
            <Menu.Item key="setting:1">
              <NavLink to="/dashboard" >Dashboard</NavLink>
            </Menu.Item>
            <Menu.Item key="setting:2">
        <NavLink to="/appartment" activeClassName="selected">
          Appartment
          </NavLink>
        </Menu.Item>

        
        <Menu.Item key="setting:3">
        <NavLink to="/cats" activeClassName="selected">
          Cats
          </NavLink>
        </Menu.Item>

        
        <Menu.Item key="setting:4">
        <NavLink to="/shelters" activeClassName="selected">
            Shelters
            </NavLink>
        </Menu.Item>
            
            <Menu.Item key="setting:5">
              <NavLink to="/catshop" >Catshop</NavLink>
            </Menu.Item>

            <Menu.Item key="logout" onClick={onLogout}>Logout</Menu.Item>
          </MenuItemGroup>}
        </SubMenu>
      </Menu>
      </Col>
      </Row>  
      </Col>
      </Row>
      </Header>
     );
    } 
    else{
      return(
        <>
        {/* <Redirect to="/"/> */}
        </>
      );
    }      
}