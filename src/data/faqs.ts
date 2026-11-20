export interface FaqItem {
  id: string;
  questionKey: string;
  answerKey: string;
}

export const faqsData: ReadonlyArray<FaqItem> = [
  {
    id: "services-scope",
    questionKey: "faq.items.scope.q",
    answerKey: "faq.items.scope.a"
  },
  {
    id: "project-hubs",
    questionKey: "faq.items.hubs.q",
    answerKey: "faq.items.hubs.a"
  },
  {
    id: "tech-stack",
    questionKey: "faq.items.stack.q",
    answerKey: "faq.items.stack.a"
  },
  {
    id: "workflow-process",
    questionKey: "faq.items.process.q",
    answerKey: "faq.items.process.a"
  },
  {
    id: "contact-channels",
    questionKey: "faq.items.contact.q",
    answerKey: "faq.items.contact.a"
  }
];
