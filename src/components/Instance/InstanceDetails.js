import React from 'react';
import { connect } from 'react-redux';
import InstanceControls from './InstanceControls';

import * as actionCreators from '../../store/actions/instances';
import { getInstanceStatus } from '../../store/utils';

import Request from '../../service/request';
import VideoApp from '../player/VideoApp';

import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class InstanceDetails extends React.Component {

    state = {
        streamUrl: null
    }

    playStream(e, streamKey) {
        e.preventDefault();
        Request({
            url: '/getStream',
            method: 'get',
            timeout: 2000,
            data: {
                streamName: this.props.server.name,
                streamKey: streamKey
            }
        }).then( res => {
            this.setState({
                streamUrl: res.url
            })
        }).catch( err => {
            console.log(err);
        });
    }

    removeStream() {
        this.setState( { streamUrl: null } );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            streamUrl: null
        });
    }

    render() {
        let serverContent = <div><h5 className="mt-1">Nincs betöltve szerver adat.</h5><p>Válasszon egy szervert a baloldali listából a műveletek megjelenítéséhez és kezeléshez!</p></div>;
        if (this.props.selectedInstance !== null) {
            serverContent = (
                <div className="w-100 float-left">
                    <h5 className="mb-2 mt-2">Név: <strong>{this.props.server.name}</strong> <small>(ID: {this.props.server.id})</small></h5>
                    <div className={["alert mt-3", 'alert-' + getInstanceStatus(this.props.server.status, true)].join(' ')}><strong>Állapot: </strong>{getInstanceStatus(this.props.server.status)}, <strong>URL / DNS: </strong>{this.props.server.hostname}</div>
                    <p className="mt-2">
                        A szerver / VM elindulását követően néhány percre szükség van amíg a DNS rekordok publikálódnak. A DNS rekordokat a VM hozza létre dinamikusan és csak a Google Cloud DNS service frissülését követően lesznek elérhetők.
                    </p>
                    <p className="mt-2">
                        <span className="badge">TAGS:</span> {this.props.server.tags.items.map( item => {
                            return <span key={item} className="badge badge-warning mr-1">{item}</span>
                        } )}
                    </p>
                    <p className="mt-1 p-0 mb-0">
                        <span className="badge">CPU:</span>
                        <span className="badge badge-primary mr-1">{this.props.server.cpuPlatform}</span>
                    </p>
                    <p className="mt-1 p-0 mb-0">
                        <span className="badge">Létrehozva:</span>
                        <span className="badge badge-primary mr-1">{new Date(this.props.server.creationTimestamp).toLocaleString()}</span>
                    </p>
                    <InstanceControls {...this.props} />
                    <div className="w-100 mt-4 float-left">
                        <h4>Streamerek</h4>
                        <table className="table table-striped table-responsive-sm w-100">
                            <thead>
                                <tr className="text-center">
                                    <th>#</th>
                                    <th>ServerID</th>
                                    <th>Stream Kulcs</th>
                                    <th>Felhasználó</th>
                                    <th>E-mail cím</th>
                                    <th>Státusz</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.users ? this.props.users.map( (data, index) => {
                                    let playBtn = <div>{data.streamkey}</div>;
                                    if (parseInt(data.status) === 1) {
                                        playBtn = <a href={'/'+data.streamkey} onClick={(e) => this.playStream(e, data.streamkey)}><FontAwesomeIcon className="mr-1" icon={faPlay} /> {data.streamkey}</a>;
                                    }
                                    return (
                                        <tr key={index} className="text-center">
                                            <td>{index+1}</td>
                                            <td>{data.server_id}</td>
                                            <td>{playBtn}</td>
                                            <td>{data.username}</td>
                                            <td>{data.email}</td>
                                            <td>{parseInt(data.status) !== 1 ? 'offline' : 'online'}</td>
                                        </tr>
                                    );
                                } ) : null}
                            </tbody>
                        </table>
                    </div>
                    {this.state.streamUrl &&
                        <div className="video-outer w-100 mt-3 mb-5 float-left">
                            <VideoApp src={this.state.streamUrl} />
                        </div>
                    }
                </div>
            );
        }
        return serverContent;
    }
}


const mapStateToProps = state => {
    return {
        selectedInstance: state.vm.instanceSelected,
        server: state.vm.instanceSelectedData,
        users: state.vm.streamStatus,
        status: state.vm.serverStatus,
        processing: state.vm.processing
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStartInstance: (name) => dispatch(actionCreators.startInstance(name)),
        onStopInstance: (name) => dispatch(actionCreators.stopInstance(name)),
        onRestartInstance: (name) => dispatch(actionCreators.resetInstance(name)),
        onDeleteInstance: (name) => dispatch(actionCreators.deleteInstance(name)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceDetails);