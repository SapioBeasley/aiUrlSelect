import React, {Component} from 'react';
import Header from '../components/header/header'
import LoadAverage from '../components/graphs/duration'
import '../components/graphs/duration.css';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

const styles = () => ({
    main: {
        textAlign: 'center'
    }
});

/**
 * Admin Page
 */
class Admin extends Component {
    render() {
        const {classes} = this.props;

        return (
            <div>
                <Header/>

                <div className={classes.main}>
                    <LoadAverage/>
                </div>
            </div>
        );
    }
}

Admin.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Admin);
