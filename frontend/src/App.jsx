import Article from './pages/article';
import Generate from './pages/Generate';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <section className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />

          <Route path="/article" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </section>
  );
}

export default App;
