// import Article from './pages/article';
import Generate from './pages/Generate';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';


import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <section className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>

          {/* <Route path="/article" element={<Article />} /> */}
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
