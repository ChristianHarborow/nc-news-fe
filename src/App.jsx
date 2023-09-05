import './App.css'
import { Routes, Route } from 'react-router-dom';
import ArticlesPage from './components/articles_page/ArticlesPage';
import ViewArticlePage from './components/view_article_page/ViewArticlePage';

function App() {

  return (
    <>
      <h1 id='title'>NC|News</h1>
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/article/:article_id" element={<ViewArticlePage />} />
      </Routes>
    </>
  )
}

export default App
