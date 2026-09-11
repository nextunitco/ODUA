import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface OdunayoAdenijiBioProps {
  setCurrentPage: (page: string) => void;
}

export default function OdunayoAdenijiBio({ setCurrentPage }: OdunayoAdenijiBioProps) {
  const staticDetails = [
    "Mrs. Odunayo Adeniji serves as the Group Head of Human Resources at Odu’a Investment Company Limited, engaged specifically to drive the Group's people agenda in delivering the ambitious and transformative 'SRC-2025 Strategy.'",
    "As an experienced and seasoned HR practitioner and Certified Coach, Mrs. Odunayo is passionate about people development. She focuses on delivering Human Resource strategies, Organizational Change and Development frameworks, and Performance and Process improvement solutions that directly align with and support Odu'a's core business goals.",
    "She has worked in different leadership capacities with both prominent indigenous and multinational companies in different sectors of Nigerian business for over a decade.",
    "A strategy architect in her field, Mrs. Odunayo is highly skilled at developing innovative HR and administrative initiatives designed to streamline processes, minimize friction, and capitalize on organizational growth opportunities. She holds the prestigious Senior Professional in Human Resource Management International (SPHRi) credential."
  ];

  const staticAchievements = [
    "Drives the group-wide human resources agenda to execute Odu'a's highly transformative 'SRC-2025 Strategy.'",
    "Accumulated over a decade of high-impact HR leadership experience across both indigenous and multinational sectors.",
    "Certified Executive Coach specializing in performance alignment, organizational development, and change management.",
    "Successfully optimized multi-subsidiary workforce coordination, reducing operational friction and raising performance indexes."
  ];

  const timeline = [
    { year: "Strategy", desc: "Group Head of HR, steering OICL's multi-tier workforce modernization." },
    { year: "Certifications", desc: "Acquired Senior Professional in HR Management International (SPHRi) and CIPM memberships." },
    { year: "Advisory", desc: "Coaches and advises subsidiary executive boards on workforce structure and key talent pipelines." }
  ];

  const academics = [
    "Master's degree in Business Administration and Management (MBA) from Lagos State University",
    "Senior Professional in Human Resource Management International (SPHRi)"
  ];

  const credentials = [
    "Member, Chartered Institute of Personnel Management of Nigeria (CIPM)",
    "Member, Society for Human Resource Management (SHRM) Professional",
    "Certified Coach & Organizational Change Strategist"
  ];

  const hobbies = [
    "Knowledge Impartation",
    "Arts & Creative Connections"
  ];

  return (
    <BioPageWrapper
      name="Mrs. Odunayo Adeniji"
      role="Group Head, Human Resources"
      image="https://oduainvestment.com.ng/wp-content/uploads/2022/05/IMG-20220816-WA0058-2.jpg"
      tag="Human Capital"
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
