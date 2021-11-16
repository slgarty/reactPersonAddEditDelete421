import React from 'react';
import axios from 'axios';
import PersonRow from './PersonRow.js';
import AddPersonForm from './AddPersonForm.js';


class PeopleTable extends React.Component {

    state = {
        people: [],
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        isEditing: false,
        editId:''
    }

    componentDidMount = () => {
        axios.get('/api/people/getall').then(({ data }) => {
            this.setState({ people: data });
        });
    }
    onTextChange = e => {
        const personCopy = { ...this.state.person };
        personCopy[e.target.name] = e.target.value;
        this.setState({ person: personCopy });
    }
    onAddClick = () => {      
        axios.post('/api/people/add', this.state.person).then(() => {
            axios.get('/api/people/getall').then(({ data }) => {
                this.setState({
                    people: data,
                    person: { firstName: '', lastName: '', age: '' },

                });
            });
        });

    }
    onEditClick = (p) => {
        this.setState({ person: p, isEditing: true, editId: p.id });
    }
    onDeleteClick = person => {
        axios.post('/api/people/Delete', person).then(() => {
            axios.get('/api/people/getAll').then(({ data }) => {
                this.setState({
                    people: data
                });
            });
        });
    }
    onCancelClick = () => {
        this.setState({
            isEditing: false,
            person: { firstName: '', lastName: '', age: '' }
        });
    }

    onUpdateClick = () => {
        axios.post('/api/people/update', this.state.person).then(() => {
            axios.get('/api/people/getall').then(({ data }) => {
                this.setState({
                    isEditing: false,
                    people: data,
                    person: { firstName: '', lastName: '', age: '' }
                });
            });
        });
    }

    render() {
        const { people, person } = this.state;
        const { firstName, lastName, age } = person;
        return (
            <div className="container" style={{ marginTop: 60 }}>
                <AddPersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    onFirstNameChange={this.onTextChange}
                    onLastNameChange={this.onTextChange}
                    onAgeChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isEditing={this.state.isEditing}
                    onUpdateClick={() => this.onUpdateClick(person)}
                    onCancelClick={this.onCancelClick}
                />
          
                <div className="row mt-4">
                    <div className="col-md-12">
                       <table className="table table-header table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Age</th>
                                    <th>Edit/Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {people.map(p =>
                                    <PersonRow person={p}
                                        key={p.id}
                                        onEditClick={() => this.onEditClick(p)}
                                        onDeleteClick={() => this.onDeleteClick(p)} />)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }


}
    export default PeopleTable;