import {Link} from "react-router-dom";
import './index.css'

function Header(){
    return(
      <div className='header-div'>
        <nav className="navbar navbar-light bg-light">   
          <Link className="navbar-brand text-success" to="/"><i className="fas fa-bullseye"></i> InstaClone</Link>
          <Link to="/posts/new" className="addPost"><i className="fa fa-camera-retro fa-2x"></i></Link>
        </nav>
      </div>
    )
}

export default Header;