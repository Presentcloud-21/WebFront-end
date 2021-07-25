import React  from 'react' ;
import './index.scss'
class  LoginLayout extends React.Component {
  constructor(props) {
    super(props);
    // console.log('layout',props);
  }

  render() {
    return (
        <div className="left">  
            <div className="right">
              <div className="big-text"> 到云学生平台</div>
              { this.props.children}
            </div>
            <div className="copyright">到云 @2021 21组</div>
        </div>
  );
  }
  
}


export default LoginLayout;
