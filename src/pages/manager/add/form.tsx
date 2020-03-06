import { InfoCircleOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Card, DatePicker, Input, InputNumber, Radio, Select, Tooltip, Switch,Tree } from 'antd';
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
  onRef: any;
}



const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];


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

  getFormData = () => {
    const { form } = this.props;
    let d = {};
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        d = values;
      } else {
        d = '';
      }
    });
    return d;
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 7,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 12,
        },
        md: {
          span: 14,
        },
      },
    };
    return (



      <Form
        onSubmit={this.handleSubmit}
        hideRequiredMark
        style={{
          marginTop: 8,
        }}
      >

        <Form.Item label="Switch">
          {getFieldDecorator('switch', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Switch />)}
        </Form.Item>
        <FormItem {...formItemLayout} label="7778333338">
          {getFieldDecorator('title', {
            rules: [
              {
                required: true,
                message: 'Please input your Password!',
              },
            ],
          })(<Input placeholder="请输入。。123" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="起止日期">
          {getFieldDecorator('date', {
            rules: [
              {
                required: true,
                message: '请选择起止日期',
              },
            ],
          })(
            <RangePicker
              style={{
                width: '100%',
              }}
              placeholder={['开始日期', '结束日期']}
            />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="目标描述">
          {getFieldDecorator('goal', {
            rules: [
              {
                required: true,
                message: '请输入目标描述',
              },
            ],
          })(
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder="请输入你的阶段性工作目标"
              rows={4}
            />,
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="衡量标准">
          {getFieldDecorator('standard', {
            rules: [
              {
                required: true,
                message: '请输入衡量标准',
              },
            ],
          })(
            <TextArea
              style={{
                minHeight: 32,
              }}
              placeholder="请输入衡量标准"
              rows={4}
            />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              客户
              <em className={styles.optional}>
                （选填）
                <Tooltip title="目标的服务对象">
                  <InfoCircleOutlined
                    style={{
                      marginRight: 4,
                    }}
                  />
                </Tooltip>
              </em>
            </span>
          }
        >
          {getFieldDecorator('client')(
            <Input placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              邀评人
              <em className={styles.optional}>（选填）</em>
            </span>
          }
        >
          {getFieldDecorator('invites')(
            <Input placeholder="请直接 @姓名／工号，最多可邀请 5 人" />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <span>
              权重
              <em className={styles.optional}>（选填）</em>
            </span>
          }
        >
          {getFieldDecorator('weight')(<InputNumber placeholder="请输入" min={0} max={100} />)}
          <span className="ant-form-text">%</span>
        </FormItem>
        <FormItem {...formItemLayout} label="目标公开" help="客户、邀评人默认被分享">
          <div>
            {getFieldDecorator('public', {
              initialValue: '1',
            })(
              <Radio.Group>
                <Radio value="1">公开</Radio>
                <Radio value="2">部分公开</Radio>
                <Radio value="3">不公开</Radio>
              </Radio.Group>,
            )}
            <FormItem
              style={{
                marginBottom: 0,
              }}
            >
              {getFieldDecorator('publicUsers')(
                <Select
                  mode="multiple"
                  placeholder="公开给"
                  style={{
                    margin: '8px 0',
                    display: getFieldValue('public') === '2' ? 'block' : 'none',
                  }}
                >
                  <Option value="1">同事甲</Option>
                  <Option value="2">同事乙</Option>
                  <Option value="3">同事丙</Option>
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

// export default Form.create<BasicFormProps>()(
//   connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
//     submitting: loading.effects['formAndbasicForm/submitRegularForm'],
//   }))(BasicForm),
// );

export const FormComp:any = Form.create<BasicFormProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['formAndbasicForm/submitRegularForm'],
  }))(BasicForm),
)

export default FormComp


