import React, { Component } from "react";
import JobDataService from "../services/job.service";
import { Link } from "react-router-dom";

// listing ALL jobs

export default class JobsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveJobs = this.retrieveJobs.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveJob = this.setActiveJob.bind(this);
        this.removeAllJobs = this.removeAllJobs.bind(this);
        this.searchTitle = this.searchTitle.bind(this);

        this.state = {
            jobs: [],
            currentJob: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retrieveJobs();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    // fetching the api to get ALL jobs

    retrieveJobs() {
        JobDataService.getAll()
            .then(response => {
                this.setState({
                    jobs: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveJobs();
        this.setState({
            currentJob: null,
            currentIndex: -1
        });
    }

    setActiveJob(job, index) {
        this.setState({
            currentJob: job,
            currentIndex: index
        });
    }

    removeAllJobs() {
        JobDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    // looking for a specific job by title

    searchTitle() {
        this.setState({
            currentJob: null,
            currentIndex: -1
        });

        JobDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    jobs: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { searchTitle, jobs, currentJob, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by title"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Job Vacancies</h4>

                    <ul className="list-group">
                        {jobs &&
                            jobs.map((job, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveJob(job, index)}
                                    key={index}
                                >
                                    {job.title}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllJobs}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentJob ? (
                        <div>
                            <h4>Job</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentJob.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentJob.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Company:</strong>
                                </label>{" "}
                                {currentJob.company}
                            </div>
                            <div>
                                <label>
                                    <strong>Salary in Euro:</strong>
                                </label>{" "}
                                {currentJob.salary}
                                <span>&nbsp;per hour</span>
                            </div>
                            <div>
                                <label>
                                    <strong>Published At:</strong>
                                </label>{" "}
                                {currentJob.publishedAt}
                            </div>

                            <Link
                                to={"/jobs/" + currentJob.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Job...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
