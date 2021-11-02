import { NavLink } from 'react-router-dom';

import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useLocation } from 'react-router-dom';




const navigation = [
    { name: 'Dashboard', href: '/', current: true },
    { name: 'Cadastrar Boletos', href: '/createBillet', current: false },
];

export default function NavBar() {
    const location = useLocation();
    function getRouterName() {

        switch (location.pathname) {
            case '/':
                return 'Dashboard';
            case '/createBillet':
                return 'Cadastrar Boletos';
            case '/login':
                return 'Login';
            case '/register':
                return 'Register';
            default:
                return 'Dashboard';
        }
    }


    return <div className="bg-gray-800 pb-32">
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="border-b border-gray-700">
                            <div className="flex items-center justify-between h-16">

                                <div className="hidden md:block">
                                    <div className=" flex justify-between w-full">
                                        <div>
                                            {navigation.map((item) => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.href}

                                                    activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                                    className=" text-white px-3 py-2 rounded-md text-sm font-medium"
                                                    exact
                                                    aria-current={item.current ? 'page' : undefined}>{item.name}</NavLink>

                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <button
                                            type="button"
                                            className="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                        >
                                            <span className="sr-only">View notifications</span>
                                        </button>


                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                        <div className="px-2 py-3 space-y-1 sm:px-3">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                                    className=" text-white px-3 py-2 rounded-md text-sm font-medium"
                                    exact
                                    aria-current={item.current ? 'page' : undefined}>{item.name}</NavLink>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
        <header className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white">{getRouterName()}</h1>
            </div>
        </header>
    </div >
}