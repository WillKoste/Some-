import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const UserItem = ({user: {login, avatar_url, html_url}}) => {
  return (
    <div className="card text-center">
      <img src={avatar_url} className="round-img" style={{width: '60px'}} alt=""/>
      <h3>{login}</h3>

      <div>
        <Link to={`/user/${login}`} className="btn btn-dark btn-sm my-1">Profile</Link>
      </div>
    </div>
  )
}

UserItem.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserItem;
