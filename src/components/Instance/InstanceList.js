import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Aux } from '../../hoc/Aux';
import { getInstanceStatus } from '../../store/utils';

import { faSync, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as actionCreators from '../../store/actions/index';

class InstanceList extends Component {

    componentDidMount() {
        this.props.onListInstances();
    }

    createNewInstance() {
        this.props.onSetMessage({
            title: 'Szerver létrehozása',
            content: 'A szerver létrehozása és telepítése a "KÉSZÍT" gombra kattintáskor megkezdődik. Kérjük, hogy frissítse a listát a megtekintéshez! Nagyon fontos, hogy naponta 30 db létrehozási kérés futattatható. Amennyiben átlépi a Limit-et a Cloud Compute Engine nem fogja engedélyezni több szerver létrehozását csak a Developer Console-ról, amihez viszont fejlesztő szükséges!',
            buttons: [
                {
                    caption: 'KÉSZÍT',
                    clicked: () => this.props.onCreateInstance()
                }
            ]
        });
    }

    setActiveInstance(name) {
        this.props.onSelectInstance(name);
    }

    render() {
        let instancesHtmlList = (<li className="list-group-item list-group-item-primary text-center">... betöltés ...</li>);

        if(this.props.instanceList.length)
            instancesHtmlList = this.props.instanceList.map( (instance, index) => {
            const instanceClassName = ['list-group-item' , ('list-group-item-' + getInstanceStatus(instance.status, true))].join(' ');
            return (<li className={instanceClassName} key={instance.id}>
                        <a href="/getInstance" onClick={(e) => { e.preventDefault(); this.setActiveInstance(instance.name); }} >
                            <h5 className="d-inline">{instance.name} <small>({getInstanceStatus(instance.status)})</small></h5>
                            <span className="mt-1 badge badge-danger badge-pill float-right">{instance.hostname}</span>
                        </a>
                    </li>)
            });

        return (
            <Aux>
                <Button variant="warning" size="sm" className="mb-3 w-50" onClick={() => this.props.onListInstances()}>
                    <FontAwesomeIcon className="mr-1" icon={faSync} />
                    Frissítés
                </Button>
                <Button variant="danger" size="sm" className="mb-3 w-50" onClick={() => this.createNewInstance()}>
                    <FontAwesomeIcon className="mr-1" icon={faPlusSquare} />
                    Új szerver
                </Button>
                <h5>Elérhető szerverek</h5>
                <ul className="list-group">
                    {instancesHtmlList}
                </ul>
            </Aux>);
    }
}

const mapStateToProps = state => {
    return {
        instanceList: state.vm.instanceList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectInstance: (id) => dispatch(actionCreators.vmGetInstance(id)),
        onCreateInstance: (id) => dispatch(actionCreators.createInstance(id)),
        onListInstances: () => dispatch(actionCreators.vmGetInstanceList()),
        onSetMessage: (msgData) => dispatch(actionCreators.systemSetMessage(msgData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( InstanceList );