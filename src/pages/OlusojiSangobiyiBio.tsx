import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface OlusojiSangobiyiBioProps {
  setCurrentPage: (page: string) => void;
}

export default function OlusojiSangobiyiBio({ setCurrentPage }: OlusojiSangobiyiBioProps) {
  const staticDetails = [
    "Engr. Olusoji Omoniyi Sangobiyi joined the services of Odu’a Investment Company Limited in 1997 as a Management Executive. Over his stellar career, he rose through the ranks as a Maintenance Engineer, Premier Hotel Ibadan (1999-2004); Manager (Operations), Odua Investment Company Limited (2004-2010); and Senior Manager (Planning), Odua Investment Company Limited (2010-2015). In 2015, he joined the core Odu’a Leadership Team as Project Evaluation Manager, Principal Manager Cadre.",
    "He is a graduate of Agricultural Engineering from the premier University of Ibadan (1986). Presently, Engr. Sangobiyi is responsible for agriculture portfolio performance tracking, monitoring, and reporting within the Odu’a Group, overseeing projects of regional significance and commercial scale.",
    "He is an active member of the Odu’a Group Growth Delivery Team (GDT), whose prime mandate is to identify and capitalize on high-potential investments for growth in target sectors of the Nigerian Economy.",
    "His deep professional credentials include being a Registered Engineer with the Council for the Regulation of Engineering in Nigeria (COREN), a Corporate Member of the Nigeria Society of Engineers (NSE), the Nigeria Institution for Agricultural Engineers (NIAE), and the Project Management Institute (PMI)."
  ];

  const staticAchievements = [
    "Successfully coordinated and monitored the Group's high-yield agricultural and infrastructural portfolio performance tracking.",
    "Brings over 25 years of engineering operations, planning, and evaluation leadership to the Odu'a Growth Delivery Team.",
    "Registered Professional Engineer with COREN, maintaining deep institutional standards for capital projects.",
    "Elected as a Past Assistant Governor and Paul Harris Fellow of Rotary International for community impact."
  ];

  const timeline = [
    { year: "2015 – Present", desc: "Project Evaluation Manager, coordinating agricultural portfolio performance and growth delivery." },
    { year: "2010 – 2015", desc: "Senior Manager (Planning), Odua Investment Company Limited." },
    { year: "1999 – 2004", desc: "Maintenance Engineer at the historic Premier Hotel Ibadan." },
    { year: "1997", desc: "Joined Odu'a Investment Company Limited as a Management Executive." }
  ];

  const academics = [
    "B.Sc. in Agricultural Engineering, University of Ibadan (1986)"
  ];

  const credentials = [
    "Registered Engineer, Council for the Regulation of Engineering in Nigeria (COREN)",
    "Corporate Member, Nigeria Society of Engineers (NSE)",
    "Member, Nigeria Institution for Agricultural Engineers (NIAE)",
    "Member, Project Management Institute (PMI)"
  ];

  const hobbies = [
    "Table Tennis",
    "Rotary Philanthropy"
  ];

  return (
    <BioPageWrapper
      name="Engr. Olusoji Omoniyi Sangobiyi"
      role="Project Evaluation Manager"
      image="https://oduainvestment.com.ng/wp-content/uploads/2020/05/sangobiyi.jpg"
      tag="Project Evaluation"
      category="leadership"
      location="Headquarters, Ibadan"
      credentials={credentials}
      academics={academics}
      timeline={timeline}
      hobbies={hobbies}
      staticDetails={staticDetails}
      staticAchievements={staticAchievements}
      setCurrentPage={setCurrentPage}
    />
  );
}
