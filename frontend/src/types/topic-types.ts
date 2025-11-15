export interface TopicType {
  id?: string;
  title: string;
  lastUpdated?: Date;
}

export interface NewTopicProps {
  event?: {
    title: string;
    terms: boolean;
  };
}
