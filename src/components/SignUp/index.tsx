import * as React from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { Form, Input, Button, Row, Col } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Container from '../SignIn/components/Container';
import TextHeader from '../Layout/TextHeader';
const FormItem = Form.Item;

export type UserState = typeof initialUserProps;

type Props = {
  token: string;
  loading: boolean;
  register: (user: UserState) => void;
  name: string;
  email: string;
  password: string;
};

type StateProps = {
  auth: Props;
};

function hasErrors(fieldsError: any) {
  console.log('fieldsError', fieldsError);
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const initialUserProps = {
  name: '',
  email: '',
  password: '',
};

class SignUpComponent extends React.PureComponent<
  Props & FormComponentProps,
  UserState
> {
  readonly UserProps: UserState = initialUserProps;

  handleRegister = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    this.props.form.validateFields((err, { name, email, password }: UserState) => {
      this.props.register({
        name,
        email,
        password,
      });
    });
  };

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    return (
      <Row>
        <Col
          xs={{ span: 22, offset: 1 }}
          sm={{ span: 14, offset: 5 }}
          md={{ span: 12, offset: 6 }}
          lg={{ span: 8, offset: 8 }}
        >
          <Container>
            <Form layout="horizontal" onSubmit={this.handleRegister}>
              <TextHeader title="Sign up" />
              <FormItem {...formItemLayout} label="Name">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your name!' }],
                })(<Input placeholder="name" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Email">
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email!' }],
                })(<Input placeholder="email" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Password">
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your password!' }],
                })(<Input placeholder="password" />)}
              </FormItem>
              <FormItem>
                <Col span={18} offset={6}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}
                  >
                    Sign in
                  </Button>
                </Col>
              </FormItem>
            </Form>
          </Container>
        </Col>
      </Row>
    );
  }
}

const mapUserPropsToProps = ({ auth: { token } }: StateProps) => ({
  token,
});

const WrappedHorizontalSignupForm = Form.create()(SignUpComponent);

export default connect(
  mapUserPropsToProps,
  {
    register,
  },
)(WrappedHorizontalSignupForm);
