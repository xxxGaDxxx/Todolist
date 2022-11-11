import React, {useEffect} from 'react';
import './App.css';
import Container from '@mui/material/Container';
import {ErrorSnackbar} from '../common/components/ErrorSnackbar/ErrorSnackbar';
import {Route, Routes} from 'react-router-dom';
import {Login} from '../features/Auth';
import {initializeAppTC} from './reducer/app-reducer';
import {CircularProgress} from '@mui/material';
import {selectIsInitialized} from './selectors';
import {AppBarComponent} from '../features/appBar/AppBarComponent';
import {useAppDispatch} from '../common/hoks/UseAppDispatch';
import {useAppSelector} from '../common/hoks/UseAppSelector';
import {TodolistList} from '../features/TodolistsList';


export function App() {
  const isInitialized = useAppSelector(selectIsInitialized)

  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(initializeAppTC())
  }, [dispatch])


  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }


  return (
    <div className="App">
      <AppBarComponent/>

      <Container>
        <Routes>
          <Route path="/" element={<TodolistList/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<h1>404: PAGE NOT FOUND</h1>}/>
        </Routes>
      </Container>

      <ErrorSnackbar/>
    </div>
  );
}
