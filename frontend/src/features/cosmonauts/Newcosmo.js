import React, { useState } from 'react'; //, useEffect
import { useDispatch } from 'react-redux';
//import {
//    fetchNewcosmo
//  } from './cosmoSlice';
import {
    addNewcosmo
  } from './cosmoSlice';
import { Card, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// import { Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber } from 'antd';
// const { Option } = Select;
// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 5,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 12,
//     },
//   },
// };

export function Newcosmo() {
  const dispatch = useDispatch();
  //const [firstname, setFirstname] = useState('');
  //const [lastname, setLastname] = useState('');
  //const [superpower, setSuperpower] = useState('');
  //const [date, setDate] = useState('');
  const [formdisplayed, setFormdisplayed] = useState(false);
  const form = () => setFormdisplayed(!formdisplayed);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [superpower, setSuperpower] = useState('');
  const [birthdate, setBirthdate] = useState('');

  //useEffect(() => {
          //dispatch(fetchNewcosmo())},[dispatch]);

    const addnewcosmo = () => {
        dispatch(addNewcosmo({firstname: firstname, lastname: lastname, superpower: superpower, birthdate: birthdate }));
        console.log(firstname, lastname, superpower, birthdate)
        //setFormdisplayed(!formdisplayed);
    }

  if (!formdisplayed) {
    return (
        <>
        <Card bordered={true}>
        <Button onClick={form} >Add cosmo</Button>
        <PlusCircleOutlined />
        </Card>
        </>
        )}
        else{
            return(
                <>        
        <Card bordered={true}>
        
            <input type="text" placeholder="firstname" onChange={event => setFirstname(event.target.value)} />
            <input type="text" placeholder="lastname" onChange={event => setLastname(event.target.value)} />
            <input type="text" placeholder="superpower" onChange={event => setSuperpower(event.target.value)} />
            <input type="text" placeholder="date of birth" onChange={event => setBirthdate(event.target.value)} />
            <Button onClick={addnewcosmo} >Save cosmo</Button>
        </Card>
        </>)
        }
}