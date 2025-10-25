import { IoChevronDown } from 'react-icons/io5';

import {
  Accordion as SAccordion,
  AccordionItem as SAccordionItem,
} from '@szhsin/react-accordion';

type AccordionItemType = {
  header: React.ReactNode;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItemType[];
};

const Accordion = ({ items }: AccordionProps) => {
  return (
    <SAccordion>
      {items.map((item, index) => (
        <SAccordionItem
          key={index}
          buttonProps={{
            className: 'w-full !p-0 !rounded-none !border-none bg-zinc-900',
          }}
          panelProps={{ className: 'bg-zinc-800 p-8' }}
          header={({ state }) => (
            <div className='flex justify-between items-center'>
              {item.header}
              <div className='p-5'>
                <IoChevronDown
                  className={`text-2xl transition-transform ${
                    state.isEnter ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>
          )}
        >
          {item.content}
        </SAccordionItem>
      ))}
    </SAccordion>
  );
};

export default Accordion;
