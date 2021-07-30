import React from 'react';
import { Button } from 'react-bootstrap';
import * as actionCreators from '../../store/actions/system';
import { connect } from 'react-redux';

import { faPlay, faStop, faSync, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InstanceControls = (props) => {
    const onBeforeDeleteInstance = () => {
        props.onSetMessage({
            title: 'Megerősítés szükséges',
            content: 'Biztos benne, hogy törölni szeretné a '+props.server.name+' VM-et? A folyamatot nem lehet visszafordítani és ha éppen valaki stream-el, akkor meg fog szakadni! Folytatja?',
            buttons: [
                {
                    clicked: () => props.onDeleteInstance(props.server.name),
                    caption: 'Igen, törlöm'
                }
            ]
        });
    }
    const onBeforeStopInstance = () => {
        props.onSetMessage({
            title: 'Megerősítés szükséges',
            content: 'Biztos benne, hogy meg szeretné állítani a '+props.server.name+' VM-et? A folyamatot nem lehet visszafordítani és ha éppen valaki stream-el, akkor meg fog szakadni! Folytatja?',
            buttons: [
                {
                    clicked: () => props.onStopInstance(props.server.name),
                    caption: 'Igen, megállítom'
                }
            ]
        });
    }
    const onBeforeResetInstance = () => {
        props.onSetMessage({
            title: 'Megerősítés szükséges',
            content: 'Biztos benne, hogy újra szeretné indítani a '+props.server.name+' VM-et? A folyamatot nem lehet visszafordítani és ha éppen valaki stream-el, akkor meg fog szakadni! Folytatja?',
            buttons: [
                {
                    clicked: () => props.onRestartInstance(props.server.name),
                    caption: 'Igen, újraindítom'
                }
            ]
        });
    }

    return (
        <div className="btn-group mt-3 w-100">
            <Button variant="success" disabled={props.processing !== false || props.server.status === 'RUNNING' || props.server.status === 'STARTING' ? true : false}
                size="sm" onClick={() => props.onStartInstance(props.server.name)}>
                    <FontAwesomeIcon className="mr-1" icon={faPlay} /> Indítás
            </Button>
            <Button variant="primary" disabled={props.processing !== false || props.server.status === 'TERMINATED' || props.server.status === 'STOPPING' ? true : false}
                size="sm" onClick={() => onBeforeStopInstance()}>
                    <FontAwesomeIcon className="mr-1" icon={faStop} /> Megállítás
            </Button>
            <Button variant="warning" disabled={props.processing !== false || props.server.status === 'TERMINATED' || props.server.status === 'STOPPING' ? true : false}
                size="sm" onClick={() => onBeforeResetInstance()}>
                    <FontAwesomeIcon className="mr-1" icon={faSync} /> Újraindítás
            </Button>
            <Button variant="danger" size="sm" onClick={() => onBeforeDeleteInstance()}>
                <FontAwesomeIcon className="mr-1" icon={faTrash} /> Törlés
            </Button>
        </div>
    );
}

const mapDispatchToPropss = dispatch => {
    return {
        onSetMessage: (msgData) => dispatch(actionCreators.systemSetMessage(msgData))
    }
}

export default connect(null, mapDispatchToPropss)( InstanceControls );