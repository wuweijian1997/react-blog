import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import ReactMarkdown from 'react-markdown';

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
class Show extends Component {
  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const { id: aid } = this.props;
    if (!aid) {
      this.props.dispatch({
        type: 'articles/fetchArticleById',
        payload: {
          id
        },
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id: oldid },
      },
    } = prevProps;
    const {
      match: {
        params: { id: newid },
      },
    } = this.props;
    if (oldid && newid && newid !== oldid) {
      this.props.dispatch({
        type: 'articles/fetchArticleById',
        payload: {
          articleId: newid,
        },
      });
    }
  }

  render() {
    const { title, content, type, username, headPortrait } = this.props;
    return (
      <PageHeaderLayout title={title}>
        <Card bordered={false}>
            {type == 1 
            ?  <ReactMarkdown source={content} /> 
            : <div dangerouslySetInnerHTML={{ __html: content }}></div>
            }
         
        </Card>
      </PageHeaderLayout>
    );
  }
}
export default Show;
