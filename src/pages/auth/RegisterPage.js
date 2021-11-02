import Auth from "../../service/auth";
import React from "react";

const AuthService = new Auth();



const RegisterPage = () => {

    const [formValue, setformValue] = React.useState({
        email: '',
        password: ''
    });

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.register(formValue.email, formValue.password);
            console.log(response.data.access_token);
            AuthService.setTokeN(response.data.access_token);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event) => {
        setformValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    }



    return (
        <div className="bg-white py-10 px-5 rounded shadow" >

            <form onSubmit={signIn}>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="col-span-12">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700" onChange={handleChange}>
                                Email
                            </label>
                            <div className="mt-1">
                                <input
                                    type="tre"
                                    name="email"
                                    id="email"
                                    className="p-2 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="you@example.com"
                                    value={formValue.email}
                                    onChange={handleChange}
                                />
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
                                    className="p-2 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    value={formValue.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <button className="w-full p-2 font-medium text-sm text-white bg-indigo-500 hover:bg-indigo-700 px-5 py-1 rounded shadow " type="submit">Login</button>

                    </div>
                </div>
            </form>

        </div>
    );

}

export default RegisterPage;