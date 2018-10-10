import React, {Component} from 'react';
import cookie from "react-cookies";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ListDomains from "../lists/ListDomains";

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '98%',
    },
    maxError: {
        margin: '0 0 15px 10px'
    }
});

/**
 * Companies component
 */
class Companies extends Component {
    state = {
        label: 'Enter up to 25 comma seperated company names.',
        value: '',
        data: [],
        accessKey: cookie.load('access-token'),
        companyCount: 0
    };

    /**
     * If there is a change, update the state
     * @param event
     */
    handleChange = (event) => {
        this.setState({
            value: event.target.value,
            companyCount: this.state.value.split(',').length
        });
    };

    /**
     * Submit the form
     * @param event
     */
    handleSubmit = (event) => {
        event.preventDefault();

        let companies = this.state.value.split(',');

        fetch('http://0.0.0.0:3001/url', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access-token': this.state.accessKey
            },
            method: 'POST',
            body: JSON.stringify({
                companies: companies
            })
        }).then(response => response.json()).then((result) => {
            this.setState({
                data: result.data
            })
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <TextField
                    id="standard-textarea"
                    label={this.state.label}
                    placeholder="Placeholder"
                    multiline
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChange}
                />

                {this.state.companyCount > 25 &&
                <p className={classes.maxError}>
                    <small>
                        You have went over the max amount of companies. (max: 25,
                        actual: {this.state.companyCount}).
                    </small>
                </p>
                }

                <Button disabled={this.state.companyCount > 25 || this.state.accessKey === undefined}
                        onClick={this.handleSubmit}
                >{this.state.accessKey === undefined ? 'Generate token in header' : 'Get Domains'}</Button>

                {this.state.data.map((company, i) => {
                    return <ListDomains key={i} domain={company.domain}/>
                })}
            </div>
        )
    }
}


Companies.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Companies);