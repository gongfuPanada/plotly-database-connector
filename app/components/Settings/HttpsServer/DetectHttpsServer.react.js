import React, {Component} from 'react';
import HttpsInstructions from './HttpsInstructions.react';

let INTERVAL_ID;

class DetectHttpsServer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            successfulFetch: false,
            expandInstructions: false
        };
    }

    componentWillMount() {

        INTERVAL_ID = setInterval(() => {
            fetch('https://connector.plot.ly:5001/status')
            .then(request => {
                console.warn('successfulFetch: true');
                this.setState({successfulFetch: true});
            })
            .catch(err => {
                if (err.message === 'failed to fetch') {
                    console.warn('successfulFetch: false');
                    this.setState({successfulFetch: false});
                }
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(INTERVAL_ID);
    }


    render() {

        let httpsServerState;
        if (this.state.successfulFetch) {
            httpsServerState = (
                <div>✓ Your certificates are installed on this computer.</div>
            );
        } else {
            httpsServerState = (
                <div>

                    <div>
                        Install your self-signed certificates.&nbsp;
                        <a onClick={() => {
                            this.setState({
                                expandInstructions: !this.state.expandInstructions
                            });
                        }}
            >
                            {this.state.expandInstructions ? 'Hide ' : 'View '}
                            instructions.
                        </a>
                    </div>

                    {
                        this.state.expandInstructions ? HttpsInstructions() : null
                    }
                </div>
            );
        }

        return (
            <div>
                {httpsServerState}
            </div>
        );
    }

}

export default DetectHttpsServer;
