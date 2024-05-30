import { useState } from 'react';
import PropTypes from 'prop-types';

const DropdownSort = ({ title, options, selectedOptions, setSelectedOptions, sortByOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownTitle, setDropdownTitle] = useState(title); 

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (value) => {
    const isOptionSelected = selectedOptions.includes(value);

    let newSelectedOptions;
    if (isOptionSelected) {
        newSelectedOptions = selectedOptions.filter(option => option !== value);
        if (dropdownTitle === value) {
            setDropdownTitle(title);
        }
    } else {
        newSelectedOptions = [...selectedOptions, value];
        setDropdownTitle(value);
    }

    setSelectedOptions(newSelectedOptions);
    setIsOpen(false);
    sortByOption(value);
    };



    return (
        <div className="relative">
            <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex  h-10 justify-between items-center p-2 rounded-md focus:outline-none focus:border-twilight-100 bg-white shadow-sm ring-1 ring-inset ring-twilight-300 hover:bg-purple-200"
            >
                <span className={`text-twilight-500 font-semibold text-sm ${dropdownTitle === 'My Post' ? 'whitespace-nowrap' : ''}`}>{dropdownTitle}</span> 
                <svg className={`w-4 h-4 ml-2 ${isOpen ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1 px-2">
                        <div className="flex flex-col">
                            {options.map(option => (
                                <label key={option.value} className="flex items-center">
                                    <input
                                        type="radio"
                                        value={option.value}
                                        className="form-checkbox text-twilight-400 border-gray-300 rounded-xl"
                                        checked={dropdownTitle === option.value}
                                        onChange={() => handleCheckboxChange(option.value)}
                                    />
                                    <span className={`ml-2 ${dropdownTitle === 'My Post' ? 'whitespace-nowrap' : ''}`}>{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

DropdownSort.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedOptions: PropTypes.array.isRequired,
    setSelectedOptions: PropTypes.func.isRequired,
    sortByOption: PropTypes.func.isRequired,
};

export default DropdownSort;
