import React  from 'react' ;
import { getLocalData, Request } from '../../../../component/service/axios-service';
import { getDictationbyCode } from '../../../../component/service/direction-service';
import { Link } from 'react-router-dom';

import "../index.scss"
import ClassList from '..';

class JoinedClass extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      'list':[],
      'current':'joined'
    }
    Request('GET','/ajax/joinlist/'+getLocalData('user').userId).then((response)=> {
      console.log('joined res',response);
      const {data} = response.data;
      this.setState({
        'list':data || []
      });
    })
  }

  render() {

    return (
    <ClassList current={this.state.current} list={this.state.list} />
  );
  }
}

export default JoinedClass;
