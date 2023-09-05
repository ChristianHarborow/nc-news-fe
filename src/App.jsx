import './App.css'
import { Routes, Route } from 'react-router-dom';
import ArticlesPage from './components/ArticlesPage';

function App() {

  return (
    <>
      <h1>NC|News</h1>
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
      </Routes>
    </>
  )
}

export default App
