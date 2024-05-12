import React, { useEffect, useState} from "react";
import PropTypes from "prop-types";


import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {Tag} from 'lucide-react';
import { Building2 } from 'lucide-react';
import { ShieldQuestion } from 'lucide-react';
import { Lightbulb } from 'lucide-react';

const CUSTOM_ANIMATION = {
  mount: { scale: 1 },
  unmount: { scale: 0.9 },
};

// eslint-disable-next-line react/prop-types
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}


const extractTitlesofSimilarQuestions = (similar_questions) => {
    const titles = [];
    similar_questions.split(',').map((question) => {
        if (!question.includes('Medium') && !question.includes('Hard') && !question.includes('Easy') && !question.includes('problems'))
        {
        question = question.replace('[', '');
        titles.push(question.trim());
        }
    });
    return titles;
}

const fetchProblemIdByTitle = async (title) => {
  try {

    const response = await fetch(`http://localhost:5000/problems/${encodeURIComponent(title)}`);
    const data = await response.json();
    return { title, id: data };
  } catch (error) {
    console.error(`Error fetching ID for problem "${title}":`, error);
    return null;
  }
};



export default function AccordionProblemInfo({ related_topics, companies, similar_questions, hints }) {

     const [openRelatedTopics, setOpenRelatedTopics] = React.useState(false);
     const [openCompanies, setOpenCompanies] = React.useState(false);
     const [openSimilarQuestions, setOpenSimilarQuestions] = React.useState(false);
     const [openHints, setOpenHints] = React.useState(new Array(hints.length).fill(false));

    const handleOpenRelatedTopics = () => {
      setOpenRelatedTopics(!openRelatedTopics);
      setOpenCompanies(false);
      setOpenSimilarQuestions(false);
      setOpenHints(new Array(hints.length).fill(false));
    };

    const handleOpenCompanies = () => {
      setOpenCompanies(!openCompanies);
      setOpenRelatedTopics(false);
      setOpenSimilarQuestions(false);
      setOpenHints(new Array(hints.length).fill(false));
    };

    const handleOpenSimilarQuestions = () => {
      setOpenSimilarQuestions(!openSimilarQuestions);
      setOpenRelatedTopics(false);
      setOpenCompanies(false);
      setOpenHints(new Array(hints.length).fill(false));
    };

    const handleOpenHints = (index) => {
      const newOpenHints = new Array(hints.length).fill(false);
      newOpenHints[index] = !openHints[index];
      setOpenHints(newOpenHints);
      setOpenRelatedTopics(false);
      setOpenCompanies(false);
      setOpenSimilarQuestions(false);
    };



    const relatedTopicsArray = related_topics.split(',');
    const companiesArray = companies.split(',');
    const similar_questions_array = extractTitlesofSimilarQuestions(similar_questions);
    const [similarQuestionsWithIds, setSimilarQuestionsWithIds] = useState([]);

    useEffect(() => {
    const fetchSimilarQuestionsIds = async () => {
      const similarQuestionsArray = extractTitlesofSimilarQuestions(similar_questions);
      const promises = similarQuestionsArray.map(title => fetchProblemIdByTitle(title));
      const similarQuestionsWithIds = await Promise.all(promises);
      setSimilarQuestionsWithIds(similarQuestionsWithIds.filter(item => item)); // Filter out null values
    };

    fetchSimilarQuestionsIds();
  }, [similar_questions]);

     return (
    <>
    <div className="mt-4 mr-4 mb-4 border pl-4 pt-2 pb-4 pr-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md ">
      <Accordion open={openRelatedTopics} className="mt-4 mr-8 mb-4 px-4" animate={CUSTOM_ANIMATION} icon={<Icon id={1} open={open} />}>
      <div className="flex items-center">
        <Tag size={20} className="mr-2 text-twilight-300" />
        <AccordionHeader
          onClick={() => handleOpenRelatedTopics()}
          className={`transition-colors text-twilight-300  ${
            openRelatedTopics ? "text-twilight-200 hover:!text-twilight-300" : ""
          }`}
        >
        Related topics
        </AccordionHeader>
        </div>
        <hr className="border-gray-300 " />  
        <AccordionBody className="pt-1 text-base">
           {
            relatedTopicsArray.map((topic, index) => (
              <p key={index} className="inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium bg-violet-50 text-violet-700 ring-violet-600/20 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm">
                {topic.trim()}
              </p>
            ))
           }
        </AccordionBody>
      </Accordion>

        <Accordion open={openCompanies} className="mr-8 mb-4 px-4" animate={CUSTOM_ANIMATION} icon={<Icon id={2} open={open} />}>
        <div className="flex items-center">
            <Building2 size={20} className="mr-2 text-twilight-300" />
            <AccordionHeader
                onClick={() => handleOpenCompanies()}
              className={`transition-colors text-twilight-300 ${
              openCompanies ? "text-twilight-200 hover:!text-twilight-300" : ""
            }`}
            >
            Companies
            </AccordionHeader>
            </div>
            <hr className="border-gray-300" />  
            <AccordionBody className="pt-1 text-base">
                {
                companiesArray.map((company, index) => (
                    <p key={index} className="inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-600/30 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm">
                    {company.trim()}
                    </p>
                ))
                }
            </AccordionBody>
        </Accordion>

        <Accordion open={openSimilarQuestions} className="mr-8 mb-4 px-4" animate={CUSTOM_ANIMATION} icon={<Icon id={3} open={open} />}>
        <div className="flex items-center">
            <ShieldQuestion size={20} className="mr-2 text-twilight-300" />
            <AccordionHeader
                onClick={() => handleOpenSimilarQuestions()}
              className={`transition-colors text-twilight-300 ${
              openSimilarQuestions ? "text-twilight-200 hover:!text-twilight-300" : ""
            }`}
            >
            Similar questions
            </AccordionHeader>
            </div>
            <hr className="border-gray-300" />  
            <AccordionBody className="pt-1 text-base">
                {similar_questions_array.map((question, index) => {
                return (
                    <p key={index} className="inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium bg-pink-50 text-pink-700 ring-pink-600/30 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm">
                    <a href={`/problems/${similarQuestionsWithIds[index]?.id}`} className="hover:text-pink-800">
                    {question}
                    </a>
                    </p>
                );
            })}
            </AccordionBody>
        </Accordion>
      
      {
  hints && hints.map((hint, index) => (
    <Accordion
      key={index}
      open={openHints[index]}  
      className="mr-8 mb-4 px-4"
      animate={CUSTOM_ANIMATION}
      icon={<Icon id={index} open={open} />}
    >
      <div className="flex items-center">
        <Lightbulb size={20} className="mr-2 text-twilight-300" />
        <AccordionHeader
          onClick={() => handleOpenHints(index)}  
          className={`transition-colors text-twilight-300 ${
        openHints[index] ? "text-twilight-200 hover:!text-twilight-300" : ""
      }`}
        >
          {"Hint " + (index + 1)} {}
        </AccordionHeader>
      </div>
      <hr className="border-gray-300" />
      <AccordionBody className="pt-1 text-base">
        <p key={index} className="inline-flex items-center rounded-md px-2 py-1 ml-2 mt-2 text-sm font-medium bg-purple-100 text-twilight-400 ring-twilight-400/10 ring-1 ring-inset border-dotted hover:ring-2 shadow-sm">
          {hint}
        </p>
      </AccordionBody>
    </Accordion>
  ))
}

    </div>
    </>
  );

}

AccordionProblemInfo.propTypes = {
  related_topics: PropTypes.string.isRequired,
  companies: PropTypes.string.isRequired,
  similar_questions: PropTypes.string.isRequired,
  hints: PropTypes.array,
};
