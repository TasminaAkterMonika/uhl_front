import { Helmet } from 'react-helmet';
import React from 'react';
const Seo = ({ title, description, pathSlug, keywords }) => {
  let url = '';
  if(window.location.hostname ==='localhost'){
     url = `http://localhost:3000/${pathSlug}`;
  } else {
     url = `http://etherstaging.com/${pathSlug}`;
  }
	return (
    <Helmet 
      htmlAttributes={{ lang: 'en' }} 
      title={title} 
      meta={[
        {
          name: 'description',
          content: description,
        },
        {
          name: 'keywords',
          content: keywords,
        },
    	]}
      links={[
        {
          rel: 'canonical',
          href: url,
        },
      ]}
    />
  );
}
export default Seo;