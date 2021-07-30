import React from 'react';
import styles from './App.module.scss';

import InstanceList from '../components/Instance/InstanceList.js';
import InstanceDetails from '../components/Instance/InstanceDetails.js';
import { connect } from 'react-redux';
import Dialog from '../components/UI/Dialog/Dialog';

class App extends React.Component {

  render() {
    return (
      <div className={[styles.App, 'container'].join(' ')}>
        <header className="App-header row">
          <h2 className={[styles.logo, 'col-12 py-3 mb-5 mt-3 text-center'].join(' ')}>Utopia<span className={[styles.yellow, this.props.onProcessing && styles.loading].join(' ')}>Live</span><br /><small>VM <strong>Control Panel</strong></small></h2>
        </header>
        <section className="row">
          <aside className="col-12 col-sm-6 col-md-5">
            <InstanceList />
          </aside>
          <div className="col-12 col-sm-6 col-md-7">
            <InstanceDetails />
          </div>
        </section>
        {this.props.onProcessing && <div className={styles.overlay}><div className={styles.loader}></div></div> }
        {this.props.systemMessage &&
        <Dialog
            {...this.props.systemMessage}>
                {this.props.systemMessage.content}
        </Dialog>}
      </div>
    );
}
}

const mapStateToProps = state => {
  return {
    onProcessing: state.vm.processing,
    systemMessage: state.sys.systemMessage
  }
}

export default connect(mapStateToProps)( App );
