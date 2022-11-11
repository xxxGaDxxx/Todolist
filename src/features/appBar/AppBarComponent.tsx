import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import {authSelectors} from '../Auth';
import {logoutTC} from '../Auth/reducer/auth-reducer';
import {selectStatus} from '../../app/selectors';
import {Box} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import {useAppSelector} from '../../common/hoks/UseAppSelector';
import {useAppDispatch} from '../../common/hoks/UseAppDispatch';


export const AppBarComponent = () => {
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)

  const dispatch = useAppDispatch()

  const isLoading: boolean = status === 'loading';


  const logOutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{margin: '0 0 0 auto'}}>
            {!isLoggedIn ? <span>Welcome to todo list app</span> : <span>Todolists</span>}
          </Typography>

          {isLoggedIn &&
						<Button sx={{margin: '0 0 0 auto', border: '1px solid white'}} color="inherit"
						        onClick={logOutHandler}>Logout</Button>}
        </Toolbar>

        <LinearProgress color={'secondary'}
                        sx={{visibility: isLoading ? 'visible' : 'hidden', textAlign: 'center'}}/>
      </AppBar>
    </Box>
  );
};
