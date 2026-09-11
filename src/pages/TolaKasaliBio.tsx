import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface TolaKasaliBioProps {
  setCurrentPage: (page: string) => void;
}

export default function TolaKasaliBio({ setCurrentPage }: TolaKasaliBioProps) {
  const staticDetails = [
    "Dr. Tola Kasali is an eminent director on the board of Odu’a Investment Company Limited, representing Lagos State. A dedicated medical practitioner and veteran public administrator, he has served as Honorable Commissioner across three major cabinet portfolios in the Lagos State Government: Rural Development, Health, and Special Duties.",
    "Prior to his ministerial appointments, Dr. Kasali served with great distinction as the Executive Chairman of Ibeju-Lekki Local Government Council, where his grassroots development programs, public health outreach, and rural infrastructure initiatives established enduring benchmarks for local government administration in Nigeria.",
    "During his tenure as Commissioner for Special Duties, he midwifed the establishment of both the Lagos State Emergency Management Agency (LASEMA) and the Lagos State Safety Commission, instituting world-class disaster response, emergency safety protocols, and institutional civil defense infrastructure.",
    "Dr. Kasali's synthesis of medical rigor, public health vision, and extensive statecraft provides OICL with invaluable strategic guidance in executing large-scale regional development and capital investments across the South-West."
  ];

  const staticAchievements = [
    "Midwifed the establishment of the Lagos State Emergency Management Agency (LASEMA) and the Lagos State Safety Commission.",
    "Former Honorable Commissioner for Health, Commissioner for Rural Development, and Commissioner for Special Duties in Lagos State.",
    "Former Executive Chairman of Ibeju-Lekki Local Government Council, laying critical foundations for the Lekki economic corridor.",
    "Accomplished Medical Doctor (M.D.) with decades of clinical healthcare leadership and community medical advocacy."
  ];

  const timeline = [
    { year: "Current", desc: "Director, Odu'a Investment Company Limited (representing Lagos State)." },
    { year: "2007 - 2011", desc: "Honorable Commissioner for Special Duties, Lagos State (Established LASEMA & Safety Commission)." },
    { year: "2006", desc: "Honorable Commissioner for Health, Lagos State Government." },
    { year: "2003 - 2006", desc: "Honorable Commissioner for Rural Development, Lagos State Government." },
    { year: "Executive", desc: "Executive Chairman, Ibeju-Lekki Local Government Council." }
  ];

  const academics = [
    "Doctor of Medicine (M.D.)",
    "Clinical Residency & Medical Training",
    "Executive Public Administration & Disaster Management Certifications"
  ];

  const credentials = [
    "Registered Medical Practitioner (MDCN)",
    "Former Member, Lagos State Executive Council",
    "Founding Pioneer, Lagos State Emergency Management Agency (LASEMA)",
    "Grassroots Leadership & Community Philanthropy Awardee"
  ];

  return (
    <BioPageWrapper
      name="Dr. Tola Kasali"
      role="Director, Board of Directors"
      image="https://i.postimg.cc/hj6VBLpX/Tola-Kasali.jpg"
      tag="Director"
      category="board"
      location="Lagos State Representative"
      royalTitle="Medical Practitioner & Former Lagos State Commissioner for Health, Rural Development & Special Duties"
      credentials={credentials}
      academics={academics}
      timeline={timeline}
      staticDetails={staticDetails}
      staticAchievements={staticAchievements}
      setCurrentPage={setCurrentPage}
    />
  );
}
