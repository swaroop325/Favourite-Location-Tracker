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
import Maps from  './locateMaps';

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
            locations: [{
                'title':'a',
                'body': 'dsal;dajd'
            }, {
                'title':'a',
                'body': 'dsal;dajd'

            }],
            title: '',
            body: '',
            locationId: '',
            errors: [],
            open: false,
            uiLoading: false,
            buttonType: '',
            viewOpen: false
        };

        this.handleViewOpen = this.handleViewOpen.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentWillMount = () => {

    };

    handleViewOpen(data) {
        this.setState({
            title: data.location.title,
            body: data.location.body,
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
            const userLocation = {
                title: this.state.title,
                body: this.state.body
            };


        };


        const handleClose = (event) => {
            this.setState({ open: false });
        };

        if (this.state.uiLoading === true) {
            return (
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.state.uiLoading && <CircularProgress size={150}/>}
                </main>
            );
        } else {
            return (<div>
                <main className={classes.content} style={{maxWidth:'50%',display:'inline-block', float:'left'}}>
                    <div className={classes.toolbar} />

                    <IconButton style={{zIndex:'9999999999'}}
                        className={classes.floatingButton}
                        color="primary"
                        aria-label="Add Location"
                        onClick={handleClickOpen}
                    >
                        <AddCircleIcon style={{ fontSize: 100 }} />
                    </IconButton>
                    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
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
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="locationTitle"
                                        label="Location Title"
                                        name="title"
                                        autoComplete="locationTitle"
                                        helperText={errors.title}
                                        value={this.state.title}
                                        error={errors.title ? true : false}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                            <Maps/>
                            </Grid>
                        </form>
                    </Dialog>
                    <Grid container spacing={2}>
                        {this.state.locations.map((location) => (
                            <Grid item xs={12} sm={6}>
                                <Card className={classes.root} variant="outlined" style={{minWidth:'100%'}}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            Address:{location.title}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Lat and long:{`${location.body.substring(0, 65)}`}
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
                <div className="maps" style={{display:'inline'}}><Maps/></div>
                </div>
            );
        }
    }
}

export default withStyles(styles)(locationCards);