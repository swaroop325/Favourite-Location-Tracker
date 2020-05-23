import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import * as firebase from 'firebase'

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        };
    }
    clearState() {
        this.setState({
            email: '',
            password: '',
            loading: false
        });
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        firebase
            .auth()
            .signInWithEmailAndPassword(userData.email, userData.password)
            .then(res => {
                if (res.user) {
                    alert("User Logged in Successfully");
                    localStorage.setItem('loggedIn', true);
                    localStorage.setItem('uid',res.user.uid)
                    this.props.history.push('/');
                    this.clearState();
                }
            })
            .catch(e => {
                var errorMsg = e.message ? e.message : "Email Id or password Incorrect"
                alert(errorMsg);
                this.clearState();
            });

    };

    render() {
        const { loading } = this.state;
        return (
            <div className='loginForm'>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div>
                        <Typography component="h1" variant="h5">
                            Login
					    </Typography>
                        <form noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                helperText="Enter a valid email"
                                onChange={this.handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                                disabled={loading || !this.state.email || !this.state.password}
                            >
                                Sign In
							{loading && <CircularProgress size={30} />}
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container></div>
        );
    }
}
export default login;