export interface FAQ {
  _id: string;
  category: string;
  question: string;
  answer: string;
  status: 'saved' | 'draft';
  created_at: string;
}