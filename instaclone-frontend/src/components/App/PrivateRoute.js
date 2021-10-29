import { Route,Redirect } from "react-router";
import { isAuthenticated } from "../utils/authOperations";

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
      {...rest}
      render={props => (
        isAuthenticated()
        ? (
          <Component key={props.location} {...props} />
        )
        : (<Redirect to={{ pathname: '/', state: { from: props.location} }} />)
      )}
    />
);
    
export default PrivateRoute;