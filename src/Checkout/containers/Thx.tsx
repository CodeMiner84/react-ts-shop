import * as React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Loading/Loading';
import withLoading from '../../Loading/WithLoading';

type Props = {
  loading?: boolean;
};

const ThankYouPage: React.FC<Props> = ({ loading }) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h5>Thank You page</h5>

      <div>
        Your order is placed. You can view it on your orders list page{' '}
        <Link to="/account/my-orders">here</Link>.
      </div>
    </>
  );
};

export default withLoading(ThankYouPage);
