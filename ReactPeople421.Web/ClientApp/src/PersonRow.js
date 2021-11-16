﻿import React from 'react';

function PersonRow(props) {
    const { person, onEditClick, onDeleteClick }=props
    const { firstName, lastName, age} = person;
    return (
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className="btn btn-warning" onClick={onEditClick}>Edit</button>
                <button className="btn btn-danger" onClick={onDeleteClick}>Delete</button>
            </td>
        </tr>
    )
}

export default PersonRow;