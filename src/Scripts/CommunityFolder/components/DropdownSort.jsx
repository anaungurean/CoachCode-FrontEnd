import { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowDownNarrowWide, ArrowUpNarrowWide, CircleUser  } from 'lucide-react';

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
        <div className="relative ">
                        <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center h-10 pl-10 pr-10 border border-gray-100 rounded-md p-2 mb-2 bg-white shadow-md focus:outline-none text-twilight-300"
            >
                {
                    dropdownTitle === 'My Post' 
                        ? <CircleUser size={20} /> 
                        : dropdownTitle === 'Newest' 
                        ? <ArrowDownNarrowWide size={20} /> 
                        : <ArrowUpNarrowWide size={20} />
                }
                <div className="border-l border-gray-300 h-full mx-2"></div>
                <span className={`text-twilight-500 font-semibold text-sm ${dropdownTitle === 'My Post' ? 'whitespace-nowrap' : ''}`}>
                    {dropdownTitle}
                </span>
                <svg className={`w-4 h-4 ml-2 ${isOpen ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            
            {isOpen && (
                <div className="absolute z-100 mb-1 w-full bg-white border border-gray-300 rounded-md shadow-lg bottom-full">
                    <div className="py-1 px-2">
                        <div className="flex flex-col">
                            {options.map(option => (
                                <label key={option.value} className="flex items-center">
                                    <input
                                        type="radio"
                                        value={option.value}
                                        className="form-radio text-twilight-400 border-gray-300 rounded-xl"
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
