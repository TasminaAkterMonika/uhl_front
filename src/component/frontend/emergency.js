import React, { Component } from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { scAxiosAdmin } from "../..";
class ServiceFormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            homeToHospital: false,
            hospitalToHospital: false,
            ambulanceService: false,
            address: "",
            document: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }

    handleSubmit(event) {
        event.preventDefault();
        scAxiosAdmin.request('/emergency', {
            method: 'get',
            headers: {
                'Accept': 'application/json'
            },
            params: {
                ...this.state
            },
        });
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <Route component={Header} />
                <div>
                    <section className="banner-hero">
                        <img
                            src="/static/media/banner-profile.f160a4c1.jpg"
                            alt="banner-profile"
                            className="w-100"
                        />
                    </section>
                    <section className="prof-dr">
                        <div className="container">
                            <div className="box-of-about border-part my-4">

                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <h2 className=" text-left"  >Request for a service</h2>
                                            <div className="text-profile ">
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="form-group form-check">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="homeToHospital"
                                                            name="homeToHospital"
                                                            checked={this.state.homeToHospital}
                                                            onChange={this.handleInputChange}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="homeToHospital"
                                                        >
                                                            Home to Hospital
                                                        </label>
                                                    </div>
                                                    <div className="form-group form-check" >
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="hospitalToHospital"
                                                            name="hospitalToHospital"
                                                            checked={this.state.hospitalToHospital}
                                                            onChange={this.handleInputChange}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="hospitalToHospital"
                                                        >
                                                            Hospital to Hospital
                                                        </label>
                                                    </div>
                                                    <div className="form-group form-check">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="ambulanceService"
                                                            name="ambulanceService"
                                                            checked={this.state.ambulanceService}
                                                            onChange={this.handleInputChange}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="ambulanceService"
                                                        >
                                                            Ambulance Service
                                                        </label>
                                                    </div>

                                                    <div className="form-group">
                                                        <label htmlFor="firstName">First Name:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="firstName"
                                                            name="firstName"
                                                            value={this.state.firstName}
                                                            onChange={this.handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="lastName">Last Name:</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="lastName"
                                                            name="lastName"
                                                            value={this.state.lastName}
                                                            onChange={this.handleInputChange}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="phoneNumber">Phone Number:</label>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            id="phoneNumber"
                                                            name="phoneNumber"
                                                            value={this.state.phoneNumber}
                                                            onChange={this.handleInputChange}
                                                            required
                                                        />
                                                    </div>

                                                    {this.state.ambulanceService && (
                                                        <div className="form-group">
                                                            <label htmlFor="address">Address:</label>
                                                            <textarea
                                                                className="form-control"
                                                                id="address"
                                                                name="address"
                                                                value={this.state.address}
                                                                onChange={this.handleInputChange}
                                                                required
                                                            ></textarea>
                                                        </div>
                                                    )}
                                                    <div className="form-group">
                                                        <label htmlFor="document">Document Upload:</label>
                                                        <input
                                                            type="file"
                                                            className="form-control-file"
                                                            id="document"
                                                            name="document"
                                                            onChange={this.handleInputChange}
                                                        />
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="text-center category-list-link open-cat-list border-0 rounded"
                                                    >
                                                        Submit
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                        <div class="col-md-4 bg-white p-0">
                                            <h1 className="text-center category-list-link open-cat-list">
                                                Call Emergency Line
                                            </h1>
                                            <h1 className="text-center">
                                                <a
                                                    className="text-decoration-none text-primary"
                                                    href="tel:10666"
                                                >
                                                    <i className="fa fa-phone"></i>
                                                    { } 10666
                                                </a>
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <Route component={Footer} />
            </div>
        );
    }
}

export default ServiceFormView;