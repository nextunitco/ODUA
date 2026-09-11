import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface SeniAdioBioProps {
  setCurrentPage: (page: string) => void;
}

export default function SeniAdioBio({ setCurrentPage }: SeniAdioBioProps) {
  const staticDetails = [
    "Mr. Seni Adio, SAN is an accomplished director on the board of Odu’a Investment Company Limited, representing Lagos State. A globally respected legal authority, he is the Managing Partner at Copley Partners and former Chairman of the Nigerian Bar Association Section on Business Law (NBA-SBL).",
    "With over three decades of international and domestic legal jurisprudence, Mr. Adio practiced in the United States for many years, rising to become a Partner at the prominent American law firm Mintz, Levin, Cohn, Ferris, Glovsky and Popeo, PC in Boston, Massachusetts, where he represented global Fortune 500 corporations, financial institutions, and telecommunication giants.",
    "Upon returning to Nigeria, he established a premier commercial law practice specializing in cross-border corporate finance, commercial arbitration, antitrust, white-collar corporate investigations, and telecommunications law. Under his visionary chairmanship of the NBA Section on Business Law, he spearheaded crucial legal framework reforms in partnership with the National Assembly and the Presidential Enabling Business Environment Council (PEBEC).",
    "As a Director of Odu'a Investment Company Limited, Mr. Adio provides profound legal stewardship, commercial risk mitigation, and corporate governance oversight to support the conglomerate's multi-billion naira asset expansion across the South-West region."
  ];

  const staticAchievements = [
    "Conferred the prestigious rank of Senior Advocate of Nigeria (SAN), the pinnacle of legal distinction in Nigeria.",
    "Former Partner at Mintz Levin in Boston, Massachusetts, representing global investment banks and technology firms.",
    "Served as Chairman of the Nigerian Bar Association Section on Business Law (NBA-SBL), leading landmark legislative overhauls including CAMA 2020 advocacy.",
    "Member of the Presidential Enabling Business Environment Council (PEBEC) regulatory advisory committees."
  ];

  const timeline = [
    { year: "Current", desc: "Director, Odu'a Investment Company Limited (representing Lagos State) & Managing Partner, Copley Partners." },
    { year: "SAN", desc: "Elevated to the prestigious rank of Senior Advocate of Nigeria (SAN)." },
    { year: "NBA-SBL", desc: "Elected Chairman of the Nigerian Bar Association Section on Business Law (SBL)." },
    { year: "Mintz Levin", desc: "Partner at Mintz, Levin, Cohn, Ferris, Glovsky and Popeo, PC (Boston, Massachusetts, USA)." }
  ];

  const academics = [
    "LL.M (Master of Laws), Columbia University School of Law, New York",
    "LL.B (Bachelor of Laws) with Honours",
    "Admitted to the Nigerian Bar and Massachusetts State Bar (USA)"
  ];

  const credentials = [
    "Senior Advocate of Nigeria (SAN)",
    "Member, Nigerian Bar Association (NBA)",
    "Member, American Bar Association (ABA)",
    "Recipient, Igbobi College Old Boys Association (ICOBA) Merit Award"
  ];

  return (
    <BioPageWrapper
      name="Mr. Seni Adio, SAN"
      role="Director, Board of Directors"
      image="https://i.postimg.cc/FzL4hWr0/seni-adio.jpg"
      tag="Director"
      category="board"
      location="Lagos State Representative"
      royalTitle="Senior Advocate of Nigeria & Former Chairman, NBA Section on Business Law"
      credentials={credentials}
      academics={academics}
      timeline={timeline}
      staticDetails={staticDetails}
      staticAchievements={staticAchievements}
      setCurrentPage={setCurrentPage}
    />
  );
}
