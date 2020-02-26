import React, { Component } from 'react';
import { Table, Button, Modal } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Link } from 'umi';

import TestForm from './form'

const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

interface ManagerAddProps {
  dispatch: Dispatch;
  loading: boolean;
  num:number;
  nameb:number,
}

class ManagerAdd extends Component<ManagerAddProps>{
    state = {
        modelVisible:false,
        testForm:''
    }
    openModel=()=>{
        const { dispatch } = this.props;
        dispatch({
          type: 'testModel/addNum',
        });
    }
    handleOk = () => {
      
      const data = this.testForm.getFormData()
      console.log(data)
    };

    handleCancel = () => {
      this.setState({
        modelVisible: false,
      });
    };

    openForm=()=>{
      this.setState({
        modelVisible:true
      })
    }

    componentDidMount(){
      const { dispatch } = this.props;
      dispatch({
        type: 'testModel/addNum2',
      });
    }
    onRef = (ref:any) => {
      this.testForm = ref
      console.log(this.testForm)
    }
    render(){
      const {num,loading} = this.props
      const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
          render:(text:any)=>(
              <div onClick={this.openModel}>999999999{text}</div>
            )
        },
      ];

        return(
            <>
                <div>
                <Button type="primary" onClick={this.openModel} loading={loading}>新增</Button>
                &nbsp;
                <Button type="primary" onClick={this.openForm} >弹窗</Button>
                <h1>{num}</h1>
                </div>
                <Table dataSource={dataSource} columns={columns} />;
                <Modal
                    title="Basic Modal"
                    visible={this.state.modelVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <TestForm onRef={this.onRef} />
                </Modal>

                <Button type="primary">
                    <Link to="/manager/add/b1">Go b1</Link>
                </Button>

                &nbsp;&nbsp;

                <Button type="primary">
                    <Link to="/manager/add/b2">Go b2</Link>
                </Button>
                {this.props.children}
            </>
        )
    }
}

export default connect(
  ({
    testModel,
    loading,
  }: {
    testModel: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
      num:testModel.num,
      loading: loading.effects['testModel/addNum2'],
    })
)(ManagerAdd);