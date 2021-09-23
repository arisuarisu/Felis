import React, { useState } from 'react';
import { Row, Col, Card, Form, Input, Select, Button, Typography } from 'antd';
import { Redirect } from "react-router-dom";
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { useDispatch, useSelector } from 'react-redux';
import {
    setRole,
    selectVisible
  } from './rolechoiceSlice';
  const { Option } = Select;
const { Title } = Typography;

const url='https://res.cloudinary.com/dazg4q7xb/image/upload/v1629038022/';
const png='.png';
const defaultcaturl='https://res.cloudinary.com/dazg4q7xb/image/upload/v1629038022/egyptian_koqfxf.png';
const defaultcatname='Jasper';
const defaultownerurl='https://res.cloudinary.com/dazg4q7xb/image/upload/v1629038022/woman2_eo5oig.png';
const defaultownername='Rihanna';

export function Rolechoice() {
    const dispatch = useDispatch();
    const visibleRolechoice = useSelector(selectVisible);
    let {jwtPayload} = useSessionContext();
    let role = jwtPayload.role;
    const [catname, setCatname] = useState('');
    const [catrace, setCatrace] = useState('Egyptian Mau');
    const [catgender, setCatgender] = useState('');
    const [ownername, setOwnername] = useState('');
    const [occupation, setOccupation] = useState('programmer');
    
    const cat = {"Birman": {name: 'Anabela', img: 'birman_luajd9'},
                  "British shorthair": {name: 'Charlie', img: 'british_f0ggyf'},
                  "Egyptian Mau": {name: 'Jasper', img: 'egyptian_koqfxf'},
                  "Maine Coon": {name: 'Castor', img: 'mainecoon_mcrkfi'},
                  "Norwegian Forest Cat": {name: 'Bella', img: 'norwegian_sug0mk'}}

    const owner = {"programmer": {name: 'Rihanna', img: 'woman2_eo5oig', description: 'You are always home with cats because working home office.', room: 'room11_nt9jmm'}, 
                   "postman": {name: 'Jeff', img: 'man2_whznun', description: 'You are in the space now what you somehow can afford from a postman salary.', room: 'room3_u15bou'}, 
                   "rocket builder": {name: 'Elon', img: 'elon2_tyhdyp', description: 'You have a small house.', room: 'room2_bevhgc'}, 
                   "doctor": {name: 'House', img: 'doctor_t1bgot', description: 'You have a big house for many cats.', room: 'room41_cy8gny'}}

    const setOwner = ()=>{
      if(ownername && occupation){
        dispatch(setRole({role: 'owner', ownername: ownername, occupation: occupation, img: owner[occupation].img, room: owner[occupation].room}));
      }
    }

    const setCat = ()=>{
      if(catname && catrace && catgender){
        dispatch(setRole({role: "cat", catname: catname, catrace: catrace, catgender: catgender, img: cat[catrace].img}));
      }
    }
    
    if(visibleRolechoice === true){
        if (role === undefined) {
            return (
                  <>
                  <Title level={1} style={{textAlign: 'center', paddingTop: '40px'}}>Welcome to Feline information system!</Title>
                  <Title level={5} style={{textAlign: 'center', paddingBottom: '40px'}}>Here, you can save and edit informations about your stays, items and friends as a cat or an owner. Please, choose cat, because owner is not implemented yet.</Title>
                    <Row gutter={[24, 24]} justify="space-around">
                        <Col>
                            <Card bordered={true} hoverable style={{ width: 350 }} cover={<img
                                alt={catrace ? cat[catrace].name : defaultcatname}
                                src={catrace ? url + cat[catrace].img + png : defaultcaturl}/>}>
                            <Form name="basic" labelCol={{ span: 8, }} wrapperCol={{ span: 16, }} initialValues={{ remember: true, }}>
                                <Form.Item label="Nickname" name="nickname" rules={[{
                                      required: true,
                                      message: 'Please input your nickname!',},]}>
                                    <Input placeholder={catrace ? cat[catrace].name : defaultcatname} onChange={(e) => setCatname(e.target.value)}></Input>
                                </Form.Item>

                                <Form.Item name="race" label="Race" rules={[{required: true,},]}>
                                  <Select onChange={(e) => setCatrace(e)} placeholder="Select a race" allowClear>
                                    <Option value="Birman">Birman</Option>
                                    <Option value="British shorthair">British shorthair</Option>
                                    <Option value="Egyptian Mau">Egyptian Mau</Option>
                                    <Option value="Maine Coon">Maine Coon</Option>
                                    <Option value="Norwegian Forest Cat">Norwegian Forest Cat</Option>
                                  </Select>
                                </Form.Item>

                                <Form.Item name="gender" label="Gender" rules={[{ required: true,},]}>
                                  <Select onChange={(e) => setCatgender(e)} placeholder="Select a gender" allowClear>
                                    <Option value="male">male</Option>
                                    <Option value="female">female</Option>
                                  </Select>
                                </Form.Item>
                              </Form>
                              <Button type='primary' block onClick={setCat}>CHOOSE CAT</Button>
                          </Card>
                      </Col>
                      <Col>
                          <Card bordered={true} hoverable style={{ width: 350 }} cover={
                            <img alt={occupation ? owner[occupation].name : defaultownername}
                                  src={occupation ? url + owner[occupation].img + png : defaultownerurl}/>}>
                            <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} initialValues={{ remember: true, }}>
                                <Form.Item label="Nickname" name="nickname" rules={[{required: true, message: 'Please input your nickname!',},]}>
                                    <Input placeholder={occupation ? owner[occupation].name : defaultownername} onChange={(e) => setOwnername(e.target.value)}/>
                                </Form.Item>

                                <Form.Item name="occupation" label="Occupation" rules={[{required: true,},]}>
                                  <Select onChange={(e) => setOccupation(e)} placeholder="Select an occupation" allowClear>
                                    <Option value="programmer">programmer</Option>
                                    <Option value="postman">postman</Option>
                                    <Option value="rocket builder">rocket builder</Option>
                                    <Option value="doctor">doctor</Option>
                                  </Select>
                                </Form.Item>

                                <Form.Item label="Description" name="description">
                                    <p style={{position: 'relative', top: '5px'}}>{occupation ? owner[occupation].description : owner['programmer'].description}</p>
                                </Form.Item>
                                
                                <Button type='primary' htmlType="submit" block onClick={setOwner}>CHOOSE HUMAN</Button>
                              
                              </Form>
                            </Card>
                        </Col>
                  </Row>
                  </>
                    );
            }
        else{
            return(
                <><Redirect to="/dashboard"/></>
            );
        }
    }else{
        return(
            <><Redirect to="/dashboard"/></>
        );
    }
}