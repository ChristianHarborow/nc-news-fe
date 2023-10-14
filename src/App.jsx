import './App.css'
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import ArticlesPage from './components/articles_page/ArticlesPage';
import ViewArticlePage from './components/view_article_page/ViewArticlePage';
import CreateArticlePage from './components/create_article_page/CreateArticlePage';
import { Fade, Alert, Typography } from '@mui/material';
import { ErrorContext } from "./contexts/ErrorContext"
import { useContext, useEffect } from 'react';

function App() {
  const {error, setError} = useContext(ErrorContext)
  const location = useLocation()

  function fadeError() {
    setTimeout(() => {
      setError((currError) => {
        const newError = {...currError}
        newError.show = false
        return newError
      })
    }, 2000);
  }

  function InvalidPathWrapper({children}) {
    useEffect(() => {
      setError(currError => {
        const newError = {...currError}
        newError.msg = `Could not find path: ${location.pathname}`
        newError.show = true
        return newError
    })
    }, []);
    return children;
  }

  return (
    <>
      <Link to="/" id='title-link'><Typography id='title'><span>NC|</span>News</Typography></Link>
      <Routes>
        <Route path="/" element={<Navigate to="/articles" replace={true} />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/create-article" element={<CreateArticlePage />} />
        <Route path="/article/:article_id" element={<ViewArticlePage />} />
        <Route path="*" element={
          <InvalidPathWrapper>
              <Navigate to="/articles" replace={true} />
          </InvalidPathWrapper>
        }/>
      </Routes>
      <Fade className='alert' in={error.show} timeout={{enter: 1000, exit: 2000}} addEndListener={fadeError}>
        <Alert className='alert' severity='error'>{error.msg}</Alert>
      </Fade>
    </>
  )
}

export default App
