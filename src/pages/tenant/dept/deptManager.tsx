import React, { Component } from 'react';
import { Table, Tag , Input, Row, Col, Button, Modal, Popconfirm} from 'antd';
import { PlusOutlined,ReloadOutlined} from '@ant-design/icons';
import styles from './style.less';
class DeptManager extends Component {

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
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text:string) => <a>{text}</a>,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags:Array<string>) => (
          <span>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text:string, record:object) => (
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
    
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
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
        <Table columns={columns} dataSource={data} className={styles.mtTable}/>
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
