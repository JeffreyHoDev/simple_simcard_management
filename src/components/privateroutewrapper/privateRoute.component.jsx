import { Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({ isLoggedIn, children }) => {
    return (
      <Route
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