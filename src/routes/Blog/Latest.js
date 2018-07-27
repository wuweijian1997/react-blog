import React, {PureComponent} from 'react';
import {connect} from 'dva/index';
import {Avatar, Col, Icon, List, Row, Input,  Affix, Button} from 'antd';
import {Link} from 'react-router-dom';
import styles from './index.less';

const Search = Input.Search;

@connect(state => {
  const { articles: { latest } } = state;
  return { latest };
})
export default class Latest extends PureComponent {
  componentDidMount() {
    this.listArticle();
  }

  submitSearchText = (value)=> {
    console.log(value);
    this.props.dispatch({
      type: 'articles/search',
      payload: {
          value:value,
      },
    });
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


  render() {
    const { latest } = this.props;
    const IconText = ({type, text}) => (
      <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
    );

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
      <Row>
        <Col xs={24} sm={{span: 18, offset: 3}}>
          <Search
            placeholder="全站搜索博客"
            className={styles.searchbox}
            onSearch={value => this.submitSearchText(value)}
            enterButton
          />
        </Col>
        <Col xs={24} sm={{span: 18, offset: 3}}  >
          <List
            itemLayout="vertical"
            size="large"
            pagination={pagination}
            dataSource={latest.list}
            renderItem={item => (

                <List.Item
                  key={item.title}
                  actions={[<IconText type="star-o" text={item.readingQuantity || 0} />,
                    <IconText type="heart-o" style={{color:'red'}} text={item.likeQuantity || 0} />,
                    <IconText type="message" text={item.commentQuantity} />,

                  ]}
                  extra={<img width={300} height={200} alt="logo" src={item.blogPic || 'http://image.wuweijian.cn/wuwei/14/18af0147-7121-4de8-8d7e-b752262cc7a5.jpg'} />}
                >
                  <Link to={`/articles/show/${item.id}`} className={styles.blackc}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.blogPic} />}
                      title={<a href={item.href}>{item.title}</a>}
                    />
                    {item.content.substr(0,100)}
                  </Link>
                </List.Item>

            )}
          />
        </Col>
      </Row>

    );
  }
}
