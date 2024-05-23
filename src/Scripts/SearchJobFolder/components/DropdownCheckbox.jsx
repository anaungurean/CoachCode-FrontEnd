import { useState } from 'react';
import PropTypes from 'prop-types';

const DropdownCheckbox = ({ title, options, selectedOptions, setSelectedOptions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (value) => {
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter(option => option !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative"> 
            <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex justify-between items-center w-full px-4 py-2  border border-gray-300 rounded-md focus:outline-none focus:border-twilight-100"
            >
                <span className="text-gray-400">{title}</span>
                <svg className={`w-6 h-6 ${isOpen ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
                    <div className="py-1 px-2">
                      { options.length > 10 &&
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-twilight-200 mb-2 mr-2"
                            />
                        </div>
                        }
                        <div className="overflow-y-auto max-h-32 w-full p-2 ">
                            {filteredOptions.map(option => (
                                <label key={option.value} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={option.value}
                                        checked={selectedOptions.includes(option.value)}
                                        onChange={() => handleCheckboxChange(option.value)}
                                        className="form-checkbox h-5 w-5 text-twilight-400 border-gray-300 rounded-xl"
                                    />
                                    <span className="ml-2">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

DropdownCheckbox.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedOptions: PropTypes.array.isRequired,
    setSelectedOptions: PropTypes.func.isRequired,
};

export default DropdownCheckbox;
