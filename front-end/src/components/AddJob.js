import React, { Component } from "react";
import JobDataService from "../services/job.service";

export default class AddJob extends Component {
    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.saveJob = this.saveJob.bind(this);
        this.newJob = this.newJob.bind(this);

        // keep the form values into component's state
        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,
            publishedAt: null,
            salary: 0,
            company: "",
            formErrors: { title: "", description: "", company: "", salary: "" },
            titleValid: false,
            descriptionValid: false,
            salaryValid: false,
            companyValid: false,
            formValid: false,
            submitted: false
        };
    }

    validateForm() {
        this.setState({ formValid: this.state.titleValid && this.state.descriptionValid && this.state.salaryValid && this.state.companyValid });
    }

    validateField(fieldName, value) {

        let fieldValidationErrors = this.state.formErrors
        let titleValid = this.state.titleValid
        let descriptionValid = this.state.descriptionValid
        let salaryValid = this.state.salaryValid
        let companyValid = this.state.companyValid

        // inserting into stack formErros all problems from the form

        switch (fieldName) {
            case 'title':
                titleValid = this.state.title.trim() !== ""
                fieldValidationErrors.title = titleValid ? "" : ' should not be empty'
                break;
            case 'description':
                descriptionValid = this.state.description.trim() !== ""
                fieldValidationErrors.description = descriptionValid ? "" : ' should not be empty'
                break;
            case 'company':
                companyValid = this.state.company.trim() !== ""
                fieldValidationErrors.company = companyValid ? "" : ' should not be empty'
                break;
            case 'salary':
                salaryValid = this.state.salary > 0
                fieldValidationErrors.salary = salaryValid ? "" : ' should be > 0'
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            titleValid: titleValid,
            descriptionValid: descriptionValid,
            salaryValid: salaryValid,
            companyValid: companyValid
        }, this.validateForm)
    }

    // form value into state

    handleUserInput(e) {
        const name = e.target.name
        const value = e.target.value
        this.setState({ [name]: value },
            () => { this.validateField(name, value) })
    }

    saveJob() {

        // recovering from state the form's values

        var data = {
            title: this.state.title,
            description: this.state.description,
            salary: this.state.salary,
            company: this.state.company
        };

        Object.keys(this.state.formErrors).map((fieldName, i) =>
            this.validateField(fieldName, this.state.formErrors[fieldName]))


        // if the form is valid, send data to API
        if (this.state.formValid) {
            JobDataService.create(data)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        description: response.data.description,
                        published: response.data.published,
                        salary: response.data.salary,
                        company: response.data.company,
                        submitted: true
                    });

                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    // reseting the component state

    newJob() {
        this.setState({
            id: null,
            title: "",
            description: "",
            company: "",
            salary: 0,
            published: false,
            formErrors: { title: "", description: "", salary: "", company: "" },
            titleValid: false,
            descriptionValid: false,
            salaryValid: false,
            companyValid: false,
            formValid: false,
            submitted: false
        });
    }

    // defining the visual structure of the component

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newJob}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={this.state.title}
                                onChange={this.handleUserInput}
                                name="title"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.handleUserInput}
                                name="description"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input
                                type="text"
                                className="form-control"
                                id="company"
                                required
                                value={this.state.company}
                                onChange={this.handleUserInput}
                                name="company"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="salary">Salary per hour</label>
                            <input
                                type="number"
                                className="form-control"
                                id="salary"
                                required
                                value={this.state.salary}
                                onChange={this.handleUserInput}
                                name="salary"
                            />
                        </div>

                        <button onClick={this.saveJob} className="btn btn-success">
                            Submit
                        </button>
                        <div>
                            <b>
                                {Object.keys(this.state.formErrors).map((fieldName, i) => {
                                    if (this.state.formErrors[fieldName].length > 0) {
                                        return (
                                            <p key={i}>{fieldName} {this.state.formErrors[fieldName]}</p>
                                        )
                                    } else {
                                        return '';
                                    }
                                })}
                            </b>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
