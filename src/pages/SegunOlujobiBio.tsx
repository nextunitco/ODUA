import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface SegunOlujobiBioProps {
  setCurrentPage: (page: string) => void;
}

export default function SegunOlujobiBio({ setCurrentPage }: SegunOlujobiBioProps) {
  const staticDetails = [
    "Mr. Segun Olujobi is an astute director on the board of Odu’a Investment Company Limited. He is a seasoned corporate executive, energy market strategist, and management veteran who serves as the Chief Executive Officer of Vertex Energy Limited.",
    "With a robust foundational background in mechanical engineering, coupled with top-tier management consulting and private equity experience, Mr. Olujobi has spent his career guiding high-growth firms and critical infrastructure investments across Africa.",
    "Previously, Mr. Olujobi served as a Private Equity Investment Professional at African Capital Alliance (ACA), leading deal sourcing, financial structuring, and due diligence for high-growth portfolio companies across West Africa. He also served as a Management Consultant at Accenture, advising Fortune 500 corporations on business process engineering, structural transformation, and commercial technology strategy.",
    "By integrating mechanical engineering principles, blue-chip private equity methods, and deep energy development vision, Mr. Olujobi supports OICL's pursuit of sustainable energy value creation and long-term asset optimization."
  ];

  const staticAchievements = [
    "Co-founder and Chief Executive Officer of Vertex Energy Limited, leading major infrastructure and energy production initiatives.",
    "Spearheaded high-yield private equity investments and portfolio management at African Capital Alliance (ACA).",
    "Advised Fortune 500 multinational corporations on strategic transformation and operational engineering as Management Consultant at Accenture.",
    "Fellow of the Aspen Leadership Initiative West Africa (ALIWA), dedicated to values-based governance."
  ];

  const timeline = [
    { year: "Current", desc: "Chief Executive Officer, Vertex Energy Limited & Director, Odu'a Investment Company Limited." },
    { year: "Private Equity", desc: "Investment Professional & Deal Team Lead at African Capital Alliance (ACA)." },
    { year: "Consulting", desc: "Management Consultant at Accenture leading commercial transformations." },
    { year: "Fellowship", desc: "Conferred Fellow of the Aspen Leadership Initiative West Africa (ALIWA)." }
  ];

  const academics = [
    "B.Sc. Mechanical Engineering from the University of Lagos (Unilag)",
    "Executive Business Education at Lagos Business School (LBS)",
    "Executive Leadership & Strategy at IMD Business School (Switzerland)"
  ];

  const credentials = [
    "Fellow, Aspen Leadership Initiative West Africa (ALIWA)",
    "Member, Nigerian Society of Engineers",
    "Private Equity & Venture Capital Specialist"
  ];

  return (
    <BioPageWrapper
      name="Mr. Segun Olujobi"
      role="Director, Board of Directors"
      image="https://i.postimg.cc/7Lyxpfgt/Segun-Olujobi.jpg"
      tag="Director"
      category="board"
      location="Ekiti State Representative"
      royalTitle="Chief Executive Officer, Vertex Energy Limited & Former ACA Investment Executive"
      credentials={credentials}
      academics={academics}
      timeline={timeline}
      staticDetails={staticDetails}
      staticAchievements={staticAchievements}
      setCurrentPage={setCurrentPage}
    />
  );
}
