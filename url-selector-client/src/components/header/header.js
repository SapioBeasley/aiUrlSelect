import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import BubbleChart from '@material-ui/icons/BubbleChart';
import cookie from "react-cookies";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    generateKeyButton: {
        color: '#fff'
    }
};

/**
 * Main header
 */
class MenuAppBar extends Component {
    state = {
        accessKey: cookie.load('access-token'),
        auth: cookie.load('access-token') !== undefined,
    };

    /**
     * Request for generating an access key
     */
    generateAccessKey = () => {
        fetch('http://0.0.0.0:3001/generate-key', {
            method: 'GET'
        }).then(response => response.json()).then((result) => {
            cookie.save('access-token', result.data.accessKey, {path: '/'});

            this.setState({
                accessKey: result.data.accessKey,
                auth: true
            });

            window.location.reload()
        });
    };

    render() {
        const {classes} = this.props;
        const {auth} = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            <Link to="/" style={{
                                color: '#fff',
                                textDecoration: 'none'
                            }}>URL Selector</Link>
                        </Typography>

                        <div>
                            <Button className={classes.generateKeyButton} onClick={this.generateAccessKey}>Generate
                                Key</Button>

                            {auth && (
                                <IconButton
                                    aria-haspopup="true"
                                    color="inherit"
                                    component={Link}
                                    to="/admin"
                                >
                                    <BubbleChart/>
                                </IconButton>
                            )}
                        </div>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
