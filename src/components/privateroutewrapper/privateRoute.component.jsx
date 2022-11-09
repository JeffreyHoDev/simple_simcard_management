import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({ isLoggedIn, children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() =>
            isLoggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          )
        }
      />
    );
}

export default PrivateRoute;