import { useState,useEffect} from "react";
import DropdownCheckbox from "./DropdownCheckbox";
import PropTypes from 'prop-types';
import { MdOutlineCancel } from "react-icons/md";


export default function FilterComponent({ onFilter, problems }) {

    FilterComponent.propTypes = {
    onFilter: PropTypes.func.isRequired,
    problems: PropTypes.array.isRequired 
};
    const [expanded, setExpanded] = useState(false);
    const [titleFilter, setTitleFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState([]);
    const [selectedAskedByFaang, setSelectedAskedByFaang] = useState([]);
    const topics = [
        "Bit Manipulation",
        "Dynamic Programming",
        "Divide and Conquer",
        "Hash Table",
        "Breadth-first Search",
        "Memoization",
        "Rejection Sampling",
        "Heap",
        "Array",
        "Binary Search",
        "Brainteaser",
        "Recursion",
        "Greedy",
        "Graph",
        "Minimax",
        "Ordered Map",
        "Union Find",
        "Math",
        "Trie",
        "Binary Search Tree",
        "Random",
        "Sort",
        "Binary Indexed Tree",
        "Sliding Window",
        "Meet in the Middle",
        "Reservoir Sampling",
        "Segment Tree",
        "Rolling Hash",
        "OOP",
        "Linked List",
        "Dequeue",
        "Topological Sort",
        "Design",
        "Tree",
        "Stack",
        "Queue",
        "Line Sweep",
        "String",
        "Geometry",
        "Depth-first Search",
        "Two Pointers",
        "Suffix Array",
        "Backtracking"
    ];

    const companies = [
    "ServiceNow",
    "C3 IoT",
    "Wayfair",
    "Karat",
    "Lucid",
    "Atlassian",
    "Paypal",
    "LiveRamp",
    "LinkedIn",
    "Pinterest",
    "Sumologic",
    "Mercari",
    "Trexquant",
    "AllinCall",
    "Virtu Financial",
    "Morgan Stanley",
    "Arcesium",
    "VMware",
    "Houzz",
    "endurance",
    "Unacademy",
    "Brillio",
    "United Health Group",
    "DoorDash",
    "Intuit",
    "Fleetx",
    "Pocket Gems",
    "Lendingkart",
    "peak6",
    "Splunk",
    "Hotstar",
    "Alibaba",
    "Whole Foods Market",
    "Booking.com",
    "eBay",
    "Activision",
    "MindTickle",
    "Zenefits",
    "Grab",
    "Startup",
    "MAQ Software",
    "American Express",
    "Zoom",
    "Visa",
    "Walmart",
    "GoDaddy",
    "Pony.ai",
    "Asana",
    "Accolite",
    "Sumerge",
    "Epic Systems",
    "JPMorgan",
    "Cloudera",
    "Databricks",
    "Akamai",
    "Tencent",
    "Airbnb",
    "Citadel",
    "Garena",
    "HRT",
    "Goldman Sachs",
    "Rupeek",
    "Hulu",
    "Netflix",
    "Sprinklr",
    "CureFit",
    "Qualtrics",
    "Cashfree",
    "Tesla",
    "Uber",
    "Machine Zone",
    "Zillow",
    "Amazon",
    "Lyft",
    "PayTM",
    "SAP",
    "Opendoor",
    "Walmart Labs",
    "Audible",
    "HBO",
    "Citrix",
    "FactSet",
    "Airtel",
    "Cisco",
    "NerdWallet",
    "Valve",
    "Pure Storage",
    "Leap Motion",
    "Wish",
    "Yahoo",
    "tcs",
    "Reddit",
    "Adobe",
    "Point72",
    "NetEase",
    "C3.ai",
    "Palantir Technologies",
    "Microstrategy",
    "Spotify",
    "codeagon",
    "Indeed",
    "ByteDance",
    "Optum",
    "Flipkart",
    "Apple",
    "Yelp",
    "Ajira",
    "Nuro",
    "Dunzo",
    "HeavyWater",
    "InMobi",
    "Turvo",
    "Works Applications",
    "Bloomreach",
    "Swiggy",
    "Robinhood",
    "Samsung",
    "Dream11",
    "Docusign",
    "edabit",
    "Infosys",
    "Bloomberg",
    "Intel",
    "Rubrik",
    "Delivery Hero",
    "Salesforce",
    "Affirm",
    "Blizzard",
    "Directi",
    "GSN Games",
    "Softwire",
    "JP Morgan",
    "Microsoft",
    "National Instruments",
    "Alation",
    "Jane Street",
    "Arista Networks",
    "Zalando",
    "APT Portfolio",
    "BlackRock",
    "Capital One",
    "Duolingo",
    "Oracle",
    "UiPath",
    "Dropbox",
    "TSYS",
    "Postmates",
    "Two Sigma",
    "CoderByte",
    "AppDynamics",
    "Barclays",
    "Roblox",
    "Sapient",
    "Codenation",
    "Square",
    "Coursera",
    "Quora",
    "Snapchat",
    "DE Shaw",
    "Mathworks",
    "Vimeo",
    "ZScaler",
    "Netsuite",
    "Twitter",
    "Akuna Capital",
    "DJI",
    "Twitch",
    "DRW",
    "IBM",
    "Nvidia",
    "Expedia",
    "Gilt Groupe",
    "Media.net",
    "TripleByte",
    "SoundHound",
    "Kakao",
    "Booking",
    "Huwaei",
    "Clutter",
    "Redfin",
    "Yandex",
    "MakeMyTrip",
    "Coupang",
    "Thumbtack",
    "Toptal",
    "Google",
    "Poshmark",
    "Nutanix",
    "Facebook",
    "TripAdvisor",
    "Twilio",
    "Huawei",
    "Box",
    "Nagarro",
    "MachineZone",
    "Traveloka",
    "OT",
    "IXL",
    "DiDi",
    "Qualcomm"
];


    const toggleFilter = () => {
        setExpanded(prevExpanded => !prevExpanded);
    };

    const handleFilter = () => {
        
    const filterCriteria = {
        title: titleFilter,
        id: idFilter,
        companies: selectedCompanies,
        topics: selectedTopics,
        difficulty: selectedDifficulty,
        askedByFaang: selectedAskedByFaang
    };


     const filteredProblems = problems.filter(problem => {
     
        if (filterCriteria.id && problem.id.toString().trim().toLowerCase() !== filterCriteria.id.trim().toLowerCase()) {
            return false;
        }

        if (filterCriteria.title && !problem.title.toLowerCase().includes(filterCriteria.title.toLowerCase())) {
            return false;
        }

        if (filterCriteria.companies && filterCriteria.companies.length > 0) {
        const problemCompanies = problem.companies.split(',').map(company => company.trim());
        const companyMatches = filterCriteria.companies.some(company => problemCompanies.includes(company));
        if (!companyMatches) {
            return false;
        }}

       
        if (filterCriteria.topics && filterCriteria.topics.length > 0) {
        const problemTopics = problem.related_topics.split(',').map(topic => topic.trim());
        const topicMatches = filterCriteria.topics.some(topic => problemTopics.includes(topic));
        if (!topicMatches) {
            return false;
        }}

  

        if (filterCriteria.difficulty && filterCriteria.difficulty.length > 0) {
        const difficultyOptions = filterCriteria.difficulty.map(option => option.toLowerCase());
        if (!difficultyOptions.includes(problem.difficulty.toLowerCase())) {
            return false;
        }}

       

        if (filterCriteria.askedByFaang && filterCriteria.askedByFaang.length > 0) {
        const askedByFaang = problem.asked_by_faang;
        const askedByFaangMatches = filterCriteria.askedByFaang.includes(askedByFaang ? 'Asked by FAANG' : 'Not asked by FAANG');
        if (!askedByFaangMatches) {
            return false;
        } 
    }

        return true;
    });

    onFilter(filteredProblems);
    };

    useEffect(() => {
        handleFilter(); // Apelează funcția de filtrare când se schimbă oricare dintre filtre
    }, [titleFilter, idFilter, selectedCompanies, selectedTopics, selectedDifficulty, selectedAskedByFaang]);


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
        <div className="w-full">
            <div className="flex items-center justify-between bg-gradient-to-r from-twilight-100 to-purple-100  px-4 py-3 rounded-2xl cursor-pointer text-twilight-500 mt-4 mr-2" onClick={toggleFilter}>
                <h3 className="text-lg font-semibold">Find faster what you want to practice </h3>
                <svg className={`w-6 h-6 ${expanded ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {expanded && (
                <div className="mt-4 mr-2 pt-4 pb-20 bg-white border border-twilight-100 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-2 gap-1 ">
                    <div className="p-2 ml-2 ">
                        <label htmlFor="title" className="block mb-2 font-semibold">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={titleFilter}
                            onChange={(e) => setTitleFilter(e.target.value)}
                            placeholder="Enter title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-twilight-300"
                        />
                    </div>
                    <div className="p-2 mr-2 ">
                        <label htmlFor="id" className="block mb-2 font-semibold">ID</label>
                        <input
                            type="text"
                            id="id"
                            value={idFilter}
                            onChange={(e) => setIdFilter(e.target.value)}
                            placeholder="Enter ID"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-twilight-300"
                        />
                    </div>
                   
                    <div className="p-2 ml-2 ">
                        <label htmlFor="company" className="block mb-2 font-semibold">Company</label>
                        <DropdownCheckbox
                            title="Select company"
                            options={companies.map(company => ({
                                label: company,
                                value: company
                            })).sort((a, b) => a.label.localeCompare(b.label))}
                            selectedOptions={selectedCompanies}
                            setSelectedOptions={setSelectedCompanies}
                        />
                    </div>
                    <div className="p-2 mr-2 ">
                        <label htmlFor="related-topics" className="block mb-2 font-semibold">Related Topics</label>
                        <DropdownCheckbox
                            title="Select related topics"
                            options={topics.map(topic => ({
                                label: topic,
                                value: topic
                            })).sort((a, b) => a.label.localeCompare(b.label))}
                            selectedOptions={selectedTopics}
                            setSelectedOptions={setSelectedTopics}
                        />
                    </div>
                     <div className="p-2 ml-2 ">
                        <label htmlFor="difficulty" className="block mb-2 font-semibold">Difficulty</label>
                        <DropdownCheckbox
                            title="Select difficulty"
                            options={[
                                { label: 'Easy', value: 'Easy' },
                                { label: 'Medium', value: 'Medium' },
                                { label: 'Hard', value: 'Hard' }
                            ]}
                            selectedOptions={selectedDifficulty}
                            setSelectedOptions={setSelectedDifficulty}
                        />
                    </div>

                    <div className="p-2 mr-2 ">
                        <label htmlFor="asked-by-FAANG" className="block mb-2 font-semibold">Asked by FAANG</label>
                        <DropdownCheckbox
                            title="Select choice"
                            options={[
                                { label: 'Yes', value: 'Asked by FAANG' },
                                { label: 'No', value: 'Not asked by FAANG' },
                            ]}
                            selectedOptions={selectedAskedByFaang}
                            setSelectedOptions={setSelectedAskedByFaang}
                        />
                    </div>

                </div>
        {/* <div className="flex mr-2 ml-2">
                    <button 
                        onClick={handleFilter} 
                        className="w-full mr-2 ml-2 mt-4 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl md:bg-gradient-to-r from-twilight-100 to-purple-100 text-white text-lg font-bold">
                        <div className="flex items-center ">
                            <Search className="w-6 h-6 ml-4 text-twilight-500 mr-2" />
                            <span className="text-twilight-500 text-xl font-semibold">Filter</span>
                        </div>
                    </button>
        </div> */}

         <div className="flex flex-wrap mt-4 ml-4 mr-2">
                {renderBadges(selectedCompanies, setSelectedCompanies)}
                {renderBadges(selectedTopics, setSelectedTopics)}
                {renderBadges(selectedDifficulty, setSelectedDifficulty)}
                {renderBadges(selectedAskedByFaang, setSelectedAskedByFaang)}
        </div>

    </div>
                
            )}
        </div>
    );
}

