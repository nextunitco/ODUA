import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface LaiOriowoBioProps {
  setCurrentPage: (page: string) => void;
}

export default function LaiOriowoBio({ setCurrentPage }: LaiOriowoBioProps) {
  const staticDetails = [
    "Otunba Lai Oriowo has been appointed as a Director of Odu’a Investment Company Limited (OICL) effective 7th May 2024. He succeeded Dr. Segun Aina, OFR, who successfully completed his four-year tenure on the board of OICL.",
    "A consummate aviation professional of over three decades, Otunba Oriowo brings an incredibly valuable operational perspective to the group, guiding its ongoing transformation and growth trajectory.",
    "Beyond aviation, Otunba Oriowo’s diverse commercial interests span across real estate, hospitality, banking, and construction. His expansive business networks and wealth of multi-sector experience will significantly contribute to OICL’s ongoing asset optimization framework.",
    "He serves as the Chairman of Chanelle Microfinance Bank, and previously served as Executive Director at the Nigerian Airspace Management Agency (NAMA), as well as a Board Member at NCAT Zaria and Skyway Aviation Handling Company (SAHCOL)."
  ];

  const staticAchievements = [
    "Appointed Board Director of Odu'a Investment Company Limited in May 2024.",
    "Serves as the Chairman of Chanelle Microfinance Bank, guiding retail finance, regulatory compliance, and community empowerment.",
    "Served as the Executive Director of the Nigerian Airspace Management Agency (NAMA), spearheading system upgrades for flight safety.",
    "Spent over 3 decades in professional aviation management, advising prominent national aviation councils."
  ];

  const timeline = [
    { year: "May 2024", desc: "Appointed to the Board of Directors, Odu'a Investment Company Limited." },
    { year: "Chanelle MFB", desc: "Serves as Chairman of the Board of Chanelle Microfinance Bank." },
    { year: "NCAT & SAHCOL", desc: "Served as Board Member of NCAT Zaria and Skyway Aviation Handling Company." },
    { year: "NAMA", desc: "Served as Executive Director at the Nigerian Airspace Management Agency." }
  ];

  const academics = [
    "Graduate of Nigerian College of Aviation Technology (NCAT), Zaria",
    "Alumnus of Airline Training Institute, San Carlos, California, USA",
    "IATA & United Airlines Training, Montreal, Canada & Denver, USA"
  ];

  const credentials = [
    "Consummate Aviation Professional (30+ Years)",
    "Chairman, Chanelle Microfinance Bank",
    "Expert in Hospitality Asset Management and Infrastructure Revitalization"
  ];

  const hobbies = [
    "Mentoring",
    "Aviation Research",
    "Community Philanthropy"
  ];

  return (
    <BioPageWrapper
      name="Otunba Lai Oriowo"
      role="Director"
      image="https://i.postimg.cc/PfL5vsrv/OTUNBA-ORIOWO.jpg"
      tag="Board Director"
      category="board"
      location="Appointed May 2024"
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
