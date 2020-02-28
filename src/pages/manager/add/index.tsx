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
    {
      key: '3',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '4',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
    {
      key: '6',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '5',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },{
      key: '7',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '8',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },{
      key: '9',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '10',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },{
      key: '11',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '12',
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
  tableData:Array<Object>
}


interface ManagerState {
    modelVisible:boolean,
    testForm:{
      getFormData: Function
    },
    current:number,
    total:number
}

class ManagerAdd extends Component<ManagerAddProps,ManagerState>{
    
    state = {
      modelVisible: false,
      testForm: {
        getFormData: Function
      },
      current:1,
      total:100
    }


    // constructor(props: any) {
    //   super(props)
    //   this.state = {
    //     modelVisible: false,
    //     testForm: {
    //       getFormData: Function
    //     },
    //     current:1,
    //     total:100
    //   }
    // }

    openModel=()=>{
        const { dispatch } = this.props;
        dispatch({
          type: 'testModel/addNum',
        });
    }
    handleOk = () => {
      
      const data = this.state.testForm.getFormData()
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


      dispatch({
        type: 'managerModel/getList',
      });
    }
    onRef = (ref:any) => {
      this.setState({
        testForm:ref
      })
     // this.state.testForm = ref
      //console.log(this.state.testForm)
    }
    pageChange= (page:number)=>{
      this.setState({
        current:page
      })
    }
    render(){
      const {num,loading,tableData} = this.props
      const columns = [
        {
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
          render:(text:string,record:any,index:number)=>(
          <Button>{text}{index}     {record.age}</Button>
          )
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
                <Table dataSource={dataSource} columns={columns} 
                  pagination=
                  {{
                    total:this.state.total,
                    current:this.state.current,
                    pageSize: 10,
                    onChange:this.pageChange,
                    showTotal: (total) => `共 ${total} 条`
                    
                  }}
                />;
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
    managerModel
  }: {
    testModel: any;
    managerModel:any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
      num:testModel.num,
      tableData:managerModel.tableData,
      loading: loading.effects['testModel/addNum2'],
    })
)(ManagerAdd);