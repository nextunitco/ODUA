import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface YemiAjaoBioProps {
  setCurrentPage: (page: string) => void;
}

export default function YemiAjaoBio({ setCurrentPage }: YemiAjaoBioProps) {
  const staticDetails = [
    "Mr. Yemi Ajao is an experienced Investment Executive with over 20 years of exceptional professional work experience spanning Oil & Gas upstream engineering, structured financial services, technology ecosystems, and commercial real estate investments.",
    "In his role on the board and management of Odu’a Investment Company Limited, Mr. Ajao is pivotal in synthesizing the group's investment strategies, identifying high-yield joint ventures, and steering its modernization agenda across various commercial sectors.",
    "Since 2013, he has also been a passionate advocate and veteran advisor within the West and East African early-stage tech startup ecosystems, mentoring dozens of technology ventures in Nigeria and Kenya, thus helping bridge local talent with international growth capital.",
    "Previously, he served as Business Development and New Ventures Director at CAMAC International in Houston, and Commercial Workstream Lead at Afren / First Hydrocarbon Nigeria (FHN), where he engineered pioneer local Reserve-Based Lending (RBL) transactions."
  ];

  const staticAchievements = [
    "Spearheaded the commercial acquisition framework for OML 26 from the Shell/NNPC Joint Venture.",
    "Structured the very first locally arranged Reserve-Based Lending (RBL) transaction in Nigeria to fund oil asset re-development.",
    "Directed cross-border energy transactions and family-office investment policies at CAMAC International in Houston, Texas.",
    "Mentored and advised dozens of high-growth technology startups across West and East African tech ecosystems."
  ];

  const timeline = [
    { year: "Investments", desc: "Group Chief Investment & Business Development Officer, leading asset M&A." },
    { year: "FHN / Afren", desc: "Served as Commercial Lead, closing the acquisition of OML 26." },
    { year: "CAMAC", desc: "Business Development & New Ventures Director, managing multi-billion dollar family-office investments." },
    { year: "Texas E&P", desc: "Drilling & Petroleum Engineer, designing wells across the Barnett Shale formation." }
  ];

  const academics = [
    "Master of Business Administration (MBA), Jones Graduate School of Business, Rice University, Houston, TX",
    "Master of Science (M.Sc.) in Petroleum Engineering, University of Houston, Texas, USA",
    "Bachelor of Science (B.Sc.) in Chemical Engineering, Obafemi Awolowo University (OAU), Ile-Ife"
  ];

  const credentials = [
    "Expert in Structured Corporate Finance and M&A Transactions",
    "Upstream E&P Certified Petroleum Engineer (USA)",
    "Board Advisor and Venture Capital Mentor"
  ];

  const hobbies = [
    "Tech Advising",
    "Energy Research",
    "Mentoring"
  ];

  return (
    <BioPageWrapper
      name="Mr. Yemi Ajao"
      role="Group Chief Investment & Business Dev. Officer (GCIBDO)"
      image="https://i.postimg.cc/FRSFq3qr/yemi-ajao-253x300.png"
      tag="GCIBDO"
      category="both"
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
