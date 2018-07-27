import React, {PureComponent} from 'react';
import {Avatar, Col, Dropdown, Icon, Menu, Row, Tag,} from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import {Link} from 'dva/router';
import styles from './index.less';
import HeaderSearch from '../HeaderSearch';
import {getUser} from '../../utils/LocalStorageUtil';
import {Latest} from '../../routes/Blog/Latest';

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }



  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const user = getUser();
    const {
      currentUser = {},
      collapsed,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="add">
          <Link to='/articles/add'><Icon type="plus" />添加博客</Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    return (
      <div className={styles.header}>
        <Row>
          <Col span={10} offset={7}>
            <div className={styles.textcenter}>
            <h1>
              <span className={styles.bluet }>m</span>
              <span className={styles.redt}>Y</span>
              <span>  </span>
              <span className={styles.ott}>B</span>
              <span className={styles.bluet}>l</span>
              <span className={styles.greent}>o</span>
              <span className={styles.redt}>g</span>
            </h1>
            </div>
          </Col>

          <Col xs={0} sm={{span: 4, offset: 3}}>
            <div className={styles.right}>
              {user ? (
                <Dropdown overlay={menu}>
                <span className={`${styles.action} ${styles.account}`}>
                   <Avatar size="small" src={user.headPortrait || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}/>
                  <span className={styles.name}>{user.username}</span>
                </span>
                </Dropdown>
              ) : (
                <div>
                  <Avatar icon="user" />
                  <Link to="/user/login">登陆</Link>
                </div>
              )}
            </div>
          </Col>
        </Row>


      </div>
    );
  }
}
