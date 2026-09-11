import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface AbiodunBamiduroBioProps {
  setCurrentPage: (page: string) => void;
}

export default function AbiodunBamiduroBio({ setCurrentPage }: AbiodunBamiduroBioProps) {
  const staticDetails = [
    "Mr. Abiodun Olamide Bamiduro, a Fellow of the Institute of Chartered Accountants of Nigeria (ICAN), is promoted from within, having served as the Group’s Financial Controller, Odu’a Investment Company Limited (OICL) since 2021.",
    "Mr. Bamiduro is a strategic business leader who has demonstrated an unparalleled understanding of the company’s vision. He has assumed full responsibility for OICL’s group-wide financial strategy, encompassing capital management, financial planning, investor relations, and financial integrity across the diversified holding company.",
    "Prior to joining OICL, Mr. Bamiduro spent over 2 decades in the energy industry, which includes a notable 15-year career with Transocean, a global leader in offshore drilling. There, he rose to the position of Finance Manager for Nigeria & Africa Remote Operations, making history as the first Nigerian and African to hold full financial responsibility for one of the company’s largest operational regions.",
    "His expertise is comprehensive, covering financial control, treasury, tax management, and complex financial integrations. His strategic acumen is further recognized through his current roles as a Non-Executive Director on the boards of some OICL subsidiaries, including Lagos Airport Hotel Limited."
  ];

  const staticAchievements = [
    "Led the high-profile internal committee that prepared financial archives and successfully achieved OICL's maiden corporate Credit Rating by Agusto & Co.",
    "Chaired the implementation of a state-of-the-art cost-saving Enterprise Resource Planning (ERP) platform, digitizing administrative operations and reducing overhead.",
    "Established a robust, international-standard internal financial control scheme to guarantee governance accountability across all subsidiaries.",
    "Rose to Finance Manager for Nigeria & Africa Remote Operations at Transocean, holding full financial responsibility for one of the company's largest operational regions."
  ];

  const timeline = [
    { year: "2021 – Present", desc: "Group CFO (promoted from Group Financial Controller), Odu'a Investment Company Limited." },
    { year: "Prior to 2021", desc: "Finance Manager for Nigeria & Africa Remote Operations at Transocean, spending 15 years in offshore drilling finance." },
    { year: "Governance", desc: "Appointed Non-Executive Director on several OICL subsidiary boards, including Lagos Airport Hotel Limited." }
  ];

  const academics = [
    "Executive Management Alumnus, Wharton School of Business",
    "B.Sc. in Finance / Accounting"
  ];

  const credentials = [
    "Fellow, Institute of Chartered Accountants of Nigeria (ICAN / FCA)",
    "Over 20 Years in Energy and Offshore Drilling Finance"
  ];

  return (
    <BioPageWrapper
      name="Mr. Abiodun Olamide Bamiduro"
      role="Group Chief Financial Officer / GCFO"
      image="https://i.postimg.cc/sg7qY5F3/Whats-App-Image-2026-01-16-at-8-20-46-AM.jpg"
      tag="Group CFO"
      category="board"
      location="Headquarters, Cocoa House"
      credentials={credentials}
      academics={academics}
      timeline={timeline}
      staticDetails={staticDetails}
      staticAchievements={staticAchievements}
      setCurrentPage={setCurrentPage}
    />
  );
}
