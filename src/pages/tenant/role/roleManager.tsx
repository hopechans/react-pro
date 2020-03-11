import React, { Component } from 'react';
import { Table, Tag , Input, Row, Col, Button, Modal, Popconfirm} from 'antd';
import { PlusOutlined,ReloadOutlined} from '@ant-design/icons';
import styles from './style.less';
class RoleManager extends Component {

  state={
    addModalVisible:false,
    editModalVisible:false
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

  openEditModal = (record:object)=>{
    console.log(record)
    this.setState({
      editModalVisible:true
    })
  }

  deleteRecord=(record:object)=>{
    console.log(record)
  }


  render() {
    const columns = [
       {
        title: '',
        dataIndex: 'T1',
        key: '',
      },
      {
        title: '1月',
        dataIndex: 'M1',
      },
      {
        title: '2月',
        dataIndex: 'M2',
      },
      {
        title: '3月',
        dataIndex: 'M3',
      },
      {
        title: '4月',
        dataIndex: 'M4',
      },
      {
        title: '5月',
        dataIndex: 'M5',
      },
      {
        title: '6月',
        dataIndex: 'M6',
      },
      {
        title: '7月',
        dataIndex: 'M7',
      },
      {
        title: '8月',
        dataIndex: 'M8',
      },
      {
        title: '9月',
        dataIndex: 'M9',
      },
      {
        title: '10月',
        dataIndex: '10',
      },
      
      
    ];
    
    const data = [
        {
            T1: '利用率',
            M1:'11%',
            M2:'12%',
            M3:'13%',
            M4:'14%',
            M5:'15%',
            M6:'16%',
            M7:'17%',
            M8:'18%',
            M9:'19%',
        },
        {
            T1: '偏离率',
            M1:'21%',
            M2:'22%',
            M3:'23%'
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
        <Table columns={columns} dataSource={data} className={styles.mtTable} bordered />
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

export default RoleManager;
