import React, { Component } from 'react';
import { Table, Button, Modal } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { Link } from 'umi';

import TestForm from './form1'
import { PaginationConfig } from 'antd/lib/pagination/Pagination';
import { SorterResult } from 'antd/lib/table/interface';
import {fetchTableList} from './server'

interface BY{
  age:number
}

interface ManagerAddProps extends BY{
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
    total:number,
    pageSize:number,
    dataSource:Array<object>
}

interface PaginationType{
  current:number,
  pageSize:number
}


function ff<T,U,V = {}>(a:T,b:U,c:V):void{
   console.log(a,b,c)
}

ff(1,2,true)








class ManagerAdd extends Component<ManagerAddProps,ManagerState>{
    
    state = {
      modelVisible: false,
      testForm:{
          getFormData: Function
      },
      current:1,
      total:22,
      pageSize:10,
      dataSource:[]
    }

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

      let obj = {
        page:this.state.current,
        pageSize:this.state.pageSize
      }
      dispatch({
        type: 'managerModel/getList',
        payload:obj
      });
     // this.getTableData()
     
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
    getTableData = ()=>{

      let obj = {
        page:this.state.current,
        pageSize:this.state.pageSize
      }

      fetchTableList(obj).then(res=>{
        this.setState({
          dataSource:res.data.results,
          total:res.data.count
        })
      })
    }
  
    onChange= (pagination:PaginationType)=>{
      this.setState({
        current:pagination.current,
        pageSize:pagination.pageSize
      })
      setTimeout(()=>{
        this.getTableData()
      })
    }
    onShowSizeChange = (current:any, pageSize:number)=>{
      this.setState({
        current:1,
        pageSize:pageSize
      })
      setTimeout(()=>{
        this.getTableData()
        })
    }
    render(){
      const {num,loading,tableData} = this.props
      const columns = [
        {
          title: '工单号',
          dataIndex: 'number',
        },
        {
          title: '工单标题',
          dataIndex: 'title',
          key: 'title',
          sorter:true
        },
      ];
        return(
            <>
                <div>
                  <Button type="primary" onClick={this.openModel} loading={loading}>新增</Button>
                  &nbsp;
                  <Button type="primary" onClick={this.openForm} >弹窗</Button>
                  <h1>{num} {JSON.stringify(tableData)}</h1>
                </div>
                <Table dataSource={this.state.dataSource} columns={columns} onChange={(pagination:any)=>this.onChange(pagination)}  
                  pagination=
                  {{
                    total:this.state.total,
                    current:this.state.current,
                    pageSize:this.state.pageSize,
                    showTotal: (total) => `共 ${total} 条`,
                    showSizeChanger:true,
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
  (
    {
      testModel,
      loading,
      managerModel
    }: 
    {
      testModel: any;
      managerModel:{
        tableData:{
          data:{
            results:Array<object>
          }
        }
      };
      loading: {
        effects: { [key: string]: boolean };
      };
    }
  ) => ({
        num:testModel.num,
        //tableData:managerModel.tableData,
        loading: loading.effects['testModel/addNum2'],
      })
)(ManagerAdd);