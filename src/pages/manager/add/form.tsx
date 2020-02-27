import { InfoCircleOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card, DatePicker, Input, InputNumber, Radio, Select, Tooltip,Switch } from 'antd';
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from '@ant-design/compatible/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface BasicFormProps extends FormComponentProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
  onRef:any
}

class BasicForm extends Component<BasicFormProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'formAndbasicForm/submitRegularForm',
          payload: values,
        });
      }
    });
  };
  getFormData=()=>{
    const { form } = this.props;
    let d = {} 
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        d = values;
      }else{
        d= '';
    }
    });
    return d
  }
  componentDidMount(){
    this.props.onRef(this)
}
  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 14 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Form.Item label="Switch">
            {getFieldDecorator('switch', { valuePropName: 'checked' ,initialValue:true})(<Switch/>)}
          </Form.Item>
            <FormItem {...formItemLayout} label='7778333338'>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your Password!' 
                  },
                ],
              })(<Input placeholder="请输入。。123"/>)}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="formandbasic-form.date.label" />}>
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'formandbasic-form.date.required' }),
                  },
                ],
              })(
                <RangePicker
                  style={{ width: '100%' }}
                  placeholder={[
                    formatMessage({ id: 'formandbasic-form.placeholder.start' }),
                    formatMessage({ id: 'formandbasic-form.placeholder.end' }),
                  ]}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<FormattedMessage id="formandbasic-form.goal.label" />}>
              {getFieldDecorator('goal', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'formandbasic-form.goal.required' }),
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'formandbasic-form.goal.placeholder' })}
                  rows={4}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.standard.label" />}
            >
              {getFieldDecorator('standard', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'formandbasic-form.standard.required' }),
                  },
                ],
              })(
                <TextArea
                  style={{ minHeight: 32 }}
                  placeholder={formatMessage({ id: 'formandbasic-form.standard.placeholder' })}
                  rows={4}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <FormattedMessage id="formandbasic-form.client.label" />
                  <em className={styles.optional}>
                    <FormattedMessage id="formandbasic-form.form.optional" />
                    <Tooltip title={<FormattedMessage id="formandbasic-form.label.tooltip" />}>
                      <InfoCircleOutlined style={{ marginRight: 4 }} />
                    </Tooltip>
                  </em>
                </span>
              }
            >
              {getFieldDecorator('client')(
                <Input placeholder={formatMessage({ id: 'formandbasic-form.client.placeholder' })} />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <FormattedMessage id="formandbasic-form.invites.label" />
                  <em className={styles.optional}>
                    <FormattedMessage id="formandbasic-form.form.optional" />
                  </em>
                </span>
              }
            >
              {getFieldDecorator('invites')(
                <Input placeholder={formatMessage({ id: 'formandbasic-form.invites.placeholder' })} />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  <FormattedMessage id="formandbasic-form.weight.label" />
                  <em className={styles.optional}>
                    <FormattedMessage id="formandbasic-form.form.optional" />
                  </em>
                </span>
              }
            >
              {getFieldDecorator('weight')(
                <InputNumber
                  placeholder={formatMessage({ id: 'formandbasic-form.weight.placeholder' })}
                  min={0}
                  max={100}
                />,
              )}
              <span className="ant-form-text">%</span>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.public.label" />}
              help={<FormattedMessage id="formandbasic-form.label.help" />}
            >
              <div>
                {getFieldDecorator('public', {
                  initialValue: '1',
                })(
                  <Radio.Group>
                    <Radio value="1">
                      <FormattedMessage id="formandbasic-form.radio.public" />
                    </Radio>
                    <Radio value="2">
                      <FormattedMessage id="formandbasic-form.radio.partially-public" />
                    </Radio>
                    <Radio value="3">
                      <FormattedMessage id="formandbasic-form.radio.private" />
                    </Radio>
                  </Radio.Group>,
                )}
                <FormItem style={{ marginBottom: 0 }}>
                  {getFieldDecorator('publicUsers')(
                    <Select
                      mode="multiple"
                      placeholder={formatMessage({ id: 'formandbasic-form.publicUsers.placeholder' })}
                      style={{
                        margin: '8px 0',
                        display: getFieldValue('public') === '2' ? 'block' : 'none',
                      }}
                    >
                      <Option value="1">
                        <FormattedMessage id="formandbasic-form.option.A" />
                      </Option>
                      <Option value="2">
                        <FormattedMessage id="formandbasic-form.option.B" />
                      </Option>
                      <Option value="3">
                        <FormattedMessage id="formandbasic-form.option.C" />
                      </Option>
                    </Select>,
                  )}
                </FormItem>
              </div>
            </FormItem>
            {/* <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="formandbasic-form.form.submit" />
              </Button>
              <Button style={{ marginLeft: 8 }}>
                <FormattedMessage id="formandbasic-form.form.save" />
              </Button>
            </FormItem> */}
          </Form>
    );
  }
}

export default Form.create<BasicFormProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['formAndbasicForm/submitRegularForm'],
  }))(BasicForm),
);
