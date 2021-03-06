import * as React from 'react';
import { CartItemModel } from '../models';
import { recalculateCart, removeFromCart } from '../actions';
import { connect } from 'react-redux';
import { Icon, Input } from 'antd';

type Props = {
  product: CartItemModel;
  recalculate: (id: number, quantity: number) => void;
  remove: (id: number) => void;
};

const initialState = { quantity: 0 };

type State = typeof initialState;

class CartElement extends React.PureComponent<Props, State> {
  readonly state: State = initialState;

  componentDidMount() {
    this.setState({
      quantity: this.props.product.quantity,
    });
  }

  render() {
    const { product, recalculate, remove } = this.props;

    return (
      <tr className="ant-table-row">
        <td>{product.title}</td>
        <td>${product.price}</td>
        <td>{this.state.quantity}</td>
        <td>
          <Input
            type={'number'}
            value={product.quantity}
            style={{ width: '60px' }}
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              const quantity = parseInt((e.target as HTMLInputElement).value, 10);
              this.setState({ quantity: quantity > 0 ? quantity : 1 });
              recalculate(product.id, quantity > 0 ? quantity : 1);
            }}
          />
        </td>
        <td>
          <Icon
            type={'delete'}
            theme={'filled'}
            style={{ cursor: 'pointer' }}
            onClick={() => remove(product.id)}
          />
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = {
  recalculate: recalculateCart,
  remove: removeFromCart,
};

export default connect(
  null,
  mapDispatchToProps,
)(CartElement);
