
import Billet from "../service/billet";
import React from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal)
const BilletService = new Billet();

export default class CreateBilletPage extends React.Component {

    constructor(props) {
        super(props)

        console.log(props)

        this.onChangeFormName = this.onChangeFormName.bind(this);
        this.onChangeFormDueDate = this.onChangeFormDueDate.bind(this);
        this.onChangeFormPrice = this.onChangeFormPrice.bind(this);
        this.submitForm = this.submitForm.bind(this);

        this.state = {
            name: '',
            price: '',
            due_date: '',
            error: null,
        }
    }

    async submitForm(e) {
        e.preventDefault();
        MySwal.showLoading();


        const { name, price, due_date } = this.state;

        try {
            await BilletService.create({ name, price, due_date });
            MySwal.fire("Sucesso!", "Conta cadastrada", "success").then(() => {
                this.props.history.push('/');
            })
        } catch (e) {
            console.log('error');
            this.setState({ error: e.response.data });
            MySwal.fire("Erro!", "Falha ao criar conta", "error");
        } finally {
            console.log('acabou');
        }
    }



    onChangeFormName(e) {
        this.setState({ name: e.target.value })
    }

    onChangeFormDueDate(e) {
        this.setState({ due_date: e.target.value })
    }

    onChangeFormPrice(e) {
        this.setState({ price: e.target.value })
    }

    render() {
        return (
            <div >
                <form onSubmit={this.submitForm}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                            <div class="text-red-500 text-sm">{this.state.error?.message}</div>

                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className={(this.state.error?.errors?.name[0] ? ' border border-red-500 focus:border-red-700' : 'focus:border-indigo-500'), 'p-2 border shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'}
                                        onChange={this.onChangeFormName}
                                    />
                                    <div className="text-red-500 text-sm">{this.state.error?.errors?.name[0]}</div>

                                </div>



                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                        Valor
                                    </label>
                                    <input
                                        type="text"
                                        name="email-address"
                                        id="email-address"
                                        autoComplete="email"
                                        className={(this.state.error?.errors?.price[0] ? ' border border-red-500 focus:border-red-700' : 'focus:border-indigo-500'), 'p-2 border shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'}
                                        onChange={this.onChangeFormPrice}
                                    />
                                    <div className="text-red-500 text-sm">{this.state.error?.errors?.price[0]}</div>

                                </div>



                                <div className="col-span-6">
                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                        Vencimento
                                    </label>
                                    <input
                                        type="date"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className={(this.state.error?.errors?.due_date[0] ? ' border border-red-500 focus:border-red-700' : 'focus:border-indigo-500'), 'p-2 border shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'}
                                        onChange={this.onChangeFormDueDate}
                                    />
                                    <div className="text-red-500 text-sm">{this.state.error?.errors?.due_date[0]}</div>

                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                className=
                                'bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'

                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        );

    }


}

