import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
        <div class="box-layout__box">
            <h1 class="box_layout__title">Expensify</h1>
            <p>It's time to get your expenses under control.</p>
            <button class="button" onClick={startLogin}>Login with Google</button>
        </div>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);