import DropdownCheckbox from "./DropdownCheckbox";
import { useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Search } from 'lucide-react';
import JobCard from "./JobCard";
import Pagination from "./Pagination";

export default function FilterJob() {

    const [selectedJobTypes, setSelectedJobTypes] = useState([]);
    const [selectedExperienceLevels, setSelectedExperienceLevels] = useState([]);
    const [selectedPostedTime, setSelectedPostedTime] = useState([]);
    const [selectedFlexibility, setSelectedFlexibility] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState([]);
    const [jobs, setJobs] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(9);
    const [totalPages, setTotalPages] = useState(1);  
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(false);



    const jobTypeOptions = [
        { label: "Full Time", value: "fullTime" },
        { label: "Part Time", value: "partTime" },
        { label: "Contract", value: "contract" },
        { label: "Internship", value: "internship" }
    ];

    const experienceLevelOptions = [
    { label: "Internship", value: "internship" },
    { label: "Entry Level", value: "entryLevel" },
    { label: "Associate", value: "associate" },
    { label: "Mid-Senior Level", value: "midSeniorLevel" },
    { label: "Director", value: "director" },
    { label: "Executive", value: "executive" }
    ];

    const postedTimeOptions = [
        { label: "Any Time", value: "anyTime" },
        { label: "Past 24 hours", value: "past24Hours" },
        { label: "Past Week", value: "pastWeek" },
        { label: "Past Month", value: "pastMonth" },
    ];

    const flexibilityOptions = [
        { label: "Remote", value: "remote" },
        { label: "On-site", value: "onSite" },
        { label: "Hybrid", value: "hybrid" },
    ];

    const locationOptions = [

        { label: "World Wide", value: "92000000" },
        { label: "Bucharest", value: "105889820"},
        { label: "Cluj-Napoca", value: "102471438"},
        { label: "Timisoara", value: "101361548"},
        { label: "Iasi", value: "105511678"},
        { label: "Brasov", value: "105784106"},
        { label: "Sibiu", value:"103440022"},
        { label: "Oradea", value:"104425888"},
        { label: "Arad", value:"101824092"},
        { label: "Craiova", value:"101344143"},
        { label: "Ploiesti", value:"102015953"},
        {label: "Targu Mures", value:"106748577"},
        { label: "Constanta", value:"102445914"}
    ]

    const companyOptions = [
        { label: "Google", value: "1441" },
        // { label: "Facebook", value: "1442" },
        // { label: "Amazon", value: "1443" },
        // { label: "Apple", value: "1444" },
        { label: "Microsoft", value: "1035" },
    ];


    const api_endpoint = 'https://linkedin-api8.p.rapidapi.com/search-jobs-v2';

    const handleFilter = async () => {

        setLoading(true);
        setSearch('true');
        

        const params = {
            jobType: selectedJobTypes.join(','),
            experienceLevel: selectedExperienceLevels.join(','),
            datePosted: selectedPostedTime.join(','),
            onsiteRemote: selectedFlexibility.join(','),
            locationId: selectedLocation.join(','),
            keyword: 'software engineer',  
            companyIds: selectedCompany.join(','),
            titleIds: '9, 25201',
            sort : 'mostRelevant',
        };

        const url = new URL(api_endpoint);
        url.search = new URLSearchParams(params).toString();

        console.log(url.search);

        const options = {
            method: 'GET',
            headers: {
                "X-RapidAPI-Key": "4a56b76aaemsh6ecc8c35a877da9p17eb47jsnd5868075e36e",
                "X-RapidAPI-Host": "linkedin-api8.p.rapidapi.com"
            }
        };

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const result = await response.json();
            console.log(result.data);
            if (result.data) {
            setJobs(result.data);
            setTotalPages(Math.ceil(result.data.length / jobsPerPage));
            setLoading(false);}
            else {
                setJobs([]);
                setLoading(false);
            }



        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
    };
    

    const renderBadges = (filters, options, setSelected) => {
    return filters.map((filter, index) => {
        const label = options.find(option => option.value === filter)?.label;
        return (
            <span key={index} className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 mr-2 mt-2 text-sm font-medium text-purple-700  ring-1 ring-inset border-dotted ring-purple-200 hover:ring-2 shadow-sm">
                {label}
                <button className="ml-1" onClick={() => removeFilter(filter, setSelected)}>
                    <MdOutlineCancel size={14} className="text-purple-300 hover:text-purple-700" />
                </button>
            </span>
        );
    });
};

      const removeFilter = (filter, setSelected) => {
        setSelected(prevFilters => prevFilters.filter(item => item !== filter));
        // handleFilter(); 
    };

 


    return (
        <div> 
    <div className="mt-4 mr-2 pt-4 pb-12 m bg-white border border-twilight-100 rounded-2xl ">

    <div className="grid grid-cols-2 gap-1  ">

             <div className="p-2 ml-2 mr-2 ">
                 <label htmlFor="geo_id" className="block mb-2 font-semibold">Location </label>
                 <DropdownCheckbox
                    title="Select location"
                    options= {locationOptions}
                    selectedOptions={selectedLocation}
                     setSelectedOptions={setSelectedLocation}
 
                />
            </div>
               <div className="p-2 ml-2 mr-2 ">
                 <label htmlFor="company" className="block mb-2 font-semibold">Company </label>
                 <DropdownCheckbox
                    title="Select company"
                    options= {companyOptions}
                    selectedOptions={selectedCompany}
                    setSelectedOptions={setSelectedCompany}
                />
            </div>

            <div className="p-2 ml-2 mr-2 ">
                 <label htmlFor="job-type" className="block mb-2 font-semibold">Job Type</label>
                 <DropdownCheckbox
                    title="Select job type"
                    options= {jobTypeOptions}
                    selectedOptions={selectedJobTypes}
                    setSelectedOptions={setSelectedJobTypes}
                />
            </div>
             <div className="p-2 ml-2 mr-2">
                 <label htmlFor="experience-level" className="block mb-2 font-semibold">Experience level</label>
                 <DropdownCheckbox
                    title="Select experience level"
                    options={[
                        { label: "Internship", value: "internship" },
                        { label: "Entry Level", value: "entryLevel" },
                        { label: "Associate", value: "associate" },
                        { label: "Mid-Senior Level", value: "midSeniorLevel" },
                        { label: "Director", value: "director" },
                        { label: "Executive", value: "executive" }
                    ]}
                    selectedOptions={selectedExperienceLevels}
                    setSelectedOptions={setSelectedExperienceLevels}
                />
            </div>
            <div className="p-2 ml-2 mr-2">
                 <label htmlFor="when" className="block mb-2 font-semibold">Posted time</label>
                 <DropdownCheckbox
                    title="Select posted time"
                    options= {postedTimeOptions}
                    selectedOptions={selectedPostedTime}
                    setSelectedOptions={setSelectedPostedTime}
                />
            </div>


            <div className="p-2 ml-2 mr-2 ">
                 <label htmlFor="flexibility" className="block mb-2 font-semibold">Flexibility</label>
                 <DropdownCheckbox
                    title="Select flexibility"
                    options= {flexibilityOptions}
                    selectedOptions={selectedFlexibility}
                    setSelectedOptions={setSelectedFlexibility}
                />
            </div>
            
           

            <div className="flex flex-wrap mt-4 ml-4 mr-4">
                {renderBadges(selectedJobTypes, jobTypeOptions, setSelectedJobTypes)}
                {renderBadges(selectedExperienceLevels, experienceLevelOptions, setSelectedExperienceLevels)}
                {renderBadges(selectedPostedTime, postedTimeOptions, setSelectedPostedTime)}
                {renderBadges(selectedFlexibility, flexibilityOptions, setSelectedFlexibility)}
                {renderBadges(selectedLocation, locationOptions, setSelectedLocation)}
                {renderBadges(selectedCompany, companyOptions, setSelectedCompany)}
            </div>
        
        </div>

        <div className="flex mt-4 mr-4 ml-4 ">
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

       
        {loading && 
        <div className="text-center mt-4 py-4 bg-white border border-twilight-100 rounded-2xl overflow-hidden text-twilight-500 font-semibold text-xl">
          <div className="flex justify-center items-center flex-row">
          <button type="button" className="text-twilight-100 px-4 py-2 rounded" disabled>
            <svg className="animate-spin h-8 w-8  " viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="twilight-100" strokeWidth="4"></circle>
              <path className="opacity-75" fill="twilight-500" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </button>
             We are searching for jobs...
          </div>
        </div>
      }
            
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            { jobs.length > 0 &&
                jobs
                .slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)
                .map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
        </div>

        { jobs.length > 0 && (
        <div className="mt-4 mb-4">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
        )}

        {
            jobs.length === 0 && !loading && search &&  (
                <div className="text-center mt-4 py-4 bg-white border border-twilight-100 rounded-2xl overflow-hidden text-twilight-500 font-semibold text-xl">
                    <span>No jobs found. Try changing the filters.</span>
                </div>
            )
        }

    </div>

        
 
    );

}

