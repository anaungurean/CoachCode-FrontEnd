import NavBar from '../../components/SideNavBar';
import Breadcrumb from '../../components/TopNavBar';
import AnaChat from './components/AnaChat';

function HelpPage() {
    localStorage.setItem('botName', 'Ana');



  const breadcrumbItems = [
    { name: 'Home', link: '/' },
    { name: 'Help', link: '/help' }
   ];

  return (
    <div className="flex h-screen">
      <div className="w-1/6">
        <NavBar />
      </div>
      <div className="flex flex-col w-5/6 h-full ">
         <Breadcrumb items={breadcrumbItems} /> 
         <AnaChat />
      </div>
    </div>
  );
}

export default HelpPage;
