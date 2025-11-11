export interface TopicType {
  id: string;
  title: string;
  lastUpdated: Date;
}

export interface ParamActionNewTopic {
  title: string;
}
// export interface NewTopicType {
//     errors: string[] | null;
//     title: string | null;
//     terms: boolean;
// }

export interface NewTopicProps {
  event?: {
    title: string;
    terms: boolean;
  };
}
