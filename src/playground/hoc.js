import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>info</h1>
        <p>The info is: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info. Pls don't share</p>}
            <WrappedComponent { ...props }/>
        </div>
    )
};
const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {!props.isAuthenticated ? <p>Please log in</p> : (<WrappedComponent {...props} />)}
        </div>
    )
}
const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);
ReactDOM.render(<AuthInfo isAuthenticated={true} info="details" />, document.getElementById("app"))
// ReactDOM.render(<AdminInfo isAdmin={true} info="details" />, document.getElementById("app"))