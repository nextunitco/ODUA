import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface DebolaOsibogunBioProps {
  setCurrentPage: (page: string) => void;
}

export default function DebolaOsibogunBio({ setCurrentPage }: DebolaOsibogunBioProps) {
  const staticDetails = [
    "Otunba Mrs. Adebola Osibogun is an Independent Director on the Board of Odu’a Investment Company Limited. She currently serves on the board of FBN Holdings Plc. and possesses over three decades of financial services experience covering real estate financing, trusteeship, retail savings, and loans across various reputable institutions.",
    "She has considerable experience of boards at both Executive and Non-Executive levels. In addition to her governance roles, she is the President of the Consumer Awareness and Financial Enlightenment Initiative (CAFEi), a non-profit organisation that advocates for financial literacy and consumer inclusion across West Africa.",
    "Throughout her career, she has been at the vanguard of the primary mortgage sub-sector in Nigeria, serving as the National President of the Mortgage Bankers Association of Nigeria, where she successfully advocated for institutional reforms to ease homeownership and unlock housing finance pathways.",
    "Otunba Osibogun has also served as a Member of the Presidential Committee on Urban Development & Housing, a Member of the Presidential Committee on Mortgage Finance, and an Executive Member of the Real Estate Developers Association of Nigeria (REDAN)."
  ];

  const staticAchievements = [
    "Fellow and Past President of the Chartered Institute of Bankers of Nigeria (CIBN).",
    "First female Managing Director/CEO of COOP Savings & Loans Limited and Skye Trustees Limited.",
    "Serves on the Board of FBN Holdings Plc, overseeing retail banking integrations, risk controls, and corporate ethics.",
    "Founded CAFEi (Consumer Awareness and Financial Enlightenment Initiative), a widely respected financial literacy NGO."
  ];

  const timeline = [
    { year: "2008", desc: "Installed as the Otunba of Ijebuland by His Royal Majesty, Alayeluwa Oba (Dr) S. K. Adetona CFR." },
    { year: "CIBN", desc: "Served as National President of the Chartered Institute of Bankers of Nigeria." },
    { year: "Advisory", desc: "Appointed Member of the Presidential Committee on Urban Development & Housing." },
    { year: "Executive", desc: "Managing Director of Skye Trustees Limited and COOP Savings & Loans Limited." }
  ];

  const academics = [
    "M.Sc. Banking & Finance from the University of Ibadan",
    "B.Ed. Economics from the University of Ibadan",
    "Executive Education at INSEAD, Kellogg, and London Business School"
  ];

  const credentials = [
    "Fellow, Chartered Institute of Bankers of Nigeria (CIBN)",
    "Fellow, Chartered Institute of Taxation (CITN)",
    "Fellow, Nigerian Institute of Management (NIM)",
    "Fellow, Institute of Directors (IoD)"
  ];

  const hobbies = [
    "Reading",
    "Writing",
    "Mentoring"
  ];

  return (
    <BioPageWrapper
      name="Otunba Mrs. Adebola Osibogun"
      role="Independent Director"
      image="https://i.postimg.cc/qqHS73vF/Otunba-Mrs-Adebola-Osibogun.jpg"
      tag="Independent Director"
      category="board"
      location="Ogun State Representative"
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
