import React from 'react';
import MyLayout from '../../../component/my-layout';
import List from './list';

class TeacherList extends React.Component {
  render() {
    return (
    <MyLayout>
      <List />
    </MyLayout>
  );
  }
}

export default TeacherList;
