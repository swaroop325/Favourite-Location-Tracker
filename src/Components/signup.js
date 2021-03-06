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
class signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    clearState() {
        this.setState({
            email: '',
            password: '',
            loading: false
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        firebase
            .auth()
            .createUserWithEmailAndPassword(userData.email, userData.password)
            .then(res => {
                if (res.user) {
                    alert("User Created");
                    this.clearState();
                }
            })
            .catch(e => {
                var errorMsg = e.message ? e.message : "Some Error Occured. Please Try Again"
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
                            SignUp
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
                                value={this.state.email}
                                onChange={this.handleChange} />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={this.state.password}
                                autoComplete="current-password"
                                onChange={this.handleChange} />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                                disabled={loading || !this.state.email || !this.state.password}>
                                Sign Up
							{loading && <CircularProgress size={30} />}
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/login" variant="body2">
                                        {"Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container></div>
        );
    }
}
export default signup;