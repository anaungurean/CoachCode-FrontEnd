import DropdownCheckbox from "./DropdownCheckbox";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Search } from 'lucide-react';

export default function FilterJob() {

    const [selectedJobTypes, setSelectedJobTypes] = useState([]);
    const [selectedExperienceLevels, setSelectedExperienceLevels] = useState([]);
    const [selectedPostedTime, setSelectedPostedTime] = useState([]);
    const [selectedFlexibility, setSelectedFlexibility] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState([]);

    const api_key = 'Ym9If9c0eOj041te3hj7dw';
    const api_endpoint = 'https://nubela.co/proxycurl/api/v2/linkedin/company/job';

    const handleFilter = () => {
        
        const params = {
            job_type: selectedJobTypes.join(','),
            experience_level: selectedExperienceLevels.join(','),
            when: selectedPostedTime.join(','),
            flexibility: selectedFlexibility.join(','),
            geo_id: selectedLocation.join(','),
            keyword: 'software engineer',  // Static keyword for demonstration
            search_id: selectedCompany.join(','),
        };

        console.log(api_endpoint + '?' + new URLSearchParams(params));

        fetch(`${api_endpoint}?${new URLSearchParams(params)}`, {
            headers: {
                'Authorization': `Bearer ${api_key}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Handle the API response data here
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    };

    

    const renderBadges = (filters, setSelected) => {
        return filters.map((filter, index) => (
            <span key={index} className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 mr-2 mt-2 text-sm font-medium text-purple-700  ring-1 ring-inset border-dotted ring-purple-200 hover:ring-2 shadow-sm">
                {filter}
                <button className="ml-1" onClick={() => removeFilter(filter, setSelected)}>
                <MdOutlineCancel size={14} className="text-purple-300 hover:text-purple-700" />
                </button>
            </span>
        ));
    };

      const removeFilter = (filter, setSelected) => {
        setSelected(prevFilters => prevFilters.filter(item => item !== filter));
        handleFilter(); // Trigger filtering again after removing a filter
    };


    return (
    <div className="mt-4 mr-2 pt-4 pb-20 m bg-white border border-twilight-100 rounded-2xl overflow-hidden">

    <div className="grid grid-cols-2 gap-1  ">
              <div className="p-2 ml-2 ">
                 <label htmlFor="job-type" className="block mb-2 font-semibold">Job Type</label>
                 <DropdownCheckbox
                    title="Select job type"
                    options={[
                        { label: "Full Time", value: "full-time" },
                        { label: "Part Time", value: "part-time" },
                        { label: "Contract", value: "contract" },
                        { label: "Internship", value: "internship" },
                        { label: "Temporary", value: "temporary" },
                        { label: "Volunteer", value: "volunteer" },

                    ]}
                    selectedOptions={selectedJobTypes}
                    setSelectedOptions={setSelectedJobTypes}
                />
            </div>
             <div className="p-2 ml-2 ">
                 <label htmlFor="experience-level" className="block mb-2 font-semibold">Experience level</label>
                 <DropdownCheckbox
                    title="Select experience level"
                    options={[
                        { label: "Internship", value: "internship" },
                        { label: "Entry Level", value: "entry_level" },
                        { label: "Associate", value: "associate" },
                        { label: "Mid-Senior Level", value: "mid_senior_level" },
                        { label: "Director", value: "director" },
                    ]}
                    selectedOptions={selectedExperienceLevels}
                    setSelectedOptions={setSelectedExperienceLevels}
                />
            </div>
            <div className="p-2 ml-2 ">
                 <label htmlFor="when" className="block mb-2 font-semibold">Posted time</label>
                 <DropdownCheckbox
                    title="Select posted time"
                    options={[
                        { label: "Yesterday", value: "yesterday" },
                        { label: "Past week", value: "past-week" },
                        { label: "Past month", value: "past-month" },
                    ]}
                    selectedOptions={selectedPostedTime}
                    setSelectedOptions={setSelectedPostedTime}
                />
            </div>
            <div className="p-2 ml-2 ">
                 <label htmlFor="flexibility" className="block mb-2 font-semibold">Flexibility</label>
                 <DropdownCheckbox
                    title="Select flexibility"
                    options={[
                       { label: "Remote", value: "remote" },
                       { label: "On-site", value: "on-site" },
                       { label: "Hybrid", value: "hybrid" },
                    ]}
                    selectedOptions={selectedFlexibility}
                    setSelectedOptions={setSelectedFlexibility}
                />
            </div>
                <div className="p-2 ml-2 ">
                 <label htmlFor="geo_id" className="block mb-2 font-semibold">Location </label>
                 <DropdownCheckbox
                    title="Select location"
                    options={[
                       { label: "World Wide", value: "92000000" },
                    ]}
                    selectedOptions={selectedLocation}
                    setSelectedOptions={setSelectedLocation}
                />
            </div>
               <div className="p-2 ml-2 ">
                 <label htmlFor="company" className="block mb-2 font-semibold">Company </label>
                 <DropdownCheckbox
                    title="Select company"
                    options={[
                       { label: "Google", value: "1441" },
                    //    { label: "Facebook", value: "1442" },
                    //    { label: "Amazon", value: "1443" },
                    //    { label: "Apple", value: "1444" },
                      { label: "Microsoft", value: "1035" },
                    ]}
                    selectedOptions={selectedCompany}
                    setSelectedOptions={setSelectedCompany}
                />
            </div>


            
            <div className="flex flex-wrap mt-4 ml-4 mr-2">
                {renderBadges(selectedJobTypes, setSelectedJobTypes)}
                {renderBadges(selectedExperienceLevels, setSelectedExperienceLevels)}
                {renderBadges(selectedPostedTime, setSelectedPostedTime)}
                {renderBadges(selectedFlexibility, setSelectedFlexibility)}
                {renderBadges(selectedLocation, setSelectedLocation)}
                {renderBadges(selectedCompany, setSelectedCompany)}
            </div>
        
        </div>

   <div className="flex mt-4 mr-2 ml-2 ">
        <button 
            onClick={handleFilter} 
            className="w-full active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-1 rounded-xl md:bg-gradient-to-r from-twilight-100 to-purple-100 text-white text-lg font-bold">
            <div className="flex items-center justify-center">
                <Search className="w-6 h-6 ml-4 text-twilight-500 mr-2" />
                <span className="text-twilight-500 text-xl font-semibold">Find your job </span>
            </div>
        </button>
    </div>
</div>



    
    );

}

