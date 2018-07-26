import React, { PureComponent } from 'react';
import { Button, Card, DatePicker, Form, Input, Select } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { connect } from 'dva/index';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect((state, ownProps) => {
  const {articles: {entities}} = state
  const {match: {params: {id}}} = ownProps
  return {...entities[id]}
})
@Form.create()
export default class Update extends PureComponent {

  componentDidMount() {
    const {match: {params: {id}}} = this.props
    const {id: aid} = this.props
    if(!aid) {
      this.props.dispatch({
        type: 'articles/fetchArticleById',
        payload:{
          articleId: id,
        },
      })
    }
  }

  submitHandler = (event)=> {
    event.preventDefault()
    this.props.form.validateFields((errors, values) =>{
      if (!errors) {
        console.log('ADD.js')
        this.props.dispatch({
          type: 'articles/updateArticle',
          payload: values,
        })
      }
    })
  }

  render() {
    const {id, title, content} = this.props
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    return (
      <PageHeaderLayout
        title="博客修改"
        content="表单页用于用户修改博客。"
      >
        <Card bordered={false}>
          <Form onSubmit={this.submitHandler}>
            <Form.Item {...formItemLayout} label="请输入文章标题">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required:true,
                    message: '请输入文章标题',
                  },
                  {max: 30, message: '最多30个字符'},
                ],
                initialValue: title,
              })(<Input placeholder="给文章一个标题"/>)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="正文">
              {
                getFieldDecorator('content', {
                  rules: [
                    {
                      required:true,
                      message:'必须有正文',
                    },
                    {
                      mix:8,
                      message: '至少8个字符',
                    },
                  ],
                  initialValue: content,
                })(<Input.TextArea autosize={{minRows:12}} />)
              }
            </Form.Item>
            <Form.Item {...formItemLayout} >
              {getFieldDecorator('id', {
                initialValue: id,
                type: "hidden",
              })(<Input type="hidden" />)}
            </Form.Item>
            <Form.Item wrapperCol={{span:8, offset:7}}>
              <Button type="primary" size="large" htmlType="submit">保存</Button>
            </Form.Item>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
