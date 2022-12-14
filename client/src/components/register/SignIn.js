import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const cookies = new Cookies();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const { email, password } = user;

  const [ checker, setChecker ] = useState(false);

  const onInputChange = e => {
      setUser({...user, [e.target.name]: e.target.value});
  }

  const onSubmit = async e => { 
      e.preventDefault();
      if(checker){
          try{
              await axios.post('http://localhost:5000/auth/find/', user).then((res) => {
                // cookies.set("token", res.data.data);
                cookies.set("designation", res.data.data);
                window.location = ("/section");
              })
                      
          }catch(error){
              if(error.response &&
                  error.response.status >= 400 && 
                  error.response.status <= 500
                  ){
                      toast.error(error.response.data.message);
              }
          }
      }
  }

  function setFunc(){
      formValidation();
      getData();
  }

const getData = async () => {
    await axios.post('http://localhost:5000/auth/findname/' + email).then((data) => {
      cookies.set("_id", data.data.data);
    })    
}

const formValidation = () =>{

    if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
        toast.error("Please insert valid E-mail");
        setChecker(false);
    }  
    else if(password === ""){
        toast.error("Please Insert Password");
        setChecker(false);
    }      
    else{
        setChecker(true);
    }
}

  return (
    <div className='asxasxas'>
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer style={{ width: "450px", textAlign: 'center', fontSize: '17px', fontFamily: 'fantasy' }}
                    position="top-center"
                    theme='light'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    limit={1}
                />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Customer Sign in
        </Typography>
        <form onSubmit={ e => onSubmit(e)} className={classes.form} noValidate>
          <TextField variant="outlined" margin="normal" required fullWidth label="Email Address" name="email" value={email} onChange={ e => onInputChange(e)}
              autoComplete="email" autoFocus/>

          <TextField variant="outlined" margin="normal" required fullWidth name="password" value={password} label="Password" type="password" onChange={ e => onInputChange(e)}
             autoComplete="current-password"/>

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"/>
          
          <Button
            type="submit" onClick={setFunc} fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/manager-signin" variant="body2">
                Manager SignIn
              </Link>
            </Grid>
            <Grid item>
              <Link href="/section/customer" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
    </div>
  );
}