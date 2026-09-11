import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface FolushoOlaniyanBioProps {
  setCurrentPage: (page: string) => void;
}

export default function FolushoOlaniyanBio({ setCurrentPage }: FolushoOlaniyanBioProps) {
  const staticDetails = [
    "Mrs. Folusho Olaniyan, OON, is an Independent Director on the Board of Odu’a Investment Company Limited, where she actively champions performance excellence, strategic market entry, and agribusiness expansion. She is a certified Harvard Business School Corporate Director (2024) and Fellow of the Chartered Institute of Directors (F.CIoD) Nigeria.",
    "She started her illustrious career at A.G. Leventis Nigeria Plc in 1988 as a Trainee Manager. Through sheer dedication and market acumen, she rose rapidly through the corporate ranks to become the pioneer Head of Sales and Marketing of Leventis Foods Nigeria Plc in 2000, a post she occupied until 2005.",
    "In 2005, she joined UTC Nigeria Plc as Head of Sales and Marketing. Her extraordinary performance and leadership led to her appointment as the Managing Director/CEO of UTC Nigeria Plc in 2007. She steered the publicly quoted conglomerate through key transformation cycles until 2013.",
    "She currently leads Contact Consulting Nigeria, an agribusiness investment promotion and research advisory firm that acts as a vital bridge between investment hypotheses and sustainable field results, working with global bodies like the Rockefeller Foundation and the Bill and Melinda Gates Foundation."
  ];

  const staticAchievements = [
    "Conferred with the prestigious National Honour of Officer of the Order of the Niger (OON) in September 2014.",
    "Former Managing Director/CEO of UTC Nigeria Plc, steering the publicly quoted food and engineering conglomerate.",
    "Member of the Governing Council of Ekiti State University and the Chartered Institute of Directors (CIoD) Nigeria.",
    "Chairs the Board Investment Committee of Odu'a Investment Company Limited (OICL)."
  ];

  const timeline = [
    { year: "2014", desc: "Conferred with the National Honour of Officer of the Order of the Niger (OON)." },
    { year: "2007 – 2013", desc: "Managing Director/CEO of UTC Nigeria Plc." },
    { year: "Consulting", desc: "Founded Contact Consulting Nigeria, acting as a lead advisor on WEF Grow Africa Projects." },
    { year: "1988", desc: "Began corporate career as a Trainee Manager at A.G. Leventis Nigeria Plc." }
  ];

  const academics = [
    "Certified Corporate Director, Harvard Business School (2024)",
    "Master of Public Administration (MPA) from the University of Lagos",
    "Postgraduate Diploma in Marketing from CIM, Cookham, UK"
  ];

  const credentials = [
    "Fellow, Chartered Institute of Directors (F.CIoD) Nigeria",
    "Fellow, Chartered Institute of Marketing (CIM) U.K.",
    "Member of Governing Council, Ekiti State University",
    "Technical Committee Member, British American Tobacco Nigeria Foundation (BATNF)"
  ];

  const hobbies = [
    "Travelling",
    "Research",
    "Gardening"
  ];

  return (
    <BioPageWrapper
      name="Mrs. Folusho Olaniyan, OON"
      role="Independent Director"
      image="https://i.postimg.cc/63bTJB68/PHOTO-2026-06-05-13-45-49.jpg"
      tag="Independent Director"
      category="board"
      location="Ekiti State Representative"
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
