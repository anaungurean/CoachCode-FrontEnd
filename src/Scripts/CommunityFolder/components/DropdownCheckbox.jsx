import { useState } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'lucide-react';

const DropdownCheckbox = ({ title, options, selectedOptions, setSelectedOptions }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (value) => {
        let newSelectedOptions;
        if (selectedOptions.includes(value)) {
            newSelectedOptions = selectedOptions.filter(option => option !== value);
        } else {
            newSelectedOptions = [...selectedOptions, value];
        }
        setSelectedOptions(newSelectedOptions);
        console.log('Selected options:', newSelectedOptions); 
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex justify-between items-center px-4 py-3 rounded-md focus:outline-none focus:border-twilight-100 bg-purple-50 shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200"
            >
                <Tag size={20} className="mr-2" />
                <span className="text-twilight-500 font-semibold text-sm">{title}</span>
                <svg className={`w-4 h-4 ml-2 ${isOpen ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-100 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1 px-2">
                        <div className="flex flex-col">
                            {options.map(option => (
                                <label key={option.value} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={option.value}
                                        className="form-checkbox h-5 w-5 text-twilight-400 border-gray-300 rounded-xl"
                                        checked={selectedOptions.includes(option.value)}
                                        onChange={() => handleCheckboxChange(option.value)}
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
