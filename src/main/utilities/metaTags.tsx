import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaTagsProps {
  title: string;
  description: string;
}

export default function MetaTags (props: MetaTagsProps) {
  const { title, description } = props;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='canonical' href={window.location.href} />
    </Helmet>
  );
}
