import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';
import LocationSave from './locateMaps';
import Maps from './mapContainer'
import Firebase from 'firebase';

const styles = (theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    appBar: {
        position: 'relative'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    submitButton: {
        display: 'block',
        color: 'white',
        textAlign: 'center',
        position: 'absolute',
        top: 14,
        right: 10
    },
    floatingButton: {
        position: 'fixed',
        bottom: 0,
        right: 0
    },
    form: {
        width: '98%',
        marginLeft: 13,
        marginTop: theme.spacing(3)
    },
    toolbar: theme.mixins.toolbar,
    root: {
        minWidth: 470
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    pos: {
        marginBottom: 12
    },

    dialogeStyle: {
        maxWidth: '50%'
    },
    viewRoot: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class locationCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            saveData: [],
            title: '',
            body: '',
            lat: '',
            long: '',
            locationId: '',
            selectedLocation: [],
            errors: [],
            position: {},
            open: false,
            uiLoading: true,
            viewOpen: false
        };

        this.handleLocation = this.handleLocation.bind(this);
        this.handleViewOpen = this.handleViewOpen.bind(this);

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentDidMount = () => {
        this.fetchDetail();
    };

    fetchDetail = () => {
        this.setState({
            uiLoading: true
        });
        let ref = Firebase.database().ref('location/' + localStorage.getItem('uid'));
        let arrayLocation = [];
        ref.on('value', snapshot => {
          const state = snapshot.val();
          snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();
            arrayLocation.push(childData[0])
           });
          this.setState({
              locations: arrayLocation,
              uiLoading: false
          });
        });
    }

    handleLocation(latitude, longitude) {
        this.setState({
            lat: latitude,
            long: longitude
        });
    }
    handleViewOpen(data) {
        var location = [
            {
                name: data.location.title,
                position: {
                    lat: data.location.lat,
                    lng: data.location.lng
                }
            }
        ];
        var position = {
            lat: data.location.lat,
            lng: data.location.lng
        }
        this.setState({
            selectedLocation: location,
            position: position,
            viewOpen: true
        });
    }

    render() {
        const { classes } = this.props;
        const { open, errors, viewOpen } = this.state;

        const handleClickOpen = () => {
            this.setState({
                locationId: '',
                title: '',
                body: '',
                buttonType: '',
                open: true
            });
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            const uid = localStorage.getItem('uid')
            let userLocation = [{
                title: this.state.title,
                body: this.state.body,
                lat: this.state.lat,
                lng: this.state.long
            }];
            Firebase.database().ref('location/' + uid).push(userLocation);
            alert('Location Saved Successfully');
            this.setState({
                open: false
            });
            this.fetchDetail();
        };


        const handleClose = (event) => {
            this.setState({ open: false });
        };

        if (this.state.uiLoading === true) {
            return (
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.state.uiLoading && <CircularProgress size={150} />}
                </main>
            );
        } else {
            return (<div>
                <main className={classes.content} style={{ maxWidth: '50%', display: 'inline-block', float: 'left' }}>
                    <div className={classes.toolbar} />
                    <div>{!this.state.open ?
                        <IconButton style={{ zIndex: '9999999999' }}
                            className={classes.floatingButton}
                            color="primary"
                            aria-label="Add Location"
                            onClick={handleClickOpen}
                        >
                            <AddCircleIcon style={{ fontSize: 100 }} />
                        </IconButton> : <div></div>}</div>
                    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} >
                        <AppBar style={{ position: 'relative' }}>
                            <Toolbar>
                                <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6">
                                    Add favourite location
								</Typography>
                                <Button
                                    autoFocus
                                    color="inherit"
                                    onClick={handleSubmit}
                                    className={classes.submitButton}
                                >
                                    SAVE
								</Button>
                            </Toolbar>
                        </AppBar>

                        <form className={classes.form} noValidate>
                            <Grid container spacing={2} style={{ marginBottom: '20px' }}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="locationTitle"
                                        label="Location Name"
                                        name="title"
                                        autoComplete="locationTitle"
                                        helperText={errors.title}
                                        value={this.state.title}
                                        error={errors.title ? true : false}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="body"
                                        autoComplete="address"
                                        helperText={errors.body}
                                        error={errors.body ? true : false}
                                        onChange={this.handleChange}
                                        value={this.state.body}
                                    />
                                </Grid>
                            </Grid>
                            <div className="test">
                            <LocationSave handleLocation={this.handleLocation} />
                            </div>
                        </form>
                    </Dialog>
                    <Grid container spacing={2}>
                        {this.state.locations.map((location) => (
                            <Grid item xs={12} sm={6}>
                                <Card className={classes.root} variant="outlined" style={{ minWidth: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" component="h2">
                                            {location.title}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Address:{`${location.body}`}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                           Lat: {location.lat}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                           Long: {location.lng}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => this.handleViewOpen({ location })}>
                                            {' '}
											View{' '}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </main>
                <div className="maps" style={{ float: 'left' }}>{this.state.viewOpen ? <Maps selectLocation={this.state.selectedLocation} location={this.state.locations} position={this.state.position}/> : <Maps location={this.state.locations} />}</div>
            </div>
            );
        }
    }
}

export default withStyles(styles)(locationCards);