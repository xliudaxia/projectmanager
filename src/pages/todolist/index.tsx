import React, { Component } from 'react';
import { Layout } from 'antd';
import Form from './components/Form';
import DataList from './components/DataList';
import Footer from './components/Footer';
import datas from './data';

const { Content } = Layout;

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  componentDidMount() {
    this.setState({
      list: datas,
    });
  }
  deleteItem(id) {
    const deleteIndex = datas.findIndex((item) => {
      return item.id === id;
    });
    datas.splice(deleteIndex, 1);
    this.setState({
      list: datas,
    });
  }

  changeItem(id) {
    const changeIndex = datas.findIndex((item) => {
      return item.id === id;
    });
    datas[changeIndex].isComplete = !datas[changeIndex].isComplete;
    this.setState({
      list: datas,
    });
  }

  handleSearchItem(value) {
    const newList = datas.filter((item) => {
      return item.content.indexOf(value) !== -1;
    });
    this.setState({
      list: newList,
    });
  }

  addItem(item) {
    datas.push(item);
    this.setState({
      list: datas,
    });
  }
  render() {
    return (
      <Layout className="todolist-layout">
        <Content className="todolist-content">
          <Form searchItem={(value) => this.handleSearchItem(value)}></Form>
          <DataList
            list={this.state.list}
            deleteItem={(id) => this.deleteItem(id)}
            changeItem={(id) => this.changeItem(id)}
          ></DataList>
          <Footer addItem={(item) => this.addItem(item)}></Footer>
        </Content>
      </Layout>
    );
  }
}

export default TodoList;
