import Auth from "../../service/auth";
import React, { Component } from "react";

const AuthService = new Auth();


export default class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
        this.onChangeUserPassword = this.onChangeUserPassword.bind(this);
        this.submitForm = this.submitForm.bind(this);

        this.state = {
            email: '',
            password: '',
            error: null,
            isLoading: false
        }
    }


    async submitForm(e) {
        e.preventDefault();
        this.setState({ isLoading: true });

        const { email, password } = this.state;

        try {
            const response = await AuthService.login(email, password);
            console.log(response.access_token);
            AuthService.setTokeN(response.access_token);
        } catch (e) {
            console.log('error');
            this.setState({ error: e.response.data });

        } finally {
            console.log('acabou');
            this.setState({ isLoading: false });
        }
    }



    onChangeUserEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangeUserPassword(e) {
        this.setState({ password: e.target.value })
    }




    render() {

        return (
            <div className="bg-white py-10 px-5 rounded shadow" >
                <div class="text-red-500 text-sm">{this.state.error?.message}</div>

                <form onSubmit={this.submitForm} className="mt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        <div className="col-span-12">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700" >
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className={(this.state.error?.errors?.email[0] ? ' border border-red-500 focus:border-red-700' : 'focus:border-indigo-500'), 'p-2 border shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'}
                                        onChange={this.onChangeUserEmail}
                                        value={this.state.email}
                                        disabled={this.state.isLoading}
                                    />
                                    <div class="text-red-500 text-sm">{this.state.error?.errors?.email[0]}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Senha
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className={(this.state.error?.errors?.password[0] ? ' border border-red-500 focus:border-red-700' : 'focus:border-indigo-500'), 'p-2 border shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'} value={this.state.password}

                                        onChange={this.onChangeUserPassword}
                                        disabled={this.state.isLoading}
                                    />
                                    <div class="text-red-500 text-sm">{this.state.error?.errors?.password[0]}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <button className="w-full  font-medium text-sm text-white bg-indigo-500 hover:bg-indigo-700 px-5 py-2 rounded shadow " type="submit" disabled={this.state.isLoading}>Login</button>
                        </div>

                    </div>
                </form >

            </div >
        );
    }

}

