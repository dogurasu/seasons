import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './components/SeasonDisplay';
import Spinner from './components/Spinner';

// App will have the code to determine the location + month
// const App = () => {
//     console.log("Loading App");
//     window.navigator.geolocation.getCurrentPosition( // takes 2 callbacks: success(), failure()
//         (position) => {
//             // take that latitude
//             // figure out if we're in the Northern or Southern Hemipshere
//             // then determine the look of the page depending on whether we are or not
//             console.log(position);
//         },
//         (err) => {
//             console.log(err);
//         }
//     );

//     // then App will pass the location + month to the SeasonDisplay component 
//     // SeasonDisplay - shows different text/icons based on props
//     return (
//         <h1>Hi There!</h1>
//     );
// }

class App extends React.Component {
    // our single piece of state (single property) we care about righ tnow is the user's current latitude
    // constructor(props) {
    //     super(props); // make sure the parent's constructor function is called
    //     this.state = {
    //         lat: null, // to keep track of latitude returned by geolocation API
    //         errorMsg: ''
    //     };
    // }
    
    // equivalent to constructor this.state={}
    state = { lat: null, errorMessage: ''};

    componentDidMount = () => {
        // console.log("componentDidMount ran");
        window.navigator.geolocation.getCurrentPosition( // takes 2 callbacks: success(), failure()
            // take that latitude
            // figure out if we're in the Northern or Southern Hemipshere
            // then determine the look of the page depending on whether we are or not
            // console.log(position);
            (position) => this.setState({lat: position.coords.latitude}),
            (err) => this.setState({errorMsg: err.message})
        );
    }

    // helper function
    renderContent() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMsg}</div>;
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat}/>
        }

        return <Spinner message="Please accept location request" />
    }

    // componentDidUpdate = () => {
    //     console.log("componentDidUpdate ran");
    // }

    render() {
        // console.log("Loading App");
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));