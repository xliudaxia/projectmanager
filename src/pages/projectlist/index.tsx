import react, { Component } from 'react'
import { Card, Col, Row } from 'antd';

class projectlist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "张三"
    }
  }
  render() {
    return (
      <div>
        <h1>项目列表：</h1>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="项目1" bordered={false}>
              第一个项目
        </Card>
          </Col>
          <Col span={8}>
            <Card title="项目2" bordered={false}>
              第一个项目
        </Card>
          </Col>
          <Col span={8}>
            <Card title="项目3" bordered={false}>
              第一个项目
        </Card>
          </Col>
        </Row>
      </div>

    )
  }
}


export default projectlist