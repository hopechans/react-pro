import React, { Component } from 'react';
import { Table, Button, Modal } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Link } from 'umi';
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
  },
];

interface ManagerAddProps {
  dispatch: Dispatch;
  loading: boolean;
  num:number;
  nameb:number
}

class ManagerAdd extends Component<ManagerAddProps>{
  
    state = {
        modelVisible:false,
    }
    openModel=()=>{
        // this.setState({
        //     modelVisible: true,
        // });

        const { dispatch } = this.props;
        dispatch({
          type: 'testModel/addNumber',
          payload:Math.random()
        });
    }
    render(){
      const {num} = this.props
        return(
            <>
                <div>
                    <Button type="primary" onClick={this.openModel}>新增</Button>
                <div>6666666666666{num}</div>
                </div>
                <Table dataSource={dataSource} columns={columns} />;
                <Modal
                    title="Basic Modal"
                    visible={this.state.modelVisible}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
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
      loading: loading.effects['dashboardAndanalysis/fetch'],
    })
)(ManagerAdd);