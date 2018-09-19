import React, {PureComponent} from 'react';
import {connect} from 'dva/index';
import {Avatar, Col, Icon, List, Row, Input,  Affix, Button, message} from 'antd';
import {Link} from 'react-router-dom';
import styles from './index.less';

const Search = Input.Search;

@connect(state => {
  const { articles: { latest } } = state;
  return { latest };
})
export default class Latest extends PureComponent {
    
  constructor(props) {
    super(props);
    this.state = {
        pageNum: 1,
        pageSize: 10,
    }
  }
    
  componentDidMount() {
    this.listArticle();
  }

  submitSearchText = value => {
    console.log(value);
    this.props.dispatch({
      type: 'articles/search',
      payload: {
          value:value,
      },
    });
  }
  
  clickLikeIcon = (value, iconType, blogId) => {
      console.log(this.state);
      if(iconType == 'like') {
          this.props.dispatch({
              type: 'articles/changeArticleLikeStatus',
              payload: {
                blogId: blogId,
                status: value == 1 ? 0 : 1,
                pageNum: this.state.pageNum,
                pageSize: this.state.pageSize,
              }
          });
          if(value == 0) {
            message.success('点赞成功');
          } else {
               message.success('取消点赞');
          }
          console.log(iconType + '=' + value);
      } else if(iconType == 'star') {
          this.props.dispatch({
              type: 'articles/changeArticleStarStatus',
              payload: {
                blogId:blogId,
                status: value == 1 ? 0 : 1,
                pageNum: this.state.pageNum,
                pageSize: this.state.pageSize,
              }
          });
          if(value == 0) {
            message.success('收藏成功');
          } else {
               message.success('取消收藏');
          }
          console.log(iconType + '=' + value);
      }
  }

  //根据 pageNum 和 pageSize 得到 ArticleList
  listArticle = (pageNum, pageSize) => {
    //保存pagesize 和 pageNum 到 state
    this.setState({
        pageNum: pageNum || 1,
        pageSize: pageSize || 10,
    })
    this.props.dispatch({
      type: 'articles/fetchLatest',
      payload:{
        pageNum: pageNum || 1,
        pageSize: pageSize || 10,
      },
    });
  }
  
  dateChange = ( date ) => {
      let d = new Date(date);
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
  }


  render() {
    const { latest } = this.props;

    const onChangePage = (pageNum, pageSize) => {
      this.listArticle(pageNum, pageSize);
    }
    
    const IconText = ({ type, text,onClick, style }) => (
      <span>
        <Icon type={type} style={style} onClick={onClick} />
        {text}
      </span>
    );

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
            placeholder="全站搜索博客     Enter开始搜索"
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
                  actions={[
                    <IconText type="heart" onClick={() => this.clickLikeIcon(item.like, 'like', item.id)}
                          style={item.like == 1 ? {color: '#FE7376'} : {color:'#8590A6'}} text={item.likeQuantity || 0} />,
                    <IconText type="star" onClick={() =>  this.clickLikeIcon(item.star, 'star', item.id)}
                          style={item.star == 1 ? {color: '#F5C351'} : {color: '#8590A6'}} text={item.starQuantity || 0} />,
                    <IconText type="message" text={item.commentQuantity} />,
                    <span>  
                        <Avatar src={item.user != null ? item.user.headPortrait : 'https://image.wuweijian.cn/wuwei/b99c0b75-3148-423d-a20f-49f74a0cdc81.jpg'} size="small" />
                        {item.user.username}
                    </span>,
                     <span>  
                        <Icon type="table" theme="outlined" />
                        {this.dateChange(item.publishTime)}
                    </span>,
                  ]}
                  extra={<img width={300} height={200} alt="logo" src={item.blogPic || 'http://image.wuweijian.cn/wuwei/14/18af0147-7121-4de8-8d7e-b752262cc7a5.jpg'} />}
                >
                  <Link to={`/articles/show/${item.id}`} className={styles.blackc}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.blogPic} />}
                      title={item.title}
                      size="large"
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
