import React, { useState } from "react";
//import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { signOut } from "supertokens-auth-react/recipe/emailpassword";
import { Row, Col, Menu, Button } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { NavLink } from  "react-router-dom";
import { useSelector } from 'react-redux';
import {
  selectRole
} from '../rolechoice/rolechoiceSlice';

//const { SubMenu } = Menu;

// handleClick = e => {
//   //console.log('click ', e);
//   this.setState({ current: e.key });
// };
async function onLogout () {
  await signOut();
  window.location.href = "/";
}

export function Navbar() {

  const [current, setCurrent] = useState('mail');

            //let {jwtPayload} = useSessionContext();
            //let role = jwtPayload.role;
            const role = useSelector(selectRole);
            if (role === "owner") {
                  
    return (
      <Menu onClick={e => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal">
        
        <Menu.Item key="me" icon={<MailOutlined />}>
        <NavLink to="/me" activeClassName="selected">
          Me
          </NavLink>
        </Menu.Item>

        
        <Menu.Item key="appartment" icon={<AppstoreOutlined />}>
        <NavLink to="/appartment" activeClassName="selected">
          Appartment
          </NavLink>
        </Menu.Item>

        
        <Menu.Item key="cats" icon={<AppstoreOutlined />}>
        <NavLink to="/cats" activeClassName="selected">
          Cats
          </NavLink>
        </Menu.Item>

        
        <Menu.Item key="shelters" icon={<AppstoreOutlined />}>
        <NavLink to="/shelters" activeClassName="selected">
            Shelters
            </NavLink>
        </Menu.Item>

        <Menu.Item key="logout" icon={<AppstoreOutlined />}>
        <Button type="link" onClick={onLogout}>Logout</Button>
        </Menu.Item>
      </Menu>
     );
            } else if (role === "cat"){
              return (
                <Row>
                  <Col span={20}>
                <Menu onClick={e => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal">
                  <Menu.Item key="me" icon={<MailOutlined />}>
                  <NavLink to="/me" activeClassName="selected">
                    Me
                  </NavLink>
                  </Menu.Item>

                  <Menu.Item key="accomodation" icon={<AppstoreOutlined />}>
                  <NavLink to="/accomodation" activeClassName="selected">
                    Accomodation
                    </NavLink>
                  </Menu.Item>

                 
                  <Menu.Item key="catfriends" icon={<AppstoreOutlined />}>
                  <NavLink to="/catfriends" activeClassName="selected">
                    Catfriends
                    </NavLink>
                  </Menu.Item> 

                  
                  <Menu.Item key="catfamily">
                  <NavLink to="/catfamily" activeClassName="selected">
                    Catfamily
                    </NavLink>
                  </Menu.Item>

                  
                  <Menu.Item key="catshop" icon={<AppstoreOutlined />}>
                  <NavLink to="/catshop" activeClassName="selected">
                    Catshop
                    </NavLink>
                  </Menu.Item>
                  </Menu>
                  </Col>
                  
                  <Col span={4}>
                  <Menu>
                  <Menu.Item key="logout" icon={<AppstoreOutlined />}>
                  <Button type="link" onClick={onLogout}>Logout</Button>
                  </Menu.Item>
                </Menu>
                </Col>
                </Row>
               );
            }
            else{
              // return(
              //   <Menu onClick={e => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal">
              //     <Menu.Item key="mail" icon={<MailOutlined />}>
              //       Something
              //     </Menu.Item>
              //     <Button type="link" onClick={onLogout}>Logout</Button>
              //   </Menu>
              // );
              return(
                <></>
              );
            }
}