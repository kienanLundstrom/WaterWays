import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, withRouter } from 'react-router-dom';

class ModerateSingleLocation extends Component {

    state = {
        location: {
            id: '',
            name: '',
            address: '',
            latitude: '',
            longitude: '',
            free: '',
            created_by:'',
            spigot: '',
            trail_access: '',
            road_access: '',
            campground_access: '',
            free_flowing: '',
            artesian_well: '',
            image: '',
            description: ''
        }
    }

    // Fetches single location by ID.
    componentDidMount() {
        console.log(this.props.match.params);
        this.props.dispatch({ type: 'FETCH_SINGLE_LOCATION', payload: this.props.match.params.id })
    } // end componentDidMount

    componentDidUpdate(prevProps) {

        if (this.props.reduxStore.SingleLocationReducer !== prevProps.reduxStore.SingleLocationReducer) {
            // let array = [];
            this.props.reduxStore.SingleLocationReducer.map(location => {
                this.setState({
                    location: {
                        id: location.id,
                        name: location.name,
                        address: location.address,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        free: location.free,
                        created_by: location.created_by,
                        spigot: location.spigot,
                        trail_access: location.trail_access,
                        road_access: location.road_access,
                        campground_access: location.campground_access,
                        free_flowing: location.free_flowing,
                        artesian_well: location.artesian_well,
                        image: location.photo_primary,
                        description: location.description
                    }
                });
            })
        }
    }

    handleChange = (event, propertyName) => {
        this.setState({
            location: {
                [propertyName]: event.target.value,
                [propertyName]: !event.target.value,
            }
        })
    }

    handleToggle = (propertyName, boolean) =>{
        this.setState({
            location:{
                ...this.state.location,
                [propertyName]: !boolean
            }
        })
    }

    handleBack = () => {
        this.props.history.push("/ModerateLocation")
    }

    handleSubmit = () => {
        this.props.dispatch({ type: 'UPDATE_LOCATION', payload: this.state.location });
        this.props.history.push('/');
    }

    handleDelete = () =>{
        this.props.dispatch({ type: 'DELETE_LOCATION', payload: this.state.location.id });
        this.props.history.push('/');
    }

    render() {
        return (
            <Router>
                <div className="moderateSingleLocation">
                    <button onClick={this.handleBack}>Back</button>
                    <h1>Location Details:</h1>
                            <input value={this.state.location.name} onChange={(event) => this.handleChange(event, 'name')} />
                            <br/>
                            <input value={this.state.location.description} onChange={(event) => this.handleChange(event, 'description')} />
                            <br/>
                            <input value={this.state.location.address} onChange={(event) => this.handleChange(event, 'address')} />
                            <br/>
                            <input value={this.state.location.created_by} onChange={(event) => this.handleChange(event, 'created_by')} />
                            <br/>
                            <input value={this.state.location.latitude} onChange={(event) => this.handleChange(event, 'latitude')} />
                            <br/>
                            <input value={this.state.location.longitude} onChange={(event) => this.handleChange(event, 'longitude')} />
                            <br/>
                            <p>free</p>
                            {this.state.location.free ?
                                <button onClick={()=>this.handleToggle("free",true)}>True</button>:<button onClick={()=>this.handleToggle("free",false)}>False</button>
                            }
                            <p>spigot</p>
                            {this.state.location.spigot ?
                                <button onClick={()=>this.handleToggle("spigot",true)}>True</button>:<button onClick={()=>this.handleToggle("spigot",false)}>False</button>
                            }
                            <p>trail_access</p>
                            {this.state.location.trail_access ?
                                <button onClick={()=>this.handleToggle("trail_access",true)}>True</button>:<button onClick={()=>this.handleToggle("trail_access",false)}>False</button>
                            }
                            <p>road_access</p>
                            {this.state.location.road_access ?
                                <button onClick={()=>this.handleToggle("road_access",true)}>True</button>:<button onClick={()=>this.handleToggle("road_access",false)}>False</button>
                            }
                            <p>campground_access</p>
                            {this.state.location.campground_access ?
                                <button onClick={()=>this.handleToggle("campground_access",true)}>True</button>:<button onClick={()=>this.handleToggle("campground_access",false)}>False</button>
                            }
                            <p>free_flowing</p>
                            {this.state.location.free_flowing ?
                                <button onClick={()=>this.handleToggle("free_flowing",true)}>True</button>:<button onClick={()=>this.handleToggle("free_flowing",false)}>False</button>
                            }
                             <p>artesian_well</p>
                            {this.state.location.artesian_well ?
                                <button onClick={()=>this.handleToggle("artesian_well",true)}>True</button>:<button onClick={()=>this.handleToggle("artesian_well",false)}>False</button>
                            }
                             <p>image</p>
                            {this.state.location.image?
                                <button onClick={()=>this.handleToggle("image",true)}>True</button>:<button onClick={()=>this.handleToggle("image",false)}>False</button>
                            }
                             <p>description</p>
                            {this.state.location.description?
                                <button onClick={()=>this.handleToggle("description",true)}>True</button>:<button onClick={()=>this.handleToggle("description",false)}>False</button>
                            }
                            <br/>
                    <button>Submit</button>
                    <button>Delete</button>

                </div>
            </Router>
        )
    }
}
const mapStateToProps = (reduxStore) => ({
    reduxStore
});
export default withRouter(connect(mapStateToProps)(ModerateSingleLocation));