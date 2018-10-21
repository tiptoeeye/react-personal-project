// Core
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

// Instruments
import Styles from './styles.m.css';

export default class Spinner extends Component {
    portal = document.getElementById('spinner');
    render () {
        const { isSpinning } = this.props;

        return isSpinning
            ? <div className = { Styles.spinner } /> //createPortal(<div className = { Styles.spinner } />, this.portal)
            : null;
    }
}
