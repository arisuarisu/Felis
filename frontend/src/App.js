import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from  "react-router-dom";

import './App.css';
import { Layout } from 'antd';
import { Navbar2 } from './features/navbar/Navbar2';
import { Homescreen } from './features/homescreen/Homescreen';
import { Rolechoice } from './features/rolechoice/Rolechoice';
import { Getrole } from './features/rolechoice/Getrole';
import { Dashboard } from './features/dashboard/Dashboard';
import { Catshop } from './features/catshop/Catshop';
import { Accomodation } from './features/accomodation/Accomodation';
import { Catfriends } from './features/catfriends/Catfriends';

import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword, {EmailPasswordAuth} from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import axios from "axios";
const { Content, Footer } = Layout;
Session.addAxiosInterceptors(axios);

const fontFamily = {fontFamily: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, \'Noto Color Emoji\''}

const style = {style: {  
    container: {borderRadius: 0, ...fontFamily},
    divider: {color: 'white', display: 'none'},
    label: {color: 'white', display: 'none', ...fontFamily},
    inputContainer: {borderRadius: 0, ...fontFamily}, 
    inputWrapper: {borderRadius: 0, border: '1px solid #434343', ...fontFamily},
    inputError: {borderRadius: 0, ...fontFamily},                  
    button: {borderRadius: 0, ...fontFamily},                  
    }
}

SuperTokens.init({
    appInfo: {
        appName: "felis",
        apiDomain: "http://localhost:3000",
        websiteDomain: "http://localhost:3000"
    },
    recipeList: [
        EmailPassword.init({
            palette: {
                primary: '#642ab5',
                error: '#f59842',
                background: '#141414',
                inputBackground: '#141414',
                textTitle: 'white',
                textLabel: 'white',
                textInput: 'white',
                textLink: 'white'
            },
            signInAndUpFeature: {
                disableDefaultImplementation: true,
                signUpForm: {                    
                    ...style
                },
                signInForm: {                    
                    ...style
                },
            },
            resetPasswordUsingTokenFeature: {                
                enterEmailForm: {                    
                    ...style            
                },
                submitNewPasswordForm: {                    
                    ...style               
                }             
            },
            emailVerificationFeature: {                
                sendVerifyEmailScreen: {                    
                    ...style              
                },
                verifyEmailLinkClickedScreen: {                    
                    ...style               
                }             
            },
            getRedirectionURL(context) {
                if (context.action === "SUCCESS") {
                    return context.redirectToPath === undefined ? "/dashboard" : context.redirectToPath;
                
                }
            }
        }
        ),
        Session.init()
    ]
});                         

function App() {

    return (
        <>
      <Router> 
      <Layout className="layout">
          <Navbar2 />
          <Content style={{ padding: '0 50px' }}>
                <Switch>
                {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}
               
                    <Route exact path="/">
                        
                        <Homescreen />
                        </Route>
                    
                        <Route exact path="/dashboard">
                        <EmailPasswordAuth>
                            <Dashboard />
                            </EmailPasswordAuth> 
                        </Route>
                        <Route exact path="/setup">
                            <EmailPasswordAuth>
                            <Rolechoice />
                            </EmailPasswordAuth>    
                        </Route>
                        <Route exact path="/getrole">
                            <EmailPasswordAuth>
                            <Getrole />
                            </EmailPasswordAuth>    
                        </Route>
                        <Route exact path="/me">
                            <EmailPasswordAuth>
                            <Dashboard />
                            </EmailPasswordAuth>    
                        </Route>
                        <Route exact path="/accomodation">
                            <EmailPasswordAuth>
                            <Accomodation />
                            </EmailPasswordAuth>    
                        </Route>
                        <Route exact path="/catshop">
                        <EmailPasswordAuth>
                            <Catshop />
                            </EmailPasswordAuth> 
                           </Route>
                        <Route exact path="/catfriends">
                        <EmailPasswordAuth> 
                           <Catfriends />
                           </EmailPasswordAuth>    
                        </Route>   
                        {/* <Route exact path="/appartment">
                            <EmailPasswordAuth>
                            </EmailPasswordAuth>    
                        </Route>
                        <Route exact path="/cats">
                            <EmailPasswordAuth>
                            </EmailPasswordAuth>    
                        </Route>
                        <Route exact path="/shelters">
                            <EmailPasswordAuth>
                            </EmailPasswordAuth>    
                        </Route> */}
                        <Route path="*">
                            <Redirect to="/dashboard"/>
                         </Route>
                 </Switch>
                 </Content>
                 <Footer style={{ textAlign: 'center' }}>Kittun Inc. ©2021</Footer>
                 </Layout>
            </Router>
      </>
  );
}

export default App;
