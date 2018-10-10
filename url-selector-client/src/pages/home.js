import React, {Component} from 'react';
import Header from '../components/header/header'
import CompanyForm from '../components/forms/companies'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

/**
 * Home Page
 * @param theme
 * @returns {{main: {margin: string, width: string, padding: string}}}
 */
const styles = {
    main: {
        margin: 'auto',
        width: '70%',
        padding: '10px'
    },
};

/**
 * Home page
 */
class Home extends Component {
    render() {
        const {classes} = this.props;

        return (
            <div>
                <Header/>

                <div className={classes.main}>
                    <CompanyForm/>
                </div>
            </div>
        )
    }
}


Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
