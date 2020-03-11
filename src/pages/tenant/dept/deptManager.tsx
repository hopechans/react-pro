import React, { Component } from 'react';
import { Table, Tag , Input, Row, Col, Button, Modal, Popconfirm} from 'antd';
import { PlusOutlined,ReloadOutlined} from '@ant-design/icons';
import styles from './style.less';
import {fetchTableList} from './server'


interface RecordType {
  ID:number,
  CreatedAt?:string,
  UpdatedAt?:string,
  DeletedAt?:string,
  role_group_id?:number,
  owner_user_id?:number,
  parent_id?:number,
  dept_level:number,
  dept_type:number,
  creator?:string,
  is_delete?:boolean,
  dept_name:string,
  dept_full_id?:number,
  description?:string,
}


interface TableResType{
  code:number,
  data:{
    total_record:number,
    records:RecordType[]
  },
  msg:string
}

interface PaginationType{
  current:number,
  pageSize:number
}


class DeptManager extends Component {

  state={
    addModalVisible:false,
    editModalVisible:false,
    current:1,
    total:0,
    pageSize:10,
    tableData:[],
    loading:false
  }

  addHandleOk = ()=>{

  }

  addHandleCancel = ()=>{
    this.setState({
      addModalVisible:false
    })
  }

  editHandleOk = ()=>{

  }

  editHandleCancel = ()=>{
    this.setState({
      editModalVisible:false
    })
  }

  openAddModal = ()=>{
    this.setState({
      addModalVisible:true
    })
  }

  openEditModal = (record:RecordType)=>{
    this.setState({
      editModalVisible:true
    })
  }

  /**
   * @author
   * 删除一条记录
   */
  deleteRecord=(record:RecordType)=>{

  }

  /**
   * @author
   * 监听分页事件
   */
  onChange= (pagination:PaginationType)=>{
    this.setState({
      current:pagination.current,
      pageSize:pagination.pageSize
    })
    setTimeout(()=>{
      this.getTableData()
    })
  }

  /**
   * @author
   *  获取表格数据
   */
  getTableData = ()=>{
    let obj = {
      page:this.state.current,
      pageSize:this.state.pageSize
    }
    this.setState({
      loading:true
    })
    fetchTableList(obj).then((res:TableResType)=>{
      this.setState({
        tableData:res.data.records,
        total:res.data.total_record,
        loading:false
      })
  }).catch(err=>{
      console.log(err)
  })
  }


  componentDidMount(){
    this.getTableData()
  }


  render() {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'ID',
      },
      {
        title: '部门名称',
        dataIndex: 'dept_name',
      },
      {
        title: '部门类型',
        dataIndex: 'dept_type',
      },
      {
        title: '部门级别',
        dataIndex: 'dept_level',
      },
      {
        title: '操作',
        key: 'action',
        render: (text:string, record:RecordType) => (
          <span>
            <a style={{ marginRight: 16 }} onClick={()=>this.openEditModal(record)}>编辑</a>

            <Popconfirm
              title="确定删除吗"
              onConfirm={()=>this.deleteRecord(record)}
              okText="Yes"
              cancelText="No"
            >
               <a>删除</a>
            </Popconfirm>
           
          </span>
        ),
      },
    ];

    return (
      <>
        <Row>
          <Col md={6} xs={16} sm={16}>
              <Input.Search placeholder="请输入" onSearch={value => console.log(value)} enterButton />
          </Col>
          <Col md={16} xs={1} sm={1}></Col>
          <Col md={2} xs={6} sm={6}>
            <Button type="primary" className={styles.floatRight} shape="circle" icon={<PlusOutlined />} onClick={this.openAddModal}/>
            <Button type="primary" className={styles.btnFresh} shape="circle" icon={<ReloadOutlined />} />
          </Col>
        </Row>
        <Table columns={columns} loading={this.state.loading} dataSource={this.state.tableData} className={styles.mtTable} onChange={(pagination:any)=>this.onChange(pagination)}  
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
          title="添加部门"
          visible={this.state.addModalVisible}
          onOk={this.addHandleOk}
          onCancel={this.addHandleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>

        <Modal
          title="编辑部门"
          visible={this.state.editModalVisible}
          onOk={this.editHandleOk}
          onCancel={this.editHandleCancel}
        >
        </Modal>
      </>
    );
  }
}

export default DeptManager;
