import { Helmet } from 'react-helmet';

const PageTitle = ({ titleName }) => {
  return (
    <Helmet>
      <title>Kinun | {titleName}</title>
    </Helmet>
  );
};

export default PageTitle;
