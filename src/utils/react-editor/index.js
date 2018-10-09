import React, { PureComponent } from 'react';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

export default class RichEditorBackUp extends PureComponent {
  state = {
    editorState: null
  }

  async componentDidMount () {

    this.setState({
      editorState: BraftEditor.createEditorState(this.props.defaultDetail)
    })
  }

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    const htmlContent = this.state.editorState.toHTML()
    this.props.onChange(htmlContent);
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
    this.props.onChange(editorState.toHTML());
  }

  render () {

    const { editorState } = this.state

    return (
      <div className="my-component">
        <BraftEditor
          value={editorState}
          onChange={this.handleEditorChange}
          onSave={this.submitContent}
        />
      </div>
    )

  }

}
