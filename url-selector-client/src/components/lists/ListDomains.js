import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        padding: '20px',
        marginTop: '20px'
    }
});

/**
 * Component in charge for displaying domain in paper card
 */
class ListDomains extends Component {
    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.root} elevation={2}>
                <Typography component="p">
                    {this.props.domain}
                </Typography>
            </Paper>
        )
    }
}


ListDomains.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ListDomains);