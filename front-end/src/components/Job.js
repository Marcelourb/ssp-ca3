import React, { Component } from "react";
import JobDataService from "../services/job.service";

export default class Job extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCompany = this.onChangeCompany.bind(this);
        this.onChangeSalary = this.onChangeSalary.bind(this);
        this.getJob = this.getJob.bind(this);
        this.updatePublishedAt = this.updatePublishedAt.bind(this);
        this.updateJob = this.updateJob.bind(this);
        this.deleteJob = this.deleteJob.bind(this);

        this.state = {
            currentJob: {
                id: null,
                title: "",
                description: "",
                salary: "",
                company: "",
                publishedAt: Date()
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getJob(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentJob: {
                    ...prevState.currentJob,
                    title: title
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentJob: {
                ...prevState.currentJob,
                description: description
            }
        }));
    }

    onChangeCompany(e) {
        const company = e.target.value;

        this.setState(prevState => ({
            currentJob: {
                ...prevState.currentJob,
                company: company
            }
        }));
    }

    onChangeSalary(e) {
        const salary = e.target.value;

        this.setState(prevState => ({
            currentJob: {
                ...prevState.currentJob,
                salary: salary
            }
        }));
    }

    getJob(id) {
        JobDataService.get(id)
            .then(response => {
                this.setState({
                    currentJob: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updatePublishedAt(status) {
        var data = {
            id: this.state.currentJob.id,
            title: this.state.currentJob.title,
            description: this.state.currentJob.description,
            publishedAt: this.state.publishedAt
        };

        JobDataService.update(this.state.currentJob.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentJob: {
                        ...prevState.currentJob
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateJob() {
        JobDataService.update(
            this.state.currentJob.id,
            this.state.currentJob
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The job was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteJob() {
        JobDataService.delete(this.state.currentJob.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/jobs')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentJob } = this.state;

        return (
            <div>
                {currentJob ? (
                    <div className="edit-form">
                        <h4>Job</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentJob.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentJob.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="company">Company</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="company"
                                    value={currentJob.company}
                                    onChange={this.onChangeCompany}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="salary">Salary</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="salary"
                                    value={currentJob.salary}
                                    onChange={this.onChangeSalary}
                                />
                            </div>

                        </form>

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteJob}
                        >
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateJob}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Job...</p>
                    </div>
                )}
            </div>
        );
    }
}
