import Billet from "../service/billet";
import React from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)
const BilletService = new Billet();


export default class BilletsPage extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            billets: []
        };

        this.destroyBillet = this.destroyBillet.bind(this);
    }

    async componentDidMount() {
        this.fetchBillets();
    }

    toBRLCurrency(value) {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    async fetchBillets() {
        try {
            MySwal.showLoading();
            const { data } = await BilletService.getAll();

            this.setState({ billets: data });
            MySwal.close();


        } catch (error) {
            MySwal.fire("Erro!", "Falha ao buscar contas", "error")
        } finally {
            this.setState({ isLoading: false });
        }
    }

    async destroyBillet(billetId) {
        MySwal.showLoading();
        try {
            await BilletService.destroy(billetId);

            MySwal.fire("Sucesso!", "Conta deletada", "success").then(() => {
                const filter = this.state.billets.filter(billet => billet.id != billetId);
                this.setState({ billets: filter });
            });
        } catch (error) {
            MySwal.fire("Erro!", "Falha ao deletar conta", "error");
        } finally {
            this.setState({ isLoading: false });
        }
    }

    goToEdit(id) {
        this.props.history.push(`/createBillet/${id}`)
    }

    render() {


        if (!this.state.billets.length && !this.state.isLoading) {
            return <div className="text-gray-300">Nenhuma conta encontrada</div>
        }

        if (this.state.isLoading) {
            return <div className="text-gray-300">Carregando...</div>
        }

        return (
            <div className="flex flex-col" >
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Nome
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Valor
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Vencimento
                                        </th>

                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.billets?.map((billet, personIdx) => (
                                        <tr key={billet?.name} className={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{billet?.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{this.toBRLCurrency(billet?.price)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{billet?.due_date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-5">
                                                <a onClick={() => { this.goToEdit(billet.id) }} className="text-indigo-600 hover:text-indigo-900 cursor-pointer">
                                                    Editar
                                                </a>
                                                <a onClick={() => { this.destroyBillet(billet.id) }} className="text-red-600 hover:text-red-900 cursor-pointer">
                                                    Deletar
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );

    }

}


