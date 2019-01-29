import React from 'react'

const Create = ({ match }) => {
  return (
    <div>this is create page. {match.params.id}</div>
  )
};

export default Create;
