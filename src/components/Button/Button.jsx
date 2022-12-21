import { BtnLoadMore } from 'components/Button/Button.styled';
import { PropTypes } from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <BtnLoadMore onClick={onClick} type="button">
      Load more
    </BtnLoadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
