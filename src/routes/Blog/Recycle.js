import React, { PureComponent } from 'react';
import { connect } from 'dva/index';
import { Button, Popconfirm, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link } from 'react-router-dom';
import styles from './index.less';

@connect(state => {
  const { articles: { recycle } } = state;
  return { recycle };
})
export default class Recycle extends PureComponent {

  componentDidMount() {
    this.listArticle();
  }

  listArticle = (pageNum, pageSize) => {
    this.props.dispatch({
      type: 'articles/fetchDeleteArticles',
      payload:{
        pageNum: pageNum || 1,
        pageSize: pageSize || 10,
      },
    });
  }
  // 恢复当前id博客
  recoverArticleById = (articleId) => {
    this.props.dispatch({
      type: 'articles/recoverArticle',
      payload:{
        articleId: articleId,
      },
    })
  }



  render() {
    const { recycle } = this.props;
    const columns = [
      {
        title: '标题',
        width:  '20%',
        className: '',
        key:'title',
        render:(article)=> {
          return  <Link key={article.id} to={`/articles/show/${article.id}`}>{article.title}
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
            <div>
               <Popconfirm title="Are you sure recover this Article?"
                           onConfirm={() => {
                             this.recoverArticleById(article.id);
                           }} onCancel={() => {}} okText="Yes" cancelText="No">
                  <Button type="primary">还原</Button>
                </Popconfirm>,

            </div>
        ),
      }];

    const onChangePage = (pageNum, pageSize) => {
      this.listArticle(pageNum, pageSize);
    }

    const pagination = {
      total: recycle.total,
      showSizeChanger: true,
      onShowSizeChanger(current, pageSize) {
        onChangePage(current, pageSize);
      },
      showQuickJumper: true,
      onChange (current,pageSize){
        onChangePage(current, pageSize)
      },
    };
    return (
      <PageHeaderLayout
        title="博客列表"
        content="显示已被删除的博客"
      >
        <Table columns={columns} dataSource={recycle.list} pagination={pagination} />
      </PageHeaderLayout>
    );
  }
}
