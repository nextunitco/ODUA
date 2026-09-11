import React from 'react';
import BioPageWrapper from '../components/BioPageWrapper';

interface BimboAshiruBioProps {
  setCurrentPage: (page: string) => void;
}

export default function BimboAshiruBio({ setCurrentPage }: BimboAshiruBioProps) {
  const staticDetails = [
    "Otunba Bimbo Ashiru is a highly distinguished investment banker and seasoned public administrator. As the Chairman of Odu'a Investment Company Limited, he leads strategic oversight, coordinates high-level sovereign relationships between shareholder states, and ensures the highest level of corporate integrity. Known for his stellar execution, he has successfully repositioned Odu'a as the prime investment engine of South-Western Nigeria, fostering landmark public-private collaborations.",
    "The six Shareholder States of Odu’a Investment Company Limited approved the appointment of Otunba Bimbo Ashiru as the Chairman of the Company. Representing Ogun State on the Board, he succeeded Dr. Segun Aina, OFR, whose tenure as Chairman expired on June 22nd, 2022. Under his leadership, Odu’a has taken major strides in digital infrastructure modernization, high-yield agrarian integration, and strategic sovereign wealth stewardship.",
    "Otunba Ashiru entered the banking industry in 1989 with Chartered Bank. Over a successful banking career that spanned more than two decades, he served in high-profile capacities across several prestigious financial institutions, including stanbic IBTC bank as Pioneer Group Head, Public Sector.",
    "Driven by a strong passion to empower communities, Otunba Ashiru was appointed as the official representative of the Awujale of Ijebuland on the Ijebu Development Initiative on Poverty Reduction (IDIPR), executing high-impact regional poverty eradication schemes. Additionally, his professional expertise was leveraged at the national level, where he served on both the Technical and Communications Committees of the 17th Nigerian Economic Summit (NES) in 2011."
  ];

  const staticAchievements = [
    "Pioneered state-level investment coordination councils and secured massive regional infrastructure investment commitments.",
    "Transformed Ogun State into the manufacturing capital of West Africa during his tenure as two-term Honourable Commissioner for Commerce and Industry.",
    "Increased Ogun State's Internally Generated Revenue (IGR) by +1,279% and attracted over 300 new global factories.",
    "Upgraded Odu'a Group's institutional governance standards to international benchmarks, earning upgraded Agusto & Co. credit ratings."
  ];

  const timeline = [
    { year: "2022 – Present", desc: "Chairman of the Board, Odu'a Investment Company Limited." },
    { year: "2011 – 2018", desc: "Two-term Honourable Commissioner for Commerce and Industry in Ogun State." },
    { year: "2006", desc: "Conferred royal title Otunba Adeona Fusigboye of Ijebu land." },
    { year: "1989 – 2011", desc: "2-Decade Stellar Banking Career (Stanbic IBTC, Chartered Bank)." }
  ];

  const academics = [
    "Degree in Marketing, Purchasing & Supply",
    "Master's Degree in Strategic Management"
  ];

  const credentials = [
    "Fellow, Chartered Institute of Bankers (FCIB)",
    "Fellow, Institute of Strategic Management of Nigeria",
    "Fellow, National Institute of Marketing of Nigeria (FNIMN)",
    "Fellow, Chartered Institute of Commerce Nigeria"
  ];

  return (
    <BioPageWrapper
      name="Otunba Bimbo Ashiru"
      role="Chairman, Board of Directors"
      image="https://i.postimg.cc/XYxrCqWq/0c5017f7-bd1e-47d5-9265-656d8fbcbb1c.jpg"
      tag="Board Chairman"
      category="board"
      location="Ijebu-Ode, Ogun State"
      royalTitle='"Otunba Adeona Fusigboye of Ijebu land" — conferred in Dec 2006 by His Royal Majesty Oba (Dr.) Sikiru Kayode Adetona CFR, the Awujale and Paramount Ruler of Ijebu Land.'
      credentials={credentials}
      academics={academics}
      timeline={timeline}
      staticDetails={staticDetails}
      staticAchievements={staticAchievements}
      setCurrentPage={setCurrentPage}
    />
  );
}
