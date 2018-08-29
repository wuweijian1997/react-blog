import React, {PureComponent} from 'react';
import {Button, Card, Form, Icon, Input, Upload, Switch} from 'antd';
import {connect} from 'dva/index';
import RichEditor from '../../utils/react-editor/index.js';

const FormItem = Form.Item;
const { TextArea } = Input;

// @connect()
@Form.create()
@connect((state, ownProps) => {
  const {
    articles: { entities },
  } = state;
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return { ...entities[id] };
})
export default class Add extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: 'add',
      editor: 0, //标志位，0：富文本编辑器， 1：markdown编辑器。
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    if (id) {
      this.setState({
        type: 'update',
      });
    }
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        if (this.state.type == 'update') {
          this.props.dispatch({
            type: 'articles/updateArticle',
            payload: values,
          });
        } else {
          this.props.dispatch({
            type: 'articles/addArticle',
            payload: values,
          });
        }
      }
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (
      typeof e.fileList[0].response != 'undefined' &&
      typeof e.fileList[0].response.fileName != 'undefined'
    )
      return e.fileList[0].response.fileName;
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  checkedOnChange = checked => {
    this.setState({
      editor : checked == true ? 0 : 1,
    })
    console.log(checked)
    console.log(this.state.editor);
  }
  // 富文本编辑器的变化
  onDetailValueChange = value => {
    console.log(value);
    this.setState({
      content: value,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { title, content, blogPic, id, tag } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
        md: { span: 20 },
      },
    };

    return (

      <Card bordered={false}>
        <Form onSubmit={this.submitHandler}>
          <FormItem {...formItemLayout} label="文章标题">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '请输入文章标题',
                },
                {
                  max: 30,
                  message: '最多30个字符',
                },
                {
                  min: 4,
                  message: '至少4个字符',
                },
              ],
              initialValue: title || '',
            })(<Input placeholder="给文章一个标题"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="Upload" extra="请选择你设备上最好看的图片">
            {getFieldDecorator('blogPic', {
              valuePropName: 'file',
              getValueFromEvent: this.normFile,
            })(
              <Upload
                name="file"
                action="/api/admin/article/file_upload"
                accept="image/*"
                listType="picture"
              >
                <Button>
                  <Icon type="upload"/> Click to upload
                </Button>
              </Upload>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="使用富文本编辑器"
          >
            {getFieldDecorator('editor', { valuePropName: 'editor', initialValue: true })(
              <Switch onChange={this.checkedOnChange}/>,
            )}
          </FormItem>
          {this.state.editor === 0
            ?    <Form.Item {...formItemLayout} label="正文">
              {getFieldDecorator('content', {
                initialValue: content || '',
              })(
                <RichEditor
                  defaultDetail={content}
                  default={content}
                  type={this.state.editor}
                  onChange={value => this.onDetailValueChange(value)}
                />
                ,
              )}

            </Form.Item>
            : <Form.Item {...formItemLayout} label="正文">
              {getFieldDecorator('content', {
                initialValue: content || '',
              })(<TextArea autosize={{ minRows: 20, maxRows: 25 }}/>)}
            </Form.Item>
          }
          <FormItem
            {...formItemLayout}
            label="标签"
            wrapperCol={{ span: 20, offset: 0 }}
            labelCol={{ span: 4, offset: 0 }}
          >
            {getFieldDecorator('tag', {
              initialValue: tag || '',
            })(<Input placeholder="给文章一个标签"/>)}
          </FormItem>
          <Form.Item {...formItemLayout}>
            {getFieldDecorator('id', {
              initialValue: id,
              type: 'hidden',
            })(<Input type="hidden"/>)}
          </Form.Item>


          <Form.Item wrapperCol={{ span: 8, offset: 7 }}>
            <Button type="primary" size="large" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
