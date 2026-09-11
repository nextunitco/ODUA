import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface AbiolaOlufunkeAjayiBioProps {
  setCurrentPage: (page: string) => void;
}

export default function AbiolaOlufunkeAjayiBio({ setCurrentPage }: AbiolaOlufunkeAjayiBioProps) {
  const staticDetails = [
    "Mrs. Abiola Olufunke Ajayi joined the services of Odu’a Investment Company Limited in the year 2003 as legal manager. Through her dedication, high professionalism, and consistent delivery of results, she rose through the ranks until she became the Company Secretary and Head of Legal in 2008.",
    "With over 30 years of hands-on professional experience, Mrs. Ajayi has deep expertise in core Legal Practice, Corporate Commercial Transactions, Corporate Secretariat Practice, Corporate Administration, and Public Service. Her illustrious career includes working in reputable legal firms and serving at the Polytechnic Ibadan.",
    "She graduated from the prestigious University of Ibadan, where she obtained both her Bachelor and Master’s degrees in Law. She was called to the Nigerian Bar in 1989. She is also a recognized Chartered Secretary and Administrator (ACIS).",
    "With over a decade of cognate experience specifically serving as Company Secretary at the executive level, Mrs. Ajayi remains a resourceful, dynamic, and results-oriented administrator, ensuring corporate governance and legal adherence are maintained to world-class standards across the Odu’a Group."
  ];

  const staticAchievements = [
    "Joined Odu’a as legal manager in 2003 and rose to Company Secretary/Head of Legal in 2008.",
    "Accumulated over 30 years of premium hands-on experience in corporate commercial transactions, legal compliance, and secretariat operations.",
    "Achieved dual post-graduate degrees (Bachelor and Master of Law) from the premier University of Ibadan.",
    "Maintains standard of excellence as a Chartered Secretary and Administrator (ACIS) in charge of statutory compliance."
  ];

  const timeline = [
    { year: "2008 – Present", desc: "Company Secretary & Head of Legal, Odu'a Investment Company Limited." },
    { year: "2003 – 2008", desc: "Legal Manager, Odu'a Investment Company Limited." },
    { year: "1989", desc: "Called to the Nigerian Bar after graduating from University of Ibadan." }
  ];

  const academics = [
    "Bachelor of Law (LL.B, University of Ibadan)",
    "Master of Law (LL.M, University of Ibadan)"
  ];

  const credentials = [
    "Member of the Nigerian Bar Association (NBA)",
    "Associate of the Institute of Chartered Secretaries and Administrators of Nigeria (ACIS)"
  ];

  const hobbies = [
    "Travelling",
    "Reading"
  ];

  return (
    <BioPageWrapper
      name="Mrs. Abiola Olufunke Ajayi"
      role="Company Secretary / Head of Legal"
      image="https://oduainvestment.com.ng/wp-content/uploads/2020/05/ajayi.jpg"
      tag="Legal & Secretarial"
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
