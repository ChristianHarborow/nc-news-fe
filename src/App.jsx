import './App.css'
import { Routes, Route } from 'react-router-dom';
import ArticlesPage from './components/articles_page/ArticlesPage';
import ViewArticlePage from './components/view_article_page/ViewArticlePage';
import { Fade, Alert } from '@mui/material';
import { ErrorContext } from "./ErrorContext"
import { useContext } from 'react';

function App() {
  const {error, setError} = useContext(ErrorContext)

  function fadeError() {
    setTimeout(() => {
      setError((currError) => {
        const newError = {...currError}
        newError.show = false
        return newError
      })
    }, 2000);
  }

  return (
    <>
      <h1 id='title'>NC|News</h1>
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/article/:article_id" element={<ViewArticlePage />} />
      </Routes>
      <Fade className='alert' in={error.show} timeout={{enter: 1000, exit: 1000}} addEndListener={fadeError}>
        <Alert className='alert' severity='error'>{error.msg}</Alert>
      </Fade>
    </>
  )
}

export default App
