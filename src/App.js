import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import TranslationDemo from './components/TranslationDemo';
import Upload from './components/Upload';
import Footer from './components/Footer';
import AboutUs from './components/aboutus';
import ContactUs from './components/contact'

function App() {
  return  (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<TranslationDemo />} />
          <Route path="/translator" element={<Upload />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        
      </div>
      <Footer />
    </Router>
  );
}

export default App;