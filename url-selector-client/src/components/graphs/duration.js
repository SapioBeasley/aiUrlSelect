import React, {Component} from 'react'
import Chart from './chart'
import cookie from "react-cookies";

/**
 * Show the load average of request durations
 */
class LoadAverage extends Component {
    state = {
        accessKey: cookie.load('access-token') === undefined ? '' : cookie.load('access-token'),
        events: [],
    };

    /**
     * Calculate the average time of events
     * @param events
     */
    calcAverage = (events) => {
        let sum = 0;

        for (let i = 0; i < events.length; i++) {
            sum += parseInt(events[i].duration, 10);
        }

        return sum / events.length;
    };

    /**
     * Gather data when ready
     */
    async componentDidMount() {
        let response = await fetch('http://0.0.0.0:3001/events', {
            method: 'GET',
            headers: {
                'access-token': this.state.accessKey
            },
        });

        let result = await response.json();

        this.setState({
            events: result.data.events
        });

        let averageLoad = this.calcAverage(this.state.events);

        this.c = new Chart({
            target: this.refs.c,
            thickness: 1,
            format: d => `${averageLoad | 0}ms`,
            ease: 'easeElastic',
            duration: 600
        });

        this.c.render({value: .3})
    };

    render() {
        return (
            <div>
                <section>
                    <h3>Request Duration</h3>
                    <p>Average duration from {this.state.events.length} requests</p>
                    <svg ref="c" className="chart"/>
                </section>
            </div>
        )
    }
}

export default LoadAverage;