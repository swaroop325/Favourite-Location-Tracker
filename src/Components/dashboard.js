import React, { Component } from 'react';
import LocationCards from './locationCards.js';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

class home extends Component {

    logoutHandler = (event) => {
        localStorage.removeItem('loggedIn')
        this.props.history.push('/login');
    };

    constructor(props) {
        super(props);
        this.state = {
            uiLoading: false
        };
    }

    componentDidMount = () => {
        if (localStorage.getItem('loggedIn') !== "true") {
            this.logoutHandler();
        }
    };

    render() {
        if (this.state.uiLoading === true) {
            return (
                <div>
                    {this.state.uiLoading && <CircularProgress size={150} />}
                </div>
            );
        } else {
            return (
                <div>
                    <CssBaseline />
                    <AppBar position="fixed">
                        <Toolbar>
                            <Typography variant="h6" noWrap>
                                Favorite Location Tracker
							</Typography>
                            <Typography variant="h6" noWrap style={{ border: '1px solid', padding: '0px 10px', marginLeft: '2%' }} onClick={this.logoutHandler}>
                                Logout
							</Typography>
                        </Toolbar>
                    </AppBar>
                    <LocationCards />
                </div>
            );
        }
    }
}

export default home;