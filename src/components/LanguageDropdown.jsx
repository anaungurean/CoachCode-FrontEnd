import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDown } from 'lucide-react';

const Languages = [
  'C++',
  'Java',
  'Python',
  'Python3',
  'C',
  'C#',
  'JavaScript',
  'TypeScript',
  'PHP',
  'Swift',
  'Kotlin',
  'Dart',
  'Go',
  'Ruby',
  'Scala',
  'Rust',
  'Racket',
  'Erlang',
  'Elixir'
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [iconRotation, setIconRotation] = useState(0);

  const rotateIcon = () => {
    setIconRotation(iconRotation === 0 ? 180 : 0);
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-twilight-100/10 px-3 py-2 text-sm font-semibold text-twilight-500 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-twilight-50" onClick={rotateIcon}>
          {selectedLanguage || "Programming Language"}
          <ChevronDown className={`-mr-1 h-5 w-5 text-twilight-400 transform transition-transform ${iconRotation === 180 ? 'rotate-180' : ''}`} aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-twilight-500 ring-opacity-5 focus:outline-none overflow-y-auto max-h-40">
          <div className="py-1">
            {Languages.map((language, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    className={classNames(
                    active ? 'bg-twilight-100/10  text-twilight-400' : 'text-twilight-500',
                    'block px-4 py-2 text-sm'
                    )}
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {language}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
