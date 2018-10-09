import React, { PureComponent } from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.css';

export default class RichEditorBackUp extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.loadEditor();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.defaultDetail !== nextProps.defaultDetail) {
      console.log('set');
      this.simditor.setValue(nextProps.defaultDetail);
    }
  }
  loadEditor() {
    let element = this.refs['textarea'];
  /*  this.simditor = new Simditor({
      textarea: $(element),
      defaultValue: '请输入内容',
      placeholder: '请输入内容',
      upload: {
        url: '/file/product/richtext_img_upload.do',
        defaultImage: '',
        fileKey: 'upload_file', //后端接口的file名称
      },
    });*/
    this.simditor.setValue(this.props.defaultDetail || '');
    this.bindEditorEvent();
  }

  //初始化富文本编辑器的事件
  bindEditorEvent() {
    this.simditor.on('valuechanged', e => {
      this.props.onChange(this.simditor.getValue());
    });
  }
  render() {
    return (
      <div>
        <textarea ref="textarea" />
      </div>
    );
  }
}
