'use client';
import { Accordion, AccordionItem } from '@nextui-org/react';
interface Props {
  mnemonic: string;
}

export default function AccordionElement({ mnemonic }: Props) {
  return (
    <Accordion>
      <AccordionItem key="1" title="Current Keyphrase">
        {mnemonic}
      </AccordionItem>
    </Accordion>
  );
}
