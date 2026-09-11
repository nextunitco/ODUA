import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface AbdulrahmanYinusaBioProps {
  setCurrentPage: (page: string) => void;
}

export default function AbdulrahmanYinusaBio({ setCurrentPage }: AbdulrahmanYinusaBioProps) {
  const staticDetails = [
    "Mr. Abdulrahman Yinusa assumed office as the 9th GMD/CEO of Odu’a Investment Company Limited (OICL) on Monday, 3rd of June, 2024. He succeeded Mr. Adewale Raji who retired on 31st May 2024 after serving meritoriously for 10 years.",
    "Mr. Yinusa was appointed GMD/CEO having passed through a transparent and competitive selection process carried out by KPMG. He is a thoroughbred finance professional with over 3 decades of quality industry experience, serving as the Group Chief Financial Officer of the Company up till the time of his appointment.",
    "Prior to coming on OICL board as the Group Chief Financial Officer, he was the Executive Director and Chief Financial Officer at Diamond Bank, where he coordinated the capital raising exercise of over $500m in a combination of four different Tier I & Tier II standard and bespoke Financing Instruments as well as raising of a 7-year $200m Senior Eurobond Debt Instrument listed in Europe. He also participated actively in the M&A process that led to the acquisition of Diamond Bank UK.",
    "Beyond his corporate feats in financial services, he has served two terms on the Governing Council of the Chartered Institute of Bankers of Nigeria (CIBN) where he functioned as Chairman of its Capacity Building and Certification Committee and the Chairman of the Membership Development and Services Committee."
  ];

  const staticAchievements = [
    "Coordinated the capital raising of over $500M and a 7-year $200M Senior Eurobond Debt Instrument at Diamond Bank.",
    "Coordinated the successful merger strategy of Finbank with FCMB as the Executive Director of Finance & Strategy.",
    "Served as the pioneer CEO of the UBA subsidiary in Sierra Leone, establishing the Head Office and five branches within two years.",
    "Held the position of Financial Controller/Head Strategy in FSB International Bank at a relatively young age of 26 years.",
    "Achieved a stellar track record of being promoted three times during his 3-year career at Citibank."
  ];

  const timeline = [
    { year: "June 2024 – Present", desc: "9th Group Managing Director / CEO of Odu'a Investment Company Limited." },
    { year: "Prior to June 2024", desc: "Group Chief Financial Officer (GCFO) of Odu'a Investment Group." },
    { year: "Diamond Bank", desc: "Executive Director & Chief Financial Officer. Coordinated $500M capital raising." },
    { year: "FCMB / Finbank", desc: "Executive Director of Finance & Strategy. Spearheaded critical merger integrations." },
    { year: "UBA Group (13 Years)", desc: "Served as Treasurer, CFO, Pioneer CEO of UBA Sierra Leone, and CEO of UBA Asset Management." }
  ];

  const academics = [
    "Bachelor’s Degree in Accounting from Ahmadu Bello University (ABU), Zaria",
    "MSc. Economics from the University of Lagos",
    "MBA degree from the University of Lagos"
  ];

  const credentials = [
    "Fellow of the Institute of Chartered Accountants of Nigeria (ICAN / FCA)",
    "Fellow of the Chartered Institute of Bankers of Nigeria (CIBN / FCIB)",
    "Associate Member of the Chartered Institute of Stockbrokers",
    "Associate Member of the Chartered Institute of Taxation",
    "Associate Member of the Nigeria Institute of Management"
  ];

  return (
    <BioPageWrapper
      name="Mr. Abdulrahman Yinusa"
      role="Group Managing Director / CEO"
      image="https://i.postimg.cc/76ZdZBVy/processed-51B12DDB-7334-4282-9D88-3345BD2681ED.jpg"
      tag="GMD / CEO"
      category="both"
      location="Headquarters, Ibadan"
      credentials={credentials}
      academics={academics}
      timeline={timeline}
      staticDetails={staticDetails}
      staticAchievements={staticAchievements}
      setCurrentPage={setCurrentPage}
    />
  );
}
