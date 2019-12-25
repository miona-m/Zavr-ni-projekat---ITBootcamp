import React,  { useState } from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import './layout/layout.css'

import { BrowserRouter as Router } from 'react-router-dom'
import Content from './layout/Content';

const App = () => {
  const [user,setUser] = useState()
  return (
    <>
    <Router>
      <Header user={user} logedIn={user} setUser={setUser}/>
      <Content setUser={setUser} user={user}/>
      <Footer />
    </Router>
    </>
  )
}

export default App;
