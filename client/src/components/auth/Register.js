import React, { Component } from "react";

// Importing Component for Form HTML
import TextFieldGroup from "../common/TextFieldGroup";

// this.props.histroy is gonna allow us to use this.props.history to redirect within the Action, we could easily do this task, if we were in the component, but for action we need to take this step and take withRouter
import { withRouter } from "react-router-dom";

// To include our Prop-Types. Its a react thing. Any property you have in your component, you should map to Prop-Types and also we can set them to data type, also if they required or not
import PropTypes from "prop-types";

// Importing classnames so that we can enable conditional statements, whether to add the specific className to any element or not.
import classnames from "classnames";

// for connecting redux to component and also can get state data from connect
import { connect } from "react-redux";

// Importing our Action Creator
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    // "[e.target.name]" will give us the name of field for which this event is called and then the value will be set to that particular state
    this.setState({ [e.target.name]: e.target.value });
  }

  // This runs when component receives new props
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  onSubmit(e) {
    //   It will prevent to reloading after Form-Submission
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    // Any Action that we bring in, we call it through this.props.ActionCreatorName
    // this.props.histroy is gonna allow us to use this.props.history to redirect within the Action, we could easily do this task, if we were in the component, but for action we need to take this step and take withRouter
    this.props.registerUser(newUser, this.props.history);

    // console.log(newUser);
  }

  render() {
    const { errors } = this.state;

    // Just for testing
    // const { user } = this.props.auth;

    return (
      <div className="register">
        {/* {user ? user.name : null} */}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your BinaryDiary</p>
              <form noValidate onSubmit={this.onSubmit.bind(this)}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                ></TextFieldGroup>

                {/* Commenting all this so that we can replace this by our JSX Component which is just above side */}
                {/* <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name,
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange} */}

                {/* // We need not required(HTML5), We have our own  Error-Checking,
                    // required
                  />

                  {/* Setting Up condtional statement for the situation, when we need to print any error coming from backend side */}
                {/* {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div> */}
                {/* Another Component for Email */}

                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  value={this.state.email}
                  type="email"
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                ></TextFieldGroup>

                {/* <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    // One-Way =>
                    // onChange={this.onChange.bind(this)}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div> */}

                {/* Another Component for Password */}

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  type="password"
                  onChange={this.onChange}
                  error={errors.password}
                ></TextFieldGroup>

                {/* <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div> */}
                {/* Another Component for Confirming Password */}

                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  type="password"
                  onChange={this.onChange}
                  error={errors.password2}
                ></TextFieldGroup>

                {/* <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2,
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div> */}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// setting propTypes to our Component
// mapping our Action Creator and auth state to propTypes
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

// This is to get our state.
// Here firstly we are sending only one reducer state, which is auth and then it can be accessed using "this.props.auth"
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors,
  };
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
