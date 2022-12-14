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
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
}));

export default function SignUp() {
  const classes = useStyles();

  let history = useHistory();

  const [user, setUser] = useState({
    email: "",
    designation: "",
    password: "",
    rePassword: ""
  });

  const [ checker, setChecker ] = useState(false);

  const [error, setError] = useState("");

  const { email, designation, password, rePassword } = user;

  const onInputChange = e => {
      setUser({...user, [e.target.name]: e.target.value});
  }

  const onSubmit = async e => { 

    e.preventDefault();

    if(checker){
        try{
            await axios.post('http://localhost:5000/user/add/', user).then(() => {
                alert(email + " Please check your email to verify your account.");
                history.push("/signin");
            })     
        }
        catch(err){
            if(err.response && 
                err.response.status >= 400 && 
                err.response.status <= 500
                ){
                    toast.error(err.response.data.message);
            }
        }
    }
}

  const formValidation = () =>{

    if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
        toast.error("Please Insert Valid E-mail");
        setChecker(false);
    }
    else if(designation === ""){
        toast.error("Please Select Designation");
        setChecker(false);
    }
    else if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
        toast.error("Please Insert Valid Password");
        setChecker(false);
    }
    else if(rePassword === ""){
        toast.error("Please Re-Enter Your Password");
        setChecker(false);
    }
    else if(password !== rePassword){
        toast.error("Password Mismatched");
        setChecker(false);
    }
    else{
        setChecker(true);
    }
}

  return (
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
          Sign up
        </Typography>
        <form onSubmit={ e => onSubmit(e)} className={classes.form} noValidate>
          <Grid container spacing={2}>               
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth label="Email Address" name="email" value={email} autoComplete="email" onChange={ e => onInputChange(e)}/>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="filled-age-native-simple">Position</InputLabel>

                  <Select native name="designation" value={designation} onChange={ e => onInputChange(e)}>
                    <option aria-label="None" />
                    <option value="customer">Customer Management</option>
                    <option value="employee">Employee Management</option>
                    <option value="product">Product Management</option>
                    <option value="outlet">Outlet Management</option>
                    <option value="machine">Machine Management</option>
                    <option value="order">Order Management</option>
                    <option value="transport">Transport Management</option>
                  </Select>
                </FormControl>
              </Grid>
            
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="password" value={password} label="Password" type="password" onChange={ e => onInputChange(e)}
                    autoComplete="current-password"/>
            </Grid>

            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth name="rePassword" value={rePassword} label="Re Enter Password" type="password" onChange={ e => onInputChange(e)}
                    autoComplete="current-password"/>
            </Grid>            

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={formValidation}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}