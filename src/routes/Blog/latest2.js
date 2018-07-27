import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import { Button, Popconfirm, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link } from 'react-router-dom';

@connect(state => {
  const { articles: { latest } } = state;
  return { latest };
})
export default class Latest extends PureComponent {

  componentDidMount() {
    this.listArticle();
  }

  listArticle = (pageNum, pageSize) => {
    this.props.dispatch({
      type: 'articles/fetchLatest',
      payload:{
        pageNum: pageNum || 1,
        pageSize: pageSize || 10,
      },
    });
  }
  // 删除当前id博客
  deleteArticleById = (articleId) => {
    this.props.dispatch({
      type: 'articles/deleteArticle',
      payload:{
        articleId: articleId,
      },
    })
  }

  render() {
    const { latest } = this.props;
    const columns = [
      {
        title: '标题',
        key:'title',
        render:(article)=> {
          return  <Link to={`/articles/show/${article.id}`}>{article.title}
          </Link>
        },
      },
      {
        title: '用户名',
        dataIndex: 'username',
      }, {
        title: '标签',
        dataIndex: 'tag',
      }, {
        title: '时间',
        render:(article)=> {
          return  new Date(article.publishTime).toLocaleString();
        },
      }, {
        title: 'Action',
        key: 'action',
        render: (article) => (
          <span>
            <Link to={`/articles/edit/${article.id}`}>
              <Button type="primary" ghost>修改</Button>
            </Link>
            <div>
               <Popconfirm title="Are you sure delete this Article?"
                           onConfirm={() => {
                             this.deleteArticleById(article.id);
                           }} onCancel={() => {}} okText="Yes" cancelText="No">
                  <Button type="danger" ghost>删除</Button>
                </Popconfirm>,

            </div>
      </span>
        ),
      }];

    const onChangePage = (pageNum, pageSize) => {
      this.listArticle(pageNum, pageSize);
    }

    const pagination = {
      total: latest.total,
      showSizeChanger: true,
        onShowSizeChanger(current, pageSize) {
          onChangePage(current, pageSize);
        },
      showQuickJumper: true,
        onShowQuickJumper(current, pageSize) {
          onChangePage(current, pageSize)
        },
      onChange(current,pageSize) {
        onChangePage(current, pageSize)
      },
    };
    return (
        <Table columns={columns} dataSource={latest.list} pagination={pagination} />
    );
  }
}
