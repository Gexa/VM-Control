import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux';
import * as actionCreators from '../../../store/actions/system';

const Dialog = (props) => {

    const [show, setShow] = useState(props.isVisible ? props.isVisible : true);

    const handleClose = () => {
        props.onClearMessage();
    }

    useEffect(() => {
        return () => {
            setShow(false);
        }
    }, []);

    return (
        <Modal
            className={props.theme}
            show={show}
            onHide={handleClose}
            backdrop={ props.backdrop ? "static" : null }
            keyboard={true}
            >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="ModalBodyContent">{props.children}</div>
            </Modal.Body>

            <Modal.Footer>
                {props.buttons && props.buttons.length > 0 ? props.buttons.map( (btn, i) => {
                        return <Button variant={btn.classes || "primary"} key={i} onClick={() => { btn.clicked(); handleClose(); }}>{btn.caption}</Button>
                    }) : null }
                <Button variant="danger" onClick={() => handleClose()}>Bezár</Button>
            </Modal.Footer>
        </Modal>
    );
}

Dialog.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    buttons: PropTypes.array,
    isVisible: PropTypes.bool
}

const mapDispatchToProps = dispatch => {
    return {
        onClearMessage: () => dispatch(actionCreators.systemClearMessage())
    }
}

export default connect(null, mapDispatchToProps)( Dialog );