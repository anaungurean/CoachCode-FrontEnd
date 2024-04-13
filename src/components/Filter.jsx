import { useState } from "react";

export default function FilterComponent({ onFilter, selectedCompany, selectedTopics }) {
    const [expanded, setExpanded] = useState(false);
    const [titleFilter, setTitleFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const [companyFilter, setCompanyFilter] = useState(selectedCompany || '');
    const [relatedTopicsFilter, setRelatedTopicsFilter] = useState(selectedTopics || '');
    const [askedByFaangFilter, setAskedByFaangFilter] = useState('');

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

    const toggleFilter = () => {
        setExpanded(prevExpanded => !prevExpanded);
    };

    const handleFilter = () => {
        // Implement filtering logic here and pass the filter criteria to the parent component
        const filterCriteria = {
            title: titleFilter,
            id: idFilter,
            difficulty: difficultyFilter,
            company: companyFilter,
            relatedTopics: relatedTopicsFilter,
            askedByFaang: askedByFaangFilter
        };
        onFilter(filterCriteria);
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between bg-gradient-to-r from-twilight-100 to-purple-100  px-4 py-3 rounded-2xl cursor-pointer text-twilight-500 mt-4 mr-2" onClick={toggleFilter}>
                <h3 className="text-lg font-semibold">Find fast what you want to practice</h3>
                <svg className={`w-6 h-6 ${expanded ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
            {expanded && (
                <div className="grid grid-cols-2 gap-4 mt-4 mr-2 bg-white border border-gray-200 rounded-2xl overflow-hidden">
                    {/* Title Filter */}
                    <div className="p-2">
                        <label htmlFor="title" className="block mb-2 font-semibold">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={titleFilter}
                            onChange={(e) => setTitleFilter(e.target.value)}
                            placeholder="Enter title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* ID Filter */}
                    <div className="p-2">
                        <label htmlFor="id" className="block mb-2 font-semibold">ID</label>
                        <input
                            type="text"
                            id="id"
                            value={idFilter}
                            onChange={(e) => setIdFilter(e.target.value)}
                            placeholder="Enter ID"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Difficulty Filter */}
                    <div className="p-2">
                        <label htmlFor="difficulty" className="block mb-2 font-semibold">Difficulty</label>
                        <select
                            id="difficulty"
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        >
                            <option value="">All</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    {/* Company Filter */}
                    <div className="p-2">
                        <label htmlFor="company" className="block mb-2 font-semibold">Company</label>
                        <select
                            id="company"
                            value={companyFilter}
                            onChange={(e) => setCompanyFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        >
                            <option value="">All</option>
                            {/* Map over companies and create options */}
                            {['Company 1', 'Company 2', 'Company 3'].map(company => (
                                <option key={company} value={company}>{company}</option>
                            ))}
                        </select>
                    </div>
                    {/* Related Topics Filter */}
                    <div className="p-2">
                        <label htmlFor="relatedTopics" className="block mb-2 font-semibold">Related Topics</label>
                        <select
                            id="relatedTopics"
                            value={relatedTopicsFilter}
                            onChange={(e) => setRelatedTopicsFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        >
                            <option value="">All</option>
                            {/* Map over topics and create options */}
                            {topics.sort().map(topic => (
                                <option key={topic} value={topic}>{topic}</option>
                            ))}
                        </select>
                    </div>
                    {/* Asked by FAANG Filter */}
                    <div className="p-2">
                        <label htmlFor="askedByFaang" className="block mb-2 font-semibold">Asked by FAANG</label>
                        <select
                            id="askedByFaang"
                            value={askedByFaangFilter}
                            onChange={(e) => setAskedByFaangFilter(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        >
                            <option value="">All</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}
