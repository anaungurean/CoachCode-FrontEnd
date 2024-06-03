import { useState } from 'react';
import { Check, ChevronRight, ChevronLeft, School, Plus, Trash, User, Building2, Code } from 'lucide-react';
import { showErrorToast } from './notifications';

function Form() {
  const [currentStep, setCurrentStep] = useState(4);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    description: '',
    schools: [{ school: '', degree: '', graduationYear: '', city: '' }],  
    workExperiences: [{ position: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '' }],
    projects: [{ name: '', description: '', technologies: '', link: '' }],
    technicalSkills_languages: '',
    technicalSkills_frameworks: '',
    technicalSkills_developmentTools: '',
    softSkills: '',
  });

  const nextStep = () => {

    if(currentStep === 1){
      if(!formData.firstName  || !formData.lastName || !formData.email || !formData.phone || !formData.linkedin || !formData.github || !formData.description){
        showErrorToast('Please fill all the fields');
        return;
      }
    }

    if(currentStep === 2){
      for (let i = 0; i < formData.schools.length; i++) {
        if (!formData.schools[i].school || !formData.schools[i].degree || !formData.schools[i].graduationYear || !formData.schools[i].city) {
          showErrorToast('Please fill all the fields');
          return;
        }
      }
    }

    if(currentStep === 3){
      for (let i = 0; i < formData.workExperiences.length; i++) {
        if (!formData.workExperiences[i].position || !formData.workExperiences[i].company || !formData.workExperiences[i].location || !formData.workExperiences[i].startDate || !formData.workExperiences[i].endDate || !formData.workExperiences[i].responsibilities) {
          showErrorToast('Please fill all the fields');
          return;
        }
      }
    }

    if(currentStep === 4){
      for (let i = 0; i < formData.projects.length; i++) {
        if (!formData.projects[i].name || !formData.projects[i].description || !formData.projects[i].technologies || !formData.projects[i].link) {
          showErrorToast('Please fill all the fields');
          return;
        }
      }
    }

    if(currentStep === 5){
      if(!formData.technicalSkills_languages || !formData.technicalSkills_frameworks || !formData.technicalSkills_developmentTools || !formData.softSkills){
        showErrorToast('Please fill all the fields');
        return;
      }
    }






    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  
    const addSchool = () => {
    setFormData({
      ...formData,
      schools: [...formData.schools, { school: '', degree: '', graduationYear: '', city: '' }],
    });
  };

  const removeSchool = (indexToRemove) => {
  const updatedSchools = formData.schools.filter((school, index) => index !== indexToRemove);
  setFormData({ ...formData, schools: updatedSchools });
};


  const handleSchoolChange = (index, field, value) => {
      const updatedSchools = [...formData.schools];
      updatedSchools[index][field] = value;
      setFormData({ ...formData, schools: updatedSchools });
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperiences: [
        ...formData.workExperiences,
        { position: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '' },
      ],
    });
  }

  const removeWorkExperience = (indexToRemove) => {
    const updatedWorkExperiences = formData.workExperiences.filter((workExperience, index) => index !== indexToRemove);
    setFormData({ ...formData, workExperiences: updatedWorkExperiences });
  }

  const handleWorkExperienceChange = (index, field, value) => {
    const updatedWorkExperiences = [...formData.workExperiences];
    updatedWorkExperiences[index][field] = value;
    setFormData({ ...formData, workExperiences: updatedWorkExperiences });
  }


  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { name: '', description: '', technologies: '', link: '' },
      ],
    });
  }

  const removeProject = (indexToRemove) => {
    const updatedProjects = formData.projects.filter((project, index) => index !== indexToRemove);
    setFormData({ ...formData, projects: updatedProjects });
  }

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({ ...formData, projects: updatedProjects });
  }

      const handleSubmit = async () => {
        console.log('Form data:', formData);
      try {
        const response = await fetch('http://localhost:5000/generate_pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        console.log('Response:', response);
        if (response.ok) {
          console.log('PDF generated successfully');
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'resume.pdf';
          document.body.appendChild(a); // Append to the document body to initiate download
          a.click();
          a.remove(); // Clean up after download
        } else {
          console.error('Failed to generate PDF');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };




  return (
    <div className="mt-4 border pl-4 pt-4 pb-4 border-gray-300 rounded-lg bg-white bg-opacity-80 shadow-md backdrop-blur-md z-10">
      {/* Progress Bar */}
      <div className="mb-4 mr-4">
        <p className="text-lg text-twilight-500 font-medium">Step {currentStep} of 5</p>
        <div className="w-full bg-gray-200 rounded-full mt-2">
          <div
            className={`bg-twilight-100 rounded-full h-2 transition-all ease-out duration-300 ${
              currentStep === 1 ? 'w-1/5' : currentStep === 2 ? 'w-2/5' : currentStep === 3 ? 'w-3/5':  currentStep === 4 ? 'w-4/5' : 'w-full'
            }`}
          ></div>
        </div>
      </div>

      {currentStep === 1 && (
        <div className="mb-4 mr-4">
          <div className="flex items-center  bg-gradient-to-r from-twilight-100 to-purple-100 p-2 rounded-md ">
            <User size={20} className="text-twilight-500 mr-2" />
            <h3 className="text-xl font-semibold text-twilight-500">Personal Information</h3>
          </div>
          <div className=' mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label htmlFor='firstName' className='text-twilight-500 font-medium text-base'>First Name:</label>
              <div className='flex items-center justify-between relative'>
              <input
                type='text'
                id='firstName'
                name='firstName'
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 pr-10 w-full'
                placeholder='Ana-Maria'
              />
              {
                formData.firstName && formData.firstName.length > 2 &&
                <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500 ' />
              }
              </div>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='lastName' className='font-medium text-base'>Last Name:</label>
              <div className='flex items-center justify-between relative'>
              <input
                type='text'
                id='lastName'
                name='lastName'
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 pr-10 w-full'
                placeholder='Ungurean'
              />
              {
                formData.lastName && formData.lastName.length > 2 &&
                <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500 ' />
              }
            </div>
            </div>
    
            <div className='flex flex-col'>
              <label htmlFor='email' className='font-medium text-base'>Email:</label>
                <div className='flex items-center justify-between relative'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 pr-10 w-full'  
                    placeholder='anamariaungurean01@gmail.com'
                  />
                  { 
                    formData.email && formData.email.includes('@') && formData.email.includes('.') &&
                    <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />  
                  }
                </div>
              </div>

            <div className='flex flex-col'>
              <label htmlFor='phone' className='font-medium text-base'>Phone:</label>
              <div className='flex items-center justify-between relative'>
              <input
                type='text'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 pr-10 w-full'
                placeholder='+40712345678'
              />
              {
                formData.phone && formData.phone.length > 2 &&
                <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
              }
            </div>
            </div>

            <div className='flex flex-col'>
              <label htmlFor='linkedin' className='font-medium text-base'>LinkedIn:</label>
              <div className='flex items-center justify-between relative'>
              <input
                type='text'
                id='linkedin'
                name='linkedin'
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 pr-10 w-full'
                placeholder='https://www.linkedin.com/in/anamariaungurean/'
              />
              {
                formData.linkedin && formData.linkedin.length > 2 &&
                <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
              }
              </div>
            </div>

            <div className='flex flex-col'>
              <label htmlFor='github' className='font-medium text-base'>GitHub:</label>
              <div className='flex items-center justify-between relative'>
              <input
                type='text'
                id='github'
                name='github'
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 pr-10 w-full'
                placeholder='https://github.com/anaungurean'
              />
              {
                formData.github && formData.github.length > 2 &&
                <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
              }
              </div>
            </div>              
          </div>
          
          <div className='flex flex-col mt-2'>
              <label htmlFor='description' className='font-medium text-base'>Tell us something about you:</label>
                            <div className='flex items-center justify-between relative'>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full pr-10'
                placeholder='
                I am a software developer with a passion for creating and developing software applications. I have a Bachelor degree in Computer Science from Alexandru Ioan Cuza University and I have been working as a Software Developer at Amazon for the past 2 years. I am a fast learner and I am always looking to improve my skills.'
              />
              {
                formData.description && formData.description.length > 2 &&
                <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100  shadow-lg ring-1 ring-twilight-500 ' />
              }
              </div>
          </div>
          
        <div className="flex items-center justify-end mt-4">
         <button
              className="bg-gradient-to-r from-twilight-300 to-twilight-100 text-white font-bold py-2 px-4 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out"
              onClick={nextStep}
            >
             <div className="flex items-center">
              <ChevronRight size={20} className="mr-2" />
              Next
              </div>
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="mb-4 mr-4">
          <div className="flex items-center  bg-gradient-to-r from-twilight-100 to-purple-100 p-2 rounded-md ">
            <School size={20} className="text-twilight-500 mr-2" />
            <h3 className="text-xl font-semibold text-twilight-500">Education Information</h3>
          </div>
          {formData.schools.map((school, index) => (
            <div className="mt-2" key={index}>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-twilight-500">School {index + 1}</h4>
               <Trash size={20} className="text-twilight-500 cursor-pointer mr-2" onClick={() => removeSchool(index)} />
              </div>   
              <hr className="border-t border-twilight-300 mt-2" />
            <div key={index} className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                       
             <div className="flex flex-col relative">
                <label htmlFor={`school${index}`} className="font-medium text-base">School:</label>
                <div className='flex items-center justify-between relative'>
                <input
                  type="text"
                  id={`school${index}`}
                  value={school.school}
                  onChange={(e) => handleSchoolChange(index, 'school', e.target.value)}
                  className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full'
                  placeholder='Alexandru Ioan Cuza University'
                />
                {school.school && school.school.length > 2 && (
                    <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                )}
              </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor={`degree${index}`} className="font-medium text-base">Degree:</label>
                <div className='flex items-center justify-between relative'>
                <input
                  type="text"
                  id={`degree${index}`}
                  value={school.degree}
                  onChange={(e) => handleSchoolChange(index, 'degree', e.target.value)}
                  className="p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full"
                  placeholder='Computer Science Bachelor'
                />
                {school.degree && school.degree.length > 2 && (
                    <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                )}
              </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor={`graduationYear${index}`} className="font-medium text-base">Graduation Year:</label>
                <div className='flex items-center justify-between relative'>
                <input
                  type="text"
                  id={`graduationYear${index}`}
                  value={school.graduationYear}
                  onChange={(e) => handleSchoolChange(index, 'graduationYear', e.target.value)}
                  className="p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full"
                  placeholder='2020'
                />
                {school.graduationYear && school.graduationYear.length > 3 && (
                    <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                )}
              </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor={`city${index}`} className="font-medium text-base">City:</label>
                <div className='flex items-center justify-between relative'>
                <input
                  type="text"
                  id={`city${index}`}
                  value={school.city}
                  onChange={(e) => handleSchoolChange(index, 'city', e.target.value)}
                  className="p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full"
                  placeholder='Iasi, Romania'
                />
                {school.city && school.city.length > 2 && (
                    <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                )}
              </div>
              </div>
               
            </div>
            </div>
          ))}
          
          <div className="flex w-full  mt-4">
            <button
              className="bg-purple-50  w-full ring-1 ring-twilight-200 shadow-sm text-twilight-500 font-semibold py-2 px-4 rounded"
              onClick={addSchool}
            >
              <div className="flex items-center justify-start">
              <Plus  size={20} className="mr-2" />
                Add new school
              </div>
               
            </button>
          </div>



          <div className="flex items-center justify-between mt-4">
          <button 
              className='bg-gradient-to-r from-gray-600 to-gray-400 text-white font-bold py-2 px-4 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out'
              onClick={prevStep}
            >
              <div className="flex items-center">
              <ChevronLeft size={20} className="mr-2" />
              Previous
              </div>
            </button>

          <button
              className="bg-gradient-to-r from-twilight-300 to-twilight-100 text-white font-bold py-2 px-4 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out"
              onClick={nextStep}
            >
             <div className="flex items-center">
              <ChevronRight size={20} className="mr-2" />
              Next
              </div>
            </button>
          </div>
          </div>
      )}

       {currentStep === 3 && (
        <div className="mb-4 mr-4">
          <div className="flex items-center  bg-gradient-to-r from-twilight-100 to-purple-100 p-2 rounded-md ">
            <Building2  size={20} className="text-twilight-500 mr-2" />
            <h3 className="text-xl font-semibold text-twilight-500">Experience Information</h3>
          </div>
          {formData.workExperiences.map((workExperience, index) => (
            <div className="mt-2" key={index}>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-twilight-500">Work Experience {index + 1}</h4>
               <Trash size={20} className="text-twilight-500 cursor-pointer mr-2" onClick={() => removeWorkExperience(index)} />
              </div>   
              <hr className="border-t border-twilight-300 mt-2" />
            <div key={index} className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                       
             <div className="flex flex-col relative">
                <label htmlFor={`position${index}`} className="font-medium text-base">Position:</label>
                <div className='flex items-center justify-between relative'>
                <input
                  type="text"
                  id={`workExperience${index}`}
                  value={workExperience.position}
                  onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                  className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full'
                  placeholder='Software Developer'
                />
                {workExperience.position && workExperience.position.length > 2 && (
                    <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                )}
              </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor={`company${index}`} className="font-medium text-base">Company:</label>
                <div className='flex items-center justify-between relative'>
                <input
                  type="text"
                  id={`company${index}`}
                  value={workExperience.company}
                  onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                  className="p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full"
                  placeholder='Amazon'
                />
                {workExperience.company && workExperience.company.length > 2 && (
                    <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                )}
              </div>
              </div>

              <div className="flex flex-col">

                <label htmlFor={`location${index}`} className="font-medium text-base">Location:</label>
                <div className='flex items-center justify-between relative'>
                <input
                  type="text"
                  id={`location${index}`}
                  value={workExperience.location}
                  onChange={(e) => handleWorkExperienceChange(index, 'location', e.target.value)}
                  className="p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full"
                  placeholder='Iasi, Romania'
                />
                {workExperience.location && workExperience.location.length > 2 && (
                    <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                )}
                </div>
              </div>

              <div className="flex flex-col">
                  <label htmlFor={`startDate${index}`} className="font-medium text-base">Start Date:</label>
                  <div className='flex items-center justify-between relative'>
                  <input
                    type="text"
                    id={`startDate${index}`}
                    value={workExperience.startDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                    className="p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full"
                    placeholder='20 March 2020'
                  />
                  {workExperience.startDate && workExperience.startDate.length > 3 && (
                      <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                  )}
                 </div>
              </div>

              <div className="flex flex-col">
                  <label htmlFor={`endDate${index}`} className="font-medium text-base">End Date:</label>
                  <div className='flex items-center justify-between relative'>
                  <input
                    type="text"
                    id={`endDate${index}`}
                    value={workExperience.endDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                    className="p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full"
                    placeholder='Present'
                  />
                  {workExperience.endDate && workExperience.endDate.length > 3 && (
                      <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                  )}
                  </div>
              </div> 
            </div>

            <div className="flex flex-col mt-2">
                  <label htmlFor={`responsibilities${index}`} className="font-medium text-base">Responsibilities:</label>
                  <div className='flex items-center justify-between relative'>
                  <textarea
                    id={`responsibilities${index}`}
                    value={workExperience.responsibilities}
                    onChange={(e) => handleWorkExperienceChange(index, 'responsibilities', e.target.value)}
                    className="p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full"
                    placeholder='- Developed new features for the company website'
                  />
                  {workExperience.responsibilities && workExperience.responsibilities.length > 2 && (
                      <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                  )}
                  </div>
            </div>

            </div>
          ))}
          
          <div className="flex w-full  mt-4">
            <button
              className="bg-purple-50  w-full ring-1 ring-twilight-200 shadow-sm text-twilight-500 font-semibold py-2 px-4 rounded"
              onClick={addWorkExperience}
            >
              <div className="flex items-center justify-start">
              <Plus  size={20} className="mr-2" />
                Add new workExperience
              </div>
               
            </button>
          </div>



           <div className="flex items-center justify-between mt-4">

          <button 
              className='bg-gradient-to-r from-gray-600 to-gray-400 text-white font-bold py-2 px-4 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out'
              onClick={prevStep}
            >
              <div className="flex items-center">
              <ChevronLeft size={20} className="mr-2" />
              Previous
              </div>
            </button>

          <button
              className="bg-gradient-to-r from-twilight-300 to-twilight-100 text-white font-bold py-2 px-4 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out"
              onClick={nextStep}
            >
             <div className="flex items-center">
              <ChevronRight size={20} className="mr-2" />
              Next
              </div>
            </button>
          </div>
          </div>
      )}

      {
        currentStep === 4 && (
    <div className="mb-4 mr-4">
      <div className="flex items-center bg-gradient-to-r from-twilight-100 to-purple-100 p-2 rounded-md ">
        <Code size={20} className="text-twilight-500 mr-2" />
        <h3 className="text-xl font-semibold text-twilight-500">Projects Information</h3>
      </div>
      {formData.projects.map((project, index) => (
        <div className="mt-2" key={index}>
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-twilight-500">Project {index + 1}</h4>
            <Trash size={20} className="text-twilight-500 cursor-pointer mr-2" onClick={() => removeProject(index)} />
          </div>
          <hr className="border-t border-twilight-300 mt-2" />
          <div key={index} className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col relative">
              <label htmlFor={`name${index}`} className="font-medium text-base">Name:</label>
              <div className='flex items-center justify-between relative'>
                <input
                  type="text"
                  id={`name${index}`}
                  value={project.name}
                  onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                  className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full'
                  placeholder='E-commerce website'
                />
                {project.name && project.name.length > 2 && (
                  <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor={`description${index}`} className="font-medium text-base">Description:</label>
              <div className='flex items-center justify-between relative'>
                <input
                  type="text"
                  id={`description${index}`}
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  className="p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full"
                  placeholder='Developed an e-commerce website using React and Node.js'
                />
                {project.description && project.description.length > 2 && (
                  <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                )}
              </div>

            </div>

            <div className="flex flex-col">
              <label htmlFor={`technologies${index}`} className="font-medium text-base">Technologies:</label>
              <div className='flex items-center justify-between relative'>
                <input
                  type="text"
                  id={`technologies${index}`}
                  value={project.technologies}
                  onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                  className="p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full"
                  placeholder='React, Node.js, MongoDB'
                />
                {project.technologies && project.technologies.length > 2 && (
                  <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor={`link${index}`} className="font-medium text-base">Link:</label>
              <div className='flex items-center justify-between relative'>
                <input
                  type="text"
                  id={`link${index}`}
                  value={project.link}
                  onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                  className="p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full"
                  placeholder='https://github.com/anaungurean/e-commerce-website'
                />
                {project.link && project.link.length > 2 && (
                  <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500' />
                )}

              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex w-full mt-4">
        <button
          className="bg-purple-50 w-full ring-1 ring-twilight-200 shadow-sm text-twilight-500 font-semibold py-2 px-4 rounded"
          onClick={addProject}
        >
          <div className="flex items-center justify-start">
            <Plus size={20} className="mr-2" />
            Add new project
          </div>
        </button>
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          className='bg-gradient-to-r from-gray-600 to-gray-400 text-white font-bold py-2 px-4 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out'
          onClick={prevStep}
        >
          <div className="flex items-center">
            <ChevronLeft size={20} className="mr-2" />
            Previous
          </div>
        </button>
        <button
          className="bg-gradient-to-r from-twilight-300 to-twilight-100 text-white font-bold py-2 px-4 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out"
          onClick={nextStep}
        >
          <div className="flex items-center">
            <ChevronRight size={20} className="mr-2" />
            Next
          </div>
        </button>
      </div>
    </div>
      )}


      {currentStep === 5 && (
        
        <div className="mb-4 mr-4">
          <div className="flex items-center  bg-gradient-to-r from-twilight-100 to-purple-100 p-2 rounded-md ">
            <Code size={20} className="text-twilight-500 mr-2" />
            <h3 className="text-xl font-semibold text-twilight-500">Skills Information</h3>
          </div>
          <div className='flex flex-col mt-4'>
              <label htmlFor='technicalSkills_languages' className='font-medium text-base'>Programming Languages:</label>
              <div className='flex items-center justify-between relative'>
              <input
                type='text'
                id='technicalSkills_languages'
                name='technicalSkills_languages'
                value={formData.technicalSkills_languages}
                onChange={(e) => setFormData({ ...formData, technicalSkills_languages: e.target.value })}
                className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full'
                placeholder='JavaScript, Python, Java'
              />
              {
                formData.technicalSkills_languages && formData.technicalSkills_languages.length > 2 &&
                <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500 ' />
              }
              </div>
          </div>

          <div className='flex flex-col mt-4'>
              <label htmlFor='technicalSkills_frameworks' className='font-medium text-base'>Frameworks:</label>
              <div className='flex items-center justify-between relative'>
              <input
                type='text'
                id='technicalSkills_frameworks'
                name='technicalSkills_frameworks'
                value={formData.technicalSkills_frameworks}
                onChange={(e) => setFormData({ ...formData, technicalSkills_frameworks: e.target.value })}
                className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full'
                placeholder='React, Angular, Vue.js'
              />
              {
                formData.technicalSkills_frameworks && formData.technicalSkills_frameworks.length > 2 &&
                <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500 ' />
              }
              </div>
          </div>

          <div className='flex flex-col mt-4'>
              <label htmlFor='technicalSkills_developmentTools' className='font-medium text-base'>Development Tools:</label>
              <div className='flex items-center justify-between relative'>
              <input
                type='text'
                id='technicalSkills_developmentTools'
                name='technicalSkills_developmentTools'
                value={formData.technicalSkills_developmentTools}
                onChange={(e) => setFormData({ ...formData, technicalSkills_developmentTools: e.target.value })}
                className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full'
                placeholder='VS Code, IntelliJ IDEA, Git'
              />
              {
                formData.technicalSkills_developmentTools && formData.technicalSkills_developmentTools.length > 2 &&
                <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500 ' />
              }
              </div>
          </div>

          <div className='flex flex-col mt-4'>
              <label htmlFor='softSkills' className='font-medium text-base'>Soft Skills:</label>
              <div className='flex items-center justify-between relative'>
              <input
                type='text'
                id='softSkills'
                name='softSkills'
                value={formData.softSkills}
                onChange={(e) => setFormData({ ...formData, softSkills: e.target.value })}
                className='p-2 border border-twilight-300 rounded text-twilight-500 bg-purple-50 w-full'
                placeholder='Teamwork, Communication, Problem-solving'
              />
              {
                formData.softSkills && formData.softSkills.length > 2 &&
                <Check size={20} className='text-twilight-500 rounded-3xl absolute right-2 bg-twilight-100 shadow-lg ring-1 ring-twilight-500 ' />
              }
              </div>
          </div>


          <div className="flex items-center justify-between mt-4">
             <button
              className='bg-gradient-to-r from-gray-600 to-gray-400 text-white font-bold py-2 px-4 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out'
              onClick={prevStep}
            >
              <div className="flex items-center">
              <ChevronLeft size={20} className="mr-2" />
              Previous
              </div>
            </button>
              
            <button
              className="bg-gradient-to-r from-twilight-300 to-twilight-100 text-white font-bold py-2 px-4 rounded active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out"
              onClick={handleSubmit}
            >
              <div className="flex items-center">
              <Check size={20} className="mr-2" />
              Submit
              </div>
            </button>
          </div>

        </div>


      )}

    </div>
)}

export default Form;
