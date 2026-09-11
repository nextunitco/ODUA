import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface VictorAyetoroBioProps {
  setCurrentPage: (page: string) => void;
}

export default function VictorAyetoroBio({ setCurrentPage }: VictorAyetoroBioProps) {
  const staticDetails = [
    "Mr. Victor Ayetoro joined the services of Odu’a Investment Company Limited in October 2, 2002 as an Assistant Manager, Corporate Affairs. He rose through the ranks as an Assistant Manager to Manager, Corporate Affairs and was on secondment to Odu’a Telecoms, O’net, the telecommunication arm of the company before his re-deployment to the Group Headquarters in year 2005 as the Media Relations Manager. Presently, he is the Head, Corporate Affairs.",
    "Mr. Ayetoro is a distinguished Public Relations practitioner who started his media/PR career as a reporter with the Champion Newspaper Limited in 1998 covering Aviation, Capital Market, Business and Economy beats. He was later transferred to the State of Osun as the State’s Bureau Chief of the Newspaper before moving to Chestrad International as the Public Relations Executive.",
    "He holds two Master degrees, one in Communication and Language Art (MCA) and another in Managerial Psychology (MSC), both from the University of Ibadan in 2002 and 2012 respectively. His professional membership cuts across various institutes such as the Nigerian Union of Journalists (NUJ), the Nigeria Institute of Public Relations (NIPR) and the Nigeria Institute of Management (NIM) and has attended numerous training courses both in Communication and Public Relations.",
    "With deep insights into both corporate psychology and communication strategy, Mr. Ayetoro continues to champion the narrative of Odu’a Investment as the prime wealth creator and growth engine of Western Nigeria, driving stakeholder value through clarity, transparency, and top-tier media stewardship."
  ];

  const staticAchievements = [
    "Spearheads all Group brand communications, media relations, crisis communication, and executive stakeholder alignments.",
    "Managed national and regional public relations programs during Odu’a's telecom expansion (O’net).",
    "Successfully transitioned from a lead financial reporter at Champion Newspaper to Head of Corporate Affairs for the entire conglomerate.",
    "Holds double Master's degrees from the University of Ibadan in Communication Arts and Managerial Psychology."
  ];

  const timeline = [
    { year: "2015 – Present", desc: "Head, Corporate Affairs, directing brand positioning and corporate relations." },
    { year: "2005 – 2015", desc: "Media Relations Manager at Odu'a Group Headquarters." },
    { year: "2002 – 2005", desc: "Assistant Manager, Corporate Affairs, including secondment to Odu’a Telecoms (O’net)." },
    { year: "1998 – 2002", desc: "Distinguished investigative journalist and Bureau Chief, Champion Newspaper." }
  ];

  const academics = [
    "Master in Communication and Language Art (MCA), University of Ibadan (2002)",
    "Master of Science (M.Sc.) in Managerial Psychology, University of Ibadan (2012)"
  ];

  const credentials = [
    "Member, Nigeria Institute of Public Relations (NIPR)",
    "Member, Nigerian Union of Journalists (NUJ)",
    "Member, Nigeria Institute of Management (NIM)"
  ];

  const hobbies = [
    "Photography",
    "Listening to Music",
    "Writing"
  ];

  return (
    <BioPageWrapper
      name="Mr. Victor Ayetoro"
      role="Head, Corporate Affairs"
      image="https://oduainvestment.com.ng/wp-content/uploads/2020/05/WhatsApp-Image-2024-01-24-at-6.03.48-PM.jpeg"
      tag="Corporate Affairs"
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
