import React from 'react';

export default function AddPersonForm({ firstName, lastName, age, onFirstNameChange,
    onLastNameChange, onAgeChange, onAddClick, onUpdateClick, onCancelClick,  isEditing }) {
    return (
        <div className="row jumbotron">
            <div className="col-md-3">
                <input value={firstName} onChange={onFirstNameChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
            </div>
            <div className="col-md-3">
                <input value={lastName} onChange={onLastNameChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
            </div>
            <div className="col-md-3">
                <input value={age} onChange={onAgeChange} name='age' type="text" className="form-control" placeholder="Age" />
            </div>
            <div className="col-md-3">
                {!isEditing && <button className="btn btn-primary btn-block" onClick={onAddClick}>Add</button>}
                {!!isEditing &&
                    <div>
                        <button className="btn btn-warning btn-block" onClick={onUpdateClick}>Update</button>
                        <button className="btn btn-info btn-block" onClick={onCancelClick}>Cancel</button>
                    </div>
                }
            </div>
        </div>
    )
}