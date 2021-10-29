import {Switch, Route,BrowserRouter as Router} from 'react-router-dom';
import HomePage from "../HomePage";
import Posts from "../Posts";
import PrivateRoute from './PrivateRoute';
import NewPost from '../NewPost';
import EditPost from '../EditPost';
import NewUser from '../NewUser';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={NewUser} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/new" component={NewPost} />
        <Route exact path="/posts/edit/:post" component={EditPost} />
      </Switch>
    </Router>
  );
}

export default App;
