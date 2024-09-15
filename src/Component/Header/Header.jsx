import { useState, useEffect } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate, useLocation } from 'react-router-dom';

const initialNavigation = [
  { name: 'Home', href: '/', current: true },  // Home is true by default
  { name: 'About', href: '/about', current: false },
  { name: 'Videos', href: '/videos', current: false },
  { name: 'Library', href: '/library', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const [navigation, setNavigation] = useState(initialNavigation);
  const navigate = useNavigate();
  const location = useLocation();

  // Update the current route in the navigation array
  useEffect(() => {
    setNavigation((prevNavigation) =>
      prevNavigation.map((item) => ({
        ...item,
        // Set "Home" to true only if the pathname is exactly "/"
        current: location.pathname === item.href,
      }))
    );
  }, [location.pathname]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <p
                    key={item.name}
                    onClick={() => navigate(item.href)}
                    className={classNames(
                      item.current ? 'bg-sky-900 text-white'  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
                    )}
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs4VZjWaF6rLr7L1f9VC5OJ-0dohREglolvr5qorhFt-YrC-dP0oWP7HKoHcUJGMZavLk&usqp=CAU"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
              >
                <MenuItem>
                  <b onClick={() => { navigate('/profile'); }} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer">
                    Your Profile
                  </b>
                </MenuItem>
                {/* <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700">
                    Settings
                  </a>
                </MenuItem> */}
                <MenuItem>
                  <b onClick={() => { localStorage.clear(); navigate('/'); }} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer">
                    Sign out
                  </b>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              onClick={() => navigate(item.href)}
              className={classNames(
                item.current ? 'bg-sky-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
