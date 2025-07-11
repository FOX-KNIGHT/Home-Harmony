import React from 'react';
import Background from './Component/Background/Background.jsx';
import Hero from './Component/Hero/Hero.jsx';
import About from './Component/About/About.jsx';
import Model from './Component/Model/Model.jsx';
import Find from './Component/Find/Find.jsx';
import Shop from './Component/Shop/Shop.jsx';
import Footer from './Component/Footer/Footer.jsx';
import C911 from './Component/C911/C911.jsx';
import './App.css';


function App() {
  return (
    <div className="app">
      <div className="container">
        <Background />
        <Hero />
        <Find />
        <Model />
        <About />
        <Shop />
        <Footer />
      </div>
    </div>
  );
}


export default App;