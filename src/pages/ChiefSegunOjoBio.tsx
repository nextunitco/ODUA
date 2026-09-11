import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface ChiefSegunOjoBioProps {
  setCurrentPage: (page: string) => void;
}

export default function ChiefSegunOjoBio({ setCurrentPage }: ChiefSegunOjoBioProps) {
  const staticDetails = [
    "Chief Segun Ojo, a director on the board of Odu’a Investment Company Limited, is a thoroughbred civil servant and highly resourceful administrator. He brought deep transparency, accountability, and commercial discipline to public service, leaving behind an exceptionally cherished legacy.",
    "Throughout his long-spanning public career, he proved to be an extremely dutiful, diligent, and disciplined administrator. Prior to retiring from the civil service in 1985 to establish 'The Sotas Publications,' he was at the headship of the Statistics Department, where he established strict quality metrics for planning and census operations.",
    "Deeply committed to education and public political discourse, Chief Ojo is a proud author of five different textbooks. He has also engaged and influenced citizens across South-West Nigeria as a long-standing political columnist at the Nigerian Tribune, writing under the prominent pen name 'Victor Moore.'",
    "Chief Ojo has a long, deep-seated history and familiarity with Odu'a Group assets and operations. Over the years, he has served with distinction on several subsidiary boards and associated conglomerates, including Nigeria General Insurance Limited, Nigerite Limited, and Lagos Airport Hotel."
  ];

  const staticAchievements = [
    "Served as the Honourable Commissioner for Finance, Economic Planning, and Budget in Ondo State (1999–2003).",
    "Primary brain and strategist behind the establishment of the Ondo State Oil Producing Area Development Commission (OSOPADEC).",
    "Engineered robust fiscal frameworks that substantially boosted Ondo State's Internally Generated Revenue (IGR).",
    "Served as the Chairman of the Board of Odu'a Investment Company Limited from April 2017 to December 2017."
  ];

  const timeline = [
    { year: "April – Dec 2017", desc: "Served as Chairman, Odu'a Investment Company Limited." },
    { year: "1999 – 2003", desc: "Honourable Commissioner for Finance, Economic Planning and Budget in Ondo State." },
    { year: "1985", desc: "Retired from civil service as Head of Statistics Department to found 'The Sotas Publications' publishing house." },
    { year: "Civil Service", desc: "Highly dutiful, diligent, and disciplined public service career in statistics." }
  ];

  const academics = [
    "Master's Degree in Economics and Statistics",
    "Fellow of the Institute of Statisticians, England"
  ];

  const credentials = [
    "Member of the Population Association of Nigeria (PAN)",
    "Member of the Nigeria Statistical Association (NSA)",
    "Member of the Nigeria Economic Society (NES)",
    "Member of the Institute of Directors (IoD)"
  ];

  return (
    <BioPageWrapper
      name="Chief Segun Ojo"
      role="Director & Shareholder Representative"
      image="https://i.postimg.cc/y6PhP1sr/Segun-Ojo.jpg"
      tag="Board Director"
      category="board"
      location="Ondo State Representative"
      credentials={credentials}
      academics={academics}
      timeline={timeline}
      staticDetails={staticDetails}
      staticAchievements={staticAchievements}
      setCurrentPage={setCurrentPage}
    />
  );
}
